package com.vitalhealthreactnative

import android.app.Activity
import android.content.Intent
import android.util.Log
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.*
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.tryvital.client.Environment
import io.tryvital.client.Region
import io.tryvital.client.VitalClient
import io.tryvital.client.utils.VitalLogger
import io.tryvital.vitalhealthconnect.VitalHealthConnectManager
import io.tryvital.vitalhealthconnect.model.HealthConnectAvailability
import io.tryvital.vitalhealthconnect.model.SyncStatus
import io.tryvital.vitalhealthconnect.model.VitalResource
import io.tryvital.vitalhealthconnect.model.WritableVitalResource
import kotlinx.coroutines.*
import java.time.Instant
import kotlin.reflect.KClass

class VitalHealthReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), ActivityEventListener {

  private val logger = VitalLogger.getOrCreate()

  private var vitalClient: VitalClient? = null
  private var vitalHealthConnectManager: VitalHealthConnectManager? = null

  private var askForResourcesResult: Promise? = null
  private var askedHealthPermissions: Set<String>? = null

  private var mainScope: CoroutineScope? = null
  private var statusScope: CoroutineScope? = null
  private var writeScope: CoroutineScope? = null

  override fun getName(): String {
    return NAME
  }

  init {
    reactContext.addActivityEventListener(this)
  }

  @ReactMethod
  fun configure(
    syncOnAppStart: Boolean,
    numberOfDaysToBackFill: Int,
    enableLogs: Boolean,
    promise: Promise
  ) {
    if (vitalClient == null) {
      return promise.reject(
        "VitalClient is not configured",
        "VitalClient is not configured",
      )
    }

    val availability = VitalHealthConnectManager.isAvailable(reactApplicationContext)

    if (availability != HealthConnectAvailability.Installed) {
      return promise.reject(
        "Health Connect is unavailable: $availability",
        "Health Connect is unavailable: $availability",
      )
    }

    val manager = VitalHealthConnectManager.create(
      reactApplicationContext,
      vitalClient!!.apiKey,
      vitalClient!!.region,
      vitalClient!!.environment
    )

    vitalHealthConnectManager = manager

    mainScope?.cancel()
    mainScope = MainScope().apply {
      launch {
        manager.configureHealthConnectClient(
          logsEnabled = enableLogs,
          syncOnAppStart = syncOnAppStart,
          numberOfDaysToBackFill = numberOfDaysToBackFill,
        )
        promise.resolve(null)
      }
    }

    startStatusUpdate()
  }

