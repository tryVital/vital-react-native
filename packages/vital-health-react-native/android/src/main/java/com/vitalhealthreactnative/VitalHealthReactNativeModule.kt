package com.vitalhealthreactnative

import android.app.Activity
import android.content.Intent
import android.util.Log
import androidx.activity.result.contract.ActivityResultContract
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.vitalcorereactnative.VitalCoreReactNativeModule
import io.tryvital.client.utils.VitalLogger
import io.tryvital.vitalhealthconnect.VitalHealthConnectManager
import io.tryvital.vitalhealthconnect.model.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import java.time.Instant

const val VITAL_HEALTH_ERROR = "VitalHealthError"
const val VITAL_REQUEST_CODE = 1984

@ReactModule(name = VitalHealthReactNativeModule.NAME)
class VitalHealthReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), ActivityEventListener {

  private val logger = VitalLogger.getOrCreate()

  private val vitalCore: VitalCoreReactNativeModule by lazy {
    reactContext.getNativeModule(VitalCoreReactNativeModule::class.java)!!
  }
  private val vitalHealthConnectManager: VitalHealthConnectManager
    get() = VitalHealthConnectManager.getOrCreate(reactApplicationContext)

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
    logger.enabled = enableLogs

    val availability = VitalHealthConnectManager.isAvailable(reactApplicationContext)

    if (availability != HealthConnectAvailability.Installed) {
      return promise.reject(
        VITAL_HEALTH_ERROR,
        "Health Connect is unavailable: $availability",
      )
    }

    val manager = vitalHealthConnectManager

    // Start status observation before we do anything that can update it.
    manager.startStatusUpdate()

    mainScope.launch {
      manager.configureHealthConnectClient(
        logsEnabled = enableLogs,
        // This key is intended for VitalHealthAutoStarter, which is not used by the RN SDK.
        syncOnAppStart = false,
        numberOfDaysToBackFill = numberOfDaysToBackFill,
      )

      promise.resolve(null)
    }
  }

  @ReactMethod
  fun setUserId(userId: String, promise: Promise) {
    // [Backward Compatibility] Delegate to VitalCore.
    vitalCore.setUserId(userId, promise)
  }

  @ReactMethod
  fun configureClient(
    apiKey: String,
    environment: String,
    region: String,
    enableLogs: Boolean,
    promise: Promise
  ) {
    // [Backward Compatibility] Delegate to VitalCore.
    vitalCore.configure(apiKey, environment, region, enableLogs, promise)
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
    val manager = vitalHealthConnectManager
    if (synchronized(this) { this.askForPermission != null }) {
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

    synchronized(this) {
      askForPermission = AskForPermissionContinuation(contract, promise)
    }

    val intent = contract.createIntent(reactApplicationContext, Unit)
    activity.startActivityForResult(intent, VITAL_REQUEST_CODE)
  }

  @ReactMethod
  fun hasAskedForPermission(resource: String, promise: Promise) {
    val manager = vitalHealthConnectManager
    val vitalResource = try {
      VitalResource.valueOf(resource)
    } catch (e: IllegalArgumentException) {
      return promise.reject(VITAL_HEALTH_ERROR, "Unrecognized vital resource: $resource")
    }

    promise.resolve(manager.hasAskedForPermission(vitalResource))
  }

  @ReactMethod
  fun syncData(resources: ReadableArray, promise: Promise) {
    val manager = vitalHealthConnectManager

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
      // Treat empty set as "sync all" (resources = null)
      try {
        manager.syncData(resources = vitalResources.ifEmpty { null })
        promise.resolve(null)
      } catch (e: Throwable) {
        promise.reject(e)
      }
    }
  }

  @ReactMethod
  fun cleanUp(promise: Promise) {
    mainScope.launch {
      vitalHealthConnectManager.cleanUp()
      promise.resolve(null)
    }
  }

  @ReactMethod
  private fun writeHealthData(
    resource: String,
    startDate: Long,
    endDate: Long,
    value: Double,
    promise: Promise
  ) {
    val manager = vitalHealthConnectManager

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
          VITAL_HEALTH_ERROR,
          "Failed to write data: ${e.message}",
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

  private fun VitalHealthConnectManager.startStatusUpdate() {
    this.status
      .onEach {
        logger.logI("Status: $it")
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
      .launchIn(mainScope)
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
      val continuation = synchronized(this) { askForPermission } ?: return

      val resultAsync = continuation.contract.parseResult(p2, p3)
      val job = mainScope.launch {
        resultAsync.await()
        continuation.promise.resolve(null)
      }
      job.invokeOnCompletion {
        if (it != null) {
          continuation.promise.reject(VITAL_HEALTH_ERROR, "ask for permission has encountered an error", it)
        }
        synchronized(this) { this.askForPermission = null }
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
