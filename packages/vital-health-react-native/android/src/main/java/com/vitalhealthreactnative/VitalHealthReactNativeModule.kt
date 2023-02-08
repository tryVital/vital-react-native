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
import io.tryvital.vitalhealthconnect.model.HealthResource
import io.tryvital.vitalhealthconnect.model.SyncStatus
import kotlinx.coroutines.*
import java.time.Instant
import kotlin.reflect.KClass

class VitalHealthReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), ActivityEventListener {

  private val logger = VitalLogger.create()

  private var vitalClient: VitalClient? = null
  private var vitalHealthConnectManager: VitalHealthConnectManager? = null

  private var askForResourcesResult: Promise? = null
  private var askedHealthPermissions: Set<HealthPermission>? = null

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

    val manager = VitalHealthConnectManager.create(
      reactApplicationContext,
      vitalClient!!.apiKey,
      vitalClient!!.region,
      vitalClient!!.environment
    )
    val availability = manager.isAvailable(reactApplicationContext)

    if (availability != HealthConnectAvailability.Installed) {
      return promise.reject(
        "Health Connect is unavailable: ${availability}",
        "Health Connect is unavailable: ${availability}",
      )
    }

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
    val requestPermissionActivityContract =
      PermissionController.createRequestPermissionResultContract()
    val healthPermissions =
      readResources.toArrayList().toList().map { mapReadResourceToHealthRecord(it as String) }
        .flatten()
        .map { HealthPermission.createReadPermission(it) }.toSet().plus(
          writeResources?.toArrayList()?.toList()
            ?.map { mapWriteResourceToHealthRecord(it as String) }
            ?.flatten()
            ?.map { HealthPermission.createWritePermission(it) }?.toSet() ?: emptySet()
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

    mainScope?.cancel()
    mainScope = MainScope()
    mainScope!!.launch {
      vitalHealthConnectManager!!.syncData(
        resources.toArrayList().toList().mapNotNull { mapStringToHealthResource(it as String) }
          .toSet()
      )
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

    writeScope?.cancel()
    writeScope = MainScope()
    writeScope!!.launch {
      try {
        vitalHealthConnectManager!!.addHealthResource(
          mapStringToHealthResource(resource)!!,
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
    "heartRate" -> return listOf(HeartRateVariabilitySdnnRecord::class)
    "steps" -> return listOf(StepsRecord::class)
    "activeEnergyBurned" -> return listOf(ActiveCaloriesBurnedRecord::class)
    "basalEnergyBurned" -> return listOf(BasalMetabolicRateRecord::class)
    "water" -> return listOf(HydrationRecord::class)
  }
  return listOf()
}

private fun mapWriteResourceToHealthRecord(resource: String): List<KClass<out Record>> {
  when (resource) {
    "water" -> return listOf(HydrationRecord::class)
  }

  return listOf()
}

private fun mapStringToHealthResource(resource: String): HealthResource? {
  return when (resource) {
    "profile" -> return HealthResource.Profile
    "body" -> return HealthResource.Body
    "workout" -> return HealthResource.Workout
    "activity" -> return HealthResource.Activity
    "sleep" -> return HealthResource.Sleep
    "glucose" -> return HealthResource.Glucose
    "bloodPressure" -> return HealthResource.BloodPressure
    "heartRate" -> return HealthResource.HeartRate
    "steps" -> return HealthResource.Steps
    "activeEnergyBurned" -> return HealthResource.ActiveEnergyBurned
    "basalEnergyBurned" -> return HealthResource.BasalEnergyBurned
    "water" -> return HealthResource.Water
    else -> null
  }
}