  @ReactMethod
  fun setUserId(userId: String, promise: Promise) {
    if (vitalHealthConnectManager == null) {
      promise.reject(
        "VitalHealthConnect is not configured",
        "VitalHealthConnect is not configured",
      )
      return
    }

    mainScope?.cancel()
    mainScope = MainScope()
    mainScope!!.launch {
      vitalHealthConnectManager!!.setUserId(userId)
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun configureClient(
    apiKey: String,
    environment: String,
    region: String,
    enableLogs: Boolean,
    promise: Promise
  ) {
    logger.enabled = enableLogs

    vitalClient = VitalClient(
      reactApplicationContext,
      stringToRegion(region),
      stringToEnvironment(environment),
      apiKey
    )

    promise.resolve(null)
  }

  @ReactMethod
  fun askForResources(
    resources: ReadableArray,
    promise: Promise
  ) {
    return ask(resources, null, promise)
  }

  @ReactMethod
  fun ask(
    readResources: ReadableArray,
    writeResources: ReadableArray?,
    promise: Promise
  ) {
    // TODO: VIT-2947 Remove after VitalResource Permission API lands in vital-android
    val requestPermissionActivityContract =
      PermissionController.createRequestPermissionResultContract()
    val healthPermissions =
      readResources.toArrayList().toList().map { mapReadResourceToHealthRecord(it as String) }
        .flatten()
        .map { HealthPermission.getReadPermission(it) }.toSet().plus(
          writeResources?.toArrayList()?.toList()
            ?.map { mapWriteResourceToHealthRecord(it as String) }
            ?.flatten()
            ?.map { HealthPermission.getWritePermission(it) }?.toSet() ?: emptySet()
        )

    askForResourcesResult = promise
    askedHealthPermissions = healthPermissions

    currentActivity?.startActivityForResult(
      requestPermissionActivityContract.createIntent(
        reactApplicationContext,
        healthPermissions
      ), 666
    )
  }

  @ReactMethod
  fun hasAskedForPermission(resource: String, promise: Promise) {
    // TODO: VIT-2947 Delegate to VitalResource Permission API lands in vital-android
    promise.resolve(false)
  }

  @ReactMethod
  fun syncData(resources: ReadableArray, promise: Promise) {
    if (vitalHealthConnectManager == null) {
      promise.reject(
        "VitalHealthConnect is not configured",
        "VitalHealthConnect is not configured",
      )
      return
    }

    val vitalResources = resources.toArrayList().toList()
      .mapNotNull {
        try {
          VitalResource.valueOf(it.toString())
        } catch (e: IllegalArgumentException) {
          promise.reject("VitalHealthError", "Unrecognized vital resource: $it")
          return@syncData
        }
      }
      .toSet()

    mainScope?.cancel()
    mainScope = MainScope()
    mainScope!!.launch {
      vitalHealthConnectManager!!.syncData(vitalResources)
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun cleanUp(promise: Promise) {
    statusScope?.cancel()
    writeScope?.cancel()
    mainScope?.cancel()

    promise.resolve(null)
  }

  @ReactMethod
  private fun writeHealthData(
    resource: String,
    startDate: Long,
    endDate: Long,
    value: Double,
    promise: Promise
  ) {
    if (vitalHealthConnectManager == null) {
      promise.reject(
        "VitalHealthConnect is not configured",
        "VitalHealthConnect is not configured",
      )
      return
    }

    // TODO: VIT-2947 Missing WritableVitalResource.valueOf()
    val writableResource = when (resource) {
      "water" -> WritableVitalResource.Water
      "glucose" -> WritableVitalResource.Glucose
      else -> {
        promise.reject("VitalHealthError", "Unrecognized writable resource: $resource")
        return
      }
    }

    writeScope?.cancel()
    writeScope = MainScope()
    writeScope!!.launch {
      try {
        vitalHealthConnectManager!!.writeRecord(
          writableResource,
          startDate = Instant.ofEpochMilli(startDate),
          endDate = Instant.ofEpochMilli(endDate),
          value = value,
        )
        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject(
          "Failed to write data",
          e.message,
          e
        )
      }
    }
  }

  @ReactMethod
  fun addListener(eventName: String?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  private fun startStatusUpdate() {
    statusScope?.cancel()
    statusScope = MainScope()
    statusScope?.launch {
      try {
        withContext(Dispatchers.Default) {
          vitalHealthConnectManager?.status?.collect {
            logger.logI("Status: $it")
            withContext(Dispatchers.Main) {
              when (it) {
                is SyncStatus.ResourceSyncFailed -> {
                  sendEvent(VitalHealthEvent.Status, WritableNativeMap().apply {
                    putString("status", "failedSyncing")
                    putString("resource", it.resource.name)
                  })
                }
                is SyncStatus.ResourceNothingToSync -> {
                  sendEvent(VitalHealthEvent.Status, WritableNativeMap().apply {
                    putString("status", "nothingToSync")
                    putString("resource", it.resource.name)
                  })
                }
                is SyncStatus.ResourceSyncing -> {
                  sendEvent(VitalHealthEvent.Status, WritableNativeMap().apply {
                    putString("status", "syncing")
                    putString("resource", it.resource.name)
                  })
                }
                is SyncStatus.ResourceSyncingComplete -> {
                  sendEvent(VitalHealthEvent.Status, WritableNativeMap().apply {
                    putString("status", "successSyncing")
                    putString("resource", it.resource.name)
                  })
                }
                SyncStatus.SyncingCompleted -> {
                  sendEvent(VitalHealthEvent.Status, WritableNativeMap().apply {
                    putString("status", "syncingCompleted")
                  })
                }
                SyncStatus.Unknown -> {
                  sendEvent(VitalHealthEvent.Status, WritableNativeMap().apply {
                    putString("status", "unknown")
                  })
                }
              }
            }
          }
        }
      } catch (e: Exception) {
        withContext(Dispatchers.Main) {
          sendEvent(VitalHealthEvent.Status, WritableNativeMap().apply {
            putString("status", "failedSyncing")
          })
        }
      }
    }
  }

  private fun sendEvent(event: VitalHealthEvent, params: Any) {
    try {
      reactApplicationContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(event.value, params)
    } catch (e: Exception) {
      Log.e("VitalHealth", "sendEvent: $e")
    }
  }

  override fun getConstants(): MutableMap<String, Any> {
    return VitalHealthEvent.values().associate { it.value to it.value }.toMutableMap()
  }

  companion object {
    const val NAME = "VitalHealthReactNative"
  }

  override fun onActivityResult(p0: Activity?, p1: Int, p2: Int, p3: Intent?) {
    if (p1 == 666) {
      mainScope?.cancel()
      mainScope = MainScope()
      mainScope!!.launch {
        val grantedPermissions =
          vitalHealthConnectManager!!.getGrantedPermissions(reactApplicationContext).toSet()

        val notGrantedPermissions = (askedHealthPermissions
          ?: emptySet()).filter { !grantedPermissions.contains(it) }

        if (notGrantedPermissions.isEmpty()) {
          askForResourcesResult?.resolve(true)
        } else {
          vitalClient?.vitalLogger?.logI("Not granted permissions: $notGrantedPermissions")
          askForResourcesResult?.resolve(false)
        }
        askedHealthPermissions = null
        askForResourcesResult = null
      }
    }
  }

  override fun onNewIntent(p0: Intent?) {
    // Not used
  }
}

private fun stringToRegion(region: String): Region {
  when (region) {
    "eu" -> return Region.EU
    "us" -> return Region.US
  }

  throw Exception("Unsupported region $region")
}

private fun stringToEnvironment(environment: String): Environment {
  when (environment) {
    "production" -> return Environment.Production
    "sandbox" -> return Environment.Sandbox
    "dev" -> return Environment.Dev
  }

  throw Exception("Unsupported environment $environment")
}

// TODO: VIT-2947 Remove after VitalResource Permission API lands in vital-android
private fun mapReadResourceToHealthRecord(resource: String): List<KClass<out Record>> {
  when (resource) {
    "profile" -> return listOf(HeightRecord::class, WeightRecord::class)
    "body" -> return listOf(BodyFatRecord::class)
    "workout" -> return listOf(ExerciseSessionRecord::class)
    "activity" -> return listOf(
      ActiveCaloriesBurnedRecord::class,
      BasalMetabolicRateRecord::class,
      StepsRecord::class,
      DistanceRecord::class,
      FloorsClimbedRecord::class,
      Vo2MaxRecord::class
    )
    "sleep" -> return listOf(SleepSessionRecord::class)
    "glucose" -> return listOf(BloodGlucoseRecord::class)
    "bloodPressure" -> return listOf(BloodPressureRecord::class)
    "heartRate" -> return listOf(HeartRateVariabilityRmssdRecord::class)
    "steps" -> return listOf(StepsRecord::class)
    "activeEnergyBurned" -> return listOf(ActiveCaloriesBurnedRecord::class)
    "basalEnergyBurned" -> return listOf(BasalMetabolicRateRecord::class)
    "water" -> return listOf(HydrationRecord::class)
  }
  return listOf()
}

// TODO: VIT-2947 Remove after VitalResource Permission API lands in vital-android
private fun mapWriteResourceToHealthRecord(resource: String): List<KClass<out Record>> {
  when (resource) {
    "water" -> return listOf(HydrationRecord::class)
  }

  return listOf()
}
