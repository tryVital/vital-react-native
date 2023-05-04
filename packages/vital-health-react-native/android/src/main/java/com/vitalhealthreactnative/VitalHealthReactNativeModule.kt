package com.vitalhealthreactnative

import android.app.Activity
import android.content.Intent
import android.util.Log
import androidx.activity.result.contract.ActivityResultContract
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.tryvital.client.Environment
import io.tryvital.client.Region
import io.tryvital.client.VitalClient
import io.tryvital.client.utils.VitalLogger
import io.tryvital.vitalhealthconnect.VitalHealthConnectManager
import io.tryvital.vitalhealthconnect.model.*
import kotlinx.coroutines.*
import java.time.Instant

const val VITAL_HEALTH_ERROR = "VitalHealthError"
const val VITAL_REQUEST_CODE = 1984

class VitalHealthReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), ActivityEventListener {

  private val logger = VitalLogger.getOrCreate()

  private var vitalClient: VitalClient? = null
  private var vitalHealthConnectManager: VitalHealthConnectManager? = null

  private var askForPermission: AskForPermissionContinuation? = null

  private var mainScope = MainScope()

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

    mainScope.cancel()
    mainScope = MainScope()

    val manager = VitalHealthConnectManager.create(
      reactApplicationContext,
      vitalClient!!.apiKey,
      vitalClient!!.region,
      vitalClient!!.environment
    )

    vitalHealthConnectManager = manager

    mainScope.apply {
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
    val manager = vitalHealthConnectManager ?: return promise.rejectHealthNotConfigured()

    mainScope.launch {
      manager.setUserId(userId)
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
    val manager = vitalHealthConnectManager ?: return promise.rejectHealthNotConfigured()
    if (askForPermission != null) {
      return promise.reject(
        VITAL_HEALTH_ERROR,
        "Another ask for permission call is already in progress."
      )
    }

    val activity = currentActivity ?: return promise.reject(
      VITAL_HEALTH_ERROR,
      "Cannot find the current ReactNative Activity"
    )
    val read = readResources.toArrayList().mapTo(mutableSetOf()) {
      try {
        VitalResource.valueOf(it as String)
      } catch (e: IllegalArgumentException) {
        return@ask promise.reject(VITAL_HEALTH_ERROR, "Unrecognized vital resource: $it")
      }
    }
    val write = writeResources?.toArrayList()?.mapTo(mutableSetOf()) {
      try {
        WritableVitalResource.valueOf(it as String)
      } catch (e: IllegalArgumentException) {
        return@ask promise.reject(VITAL_HEALTH_ERROR, "Unrecognized vital resource: $it")
      }
    } ?: setOf()
    val contract = manager.createPermissionRequestContract(
      readResources = read, writeResources = write
    )

    askForPermission = AskForPermissionContinuation(contract, promise)

    val intent = contract.createIntent(reactApplicationContext, Unit)
    activity.startActivityForResult(intent, VITAL_REQUEST_CODE)
  }

  @ReactMethod
  fun hasAskedForPermission(resource: String, promise: Promise) {
    val manager = vitalHealthConnectManager ?: return promise.rejectHealthNotConfigured()
    val vitalResource = try {
      VitalResource.valueOf(resource)
    } catch (e: IllegalArgumentException) {
      return promise.reject(VITAL_HEALTH_ERROR, "Unrecognized vital resource: $resource")
    }

    promise.resolve(manager.hasAskedForPermission(vitalResource))
  }

  @ReactMethod
  fun syncData(resources: ReadableArray, promise: Promise) {
    val manager = vitalHealthConnectManager ?: return promise.rejectHealthNotConfigured()

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

    mainScope.launch {
      manager.syncData(vitalResources)
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun cleanUp(promise: Promise) {
    mainScope.cancel()
    mainScope = MainScope()

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
    val manager = vitalHealthConnectManager ?: return promise.rejectHealthNotConfigured()

    val writableResource = try {
      WritableVitalResource.valueOf(resource)
    } catch (e: IllegalArgumentException) {
      return promise.reject("VitalHealthError", "Unrecognized writable resource: $resource")
    }

    mainScope.launch {
      try {
        manager.writeRecord(
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
    mainScope.launch {
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

  override fun onActivityResult(p0: Activity?, p1: Int, p2: Int, p3: Intent?) {
    // p1: request code
    // p2: result code
    if (p1 == VITAL_REQUEST_CODE) {
      val continuation = askForPermission ?: return

      val resultAsync = continuation.contract.parseResult(p2, p3)
      val job = mainScope.launch {
        resultAsync.await()
        continuation.promise.resolve(null)
      }
      job.invokeOnCompletion {
        if (it != null) {
          continuation.promise.reject(VITAL_HEALTH_ERROR, "ask for permission has encountered an error", it)
        }
      }
    }
  }

  override fun onNewIntent(p0: Intent?) {
    // no-op
  }

  companion object {
    const val NAME = "VitalHealthReactNative"
  }
}

private data class AskForPermissionContinuation(
  val contract: ActivityResultContract<Unit, Deferred<PermissionOutcome>>,
  val promise: Promise
)

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

private fun Promise.rejectHealthNotConfigured()
  = reject(VITAL_HEALTH_ERROR, "VitalHealth client has not been configured.")
