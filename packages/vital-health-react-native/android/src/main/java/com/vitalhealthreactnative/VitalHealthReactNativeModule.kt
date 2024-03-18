package com.vitalhealthreactnative

import android.annotation.SuppressLint
import android.content.Intent
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResultCallback
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContract
import androidx.activity.result.contract.ActivityResultContracts.RequestMultiplePermissions.Companion.EXTRA_PERMISSIONS
import androidx.activity.result.contract.ActivityResultContracts.RequestMultiplePermissions.Companion.EXTRA_PERMISSION_GRANT_RESULTS
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.vitalcorereactnative.VitalCoreReactNativeModule
import io.tryvital.client.utils.VitalLogger
import io.tryvital.vitalhealthconnect.DefaultSyncNotificationBuilder
import io.tryvital.vitalhealthconnect.DefaultSyncNotificationContent
import io.tryvital.vitalhealthconnect.ExperimentalVitalApi
import io.tryvital.vitalhealthconnect.VitalHealthConnectManager
import io.tryvital.vitalhealthconnect.disableBackgroundSync
import io.tryvital.vitalhealthconnect.enableBackgroundSyncContract
import io.tryvital.vitalhealthconnect.isBackgroundSyncEnabled
import io.tryvital.vitalhealthconnect.model.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive
import java.time.Instant
import java.util.concurrent.atomic.AtomicReference

const val VITAL_HEALTH_ERROR = "VitalHealthError"
const val VITAL_REQUEST_CODE = 1984

@ReactModule(name = VitalHealthReactNativeModule.NAME)
class VitalHealthReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val logger = VitalLogger.getOrCreate()

  private val vitalCore: VitalCoreReactNativeModule by lazy {
    reactContext.getNativeModule(VitalCoreReactNativeModule::class.java)!!
  }
  private val vitalHealthConnectManager: VitalHealthConnectManager
    get() = VitalHealthConnectManager.getOrCreate(reactApplicationContext)

  private var askForPermission: AskForPermissionContinuation? = null
  private var enableBackgroundSync: EnableBackgroundSyncContinuation? = null

  private var mainScope = MainScope()

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun isAvailable(promise: Promise) = runOnMain {
    val availability = VitalHealthConnectManager.isAvailable(reactApplicationContext)
    promise.resolve(availability == HealthConnectAvailability.Installed)
  }

  @ReactMethod
  fun configure(
    syncOnAppStart: Boolean,
    numberOfDaysToBackFill: Int,
    enableLogs: Boolean,
    promise: Promise
  ) = runOnMain {
    logger.enabled = enableLogs

    val availability = VitalHealthConnectManager.isAvailable(reactApplicationContext)

    if (availability != HealthConnectAvailability.Installed) {
      return@runOnMain promise.reject(
          VITAL_HEALTH_ERROR,
          "Health Connect is unavailable: $availability",
      )
    }

    val manager = vitalHealthConnectManager

    // Start status observation before we do anything that can update it.
    manager.startStatusUpdate()

    manager.configureHealthConnectClient(
      logsEnabled = enableLogs,
      syncOnAppStart = syncOnAppStart,
      numberOfDaysToBackFill = numberOfDaysToBackFill,
    )

    promise.resolve(null)
  }

  @ReactMethod
  fun setUserId(userId: String, promise: Promise)  {
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
  ) = runOnMain {
    val manager = vitalHealthConnectManager
    if (synchronized(this) { this.askForPermission != null }) {
      return@runOnMain promise.reject(
          VITAL_HEALTH_ERROR,
          "Another ask for permission call is already in progress."
      )
    }

    val activity = currentActivity ?: return@runOnMain promise.reject(
      VITAL_HEALTH_ERROR,
      "Cannot find the current ReactNative Activity"
    )

    if (activity !is ComponentActivity) {
      return@runOnMain promise.reject(
          VITAL_HEALTH_ERROR,
          "The Android Activity class of your React Native host app must be a androidx.activity.ComponentActivity subclass for the permission request flow to function properly."
      )
    }

    val read = readResources.toArrayList().mapTo(mutableSetOf()) {
      try {
        VitalResource.valueOf(it as String)
      } catch (e: IllegalArgumentException) {
        return@runOnMain promise.reject(VITAL_HEALTH_ERROR, "Unrecognized vital resource: $it")
      }
    }
    val write = writeResources?.toArrayList()?.mapTo(mutableSetOf()) {
      try {
        WritableVitalResource.valueOf(it as String)
      } catch (e: IllegalArgumentException) {
        return@runOnMain promise.reject(VITAL_HEALTH_ERROR, "Unrecognized vital resource: $it")
      }
    } ?: setOf()
    val contract = manager.createPermissionRequestContract(
      readResources = read, writeResources = write
    )

    synchronized(this) {
      askForPermission = AskForPermissionContinuation(contract, promise)
    }

    val registry = activity.activityResultRegistry
    val launcherRef = AtomicReference<ActivityResultLauncher<*>>(null)
    val launcher = registry.register("io.tryvital.health.ask", contract, ActivityResultCallback { result ->
      val continuation = synchronized(this) {
        val currentValue = askForPermission
        askForPermission = null
        return@synchronized currentValue
      }

      val launcher = launcherRef.getAndSet(null)
      launcher?.unregister()

      if (continuation != null) {
        mainScope.launch {
          result.await()
          continuation.promise.resolve(null)
        }
      }
    })
    launcherRef.set(launcher)
    launcher.launch(Unit)
  }

  @ReactMethod
  fun hasAskedForPermission(resource: String, promise: Promise) = runOnMain {
    val manager = vitalHealthConnectManager
    val vitalResource = try {
      VitalResource.valueOf(resource)
    } catch (e: IllegalArgumentException) {
      return@runOnMain promise.reject(VITAL_HEALTH_ERROR, "Unrecognized vital resource: $resource")
    }

    promise.resolve(manager.hasAskedForPermission(vitalResource))
  }

  @ReactMethod
  fun syncData(resources: ReadableArray, promise: Promise) = runOnMain {
    val manager = vitalHealthConnectManager

    val vitalResources = resources.toArrayList().toList()
      .mapNotNull {
        try {
          VitalResource.valueOf(it.toString())
        } catch (e: IllegalArgumentException) {
          promise.reject("VitalHealthError", "Unrecognized vital resource: $it")
          return@runOnMain
        }
      }
      .toSet()

    // Treat empty set as "sync all" (resources = null)
    try {
      manager.syncData(resources = vitalResources.ifEmpty { null })
      promise.resolve(null)
    } catch (e: Throwable) {
      promise.reject(e)
    }
  }

  @ReactMethod
  private fun writeHealthData(
    resource: String,
    startDate: Long,
    endDate: Long,
    value: Double,
    promise: Promise
  ) = runOnMain {
    val manager = vitalHealthConnectManager

    val writableResource = try {
      WritableVitalResource.valueOf(resource)
    } catch (e: IllegalArgumentException) {
      return@runOnMain promise.reject("VitalHealthError", "Unrecognized writable resource: $resource")
    }

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

  @OptIn(ExperimentalVitalApi::class)
  @ReactMethod
  fun enableBackgroundSync(promise: Promise) = runOnMain {
    val manager = vitalHealthConnectManager
    if (synchronized(this) { this.enableBackgroundSync != null }) {
      return@runOnMain promise.reject(
        VITAL_HEALTH_ERROR,
        "Another enableBackgroundSync call is already in progress."
      )
    }

    val activity = currentActivity ?: return@runOnMain promise.reject(
      VITAL_HEALTH_ERROR,
      "Cannot find the current ReactNative Activity"
    )

    if (activity !is ComponentActivity) {
      return@runOnMain promise.reject(
        VITAL_HEALTH_ERROR,
        "The Android Activity class of your React Native host app must be a androidx.activity.ComponentActivity subclass for the permission request flow to function properly."
      )
    }

    val contract = manager.enableBackgroundSyncContract()

    synchronized(this) {
      enableBackgroundSync = EnableBackgroundSyncContinuation(contract, promise)
    }

    val registry = activity.activityResultRegistry
    val launcherRef = AtomicReference<ActivityResultLauncher<*>>(null)
    val launcher = registry.register("io.tryvital.health.enableBackgroundSync", contract) { success ->
      val continuation = synchronized(this) {
        val currentValue = enableBackgroundSync
        enableBackgroundSync = null
        return@synchronized currentValue
      }

      val launcher = launcherRef.getAndSet(null)
      launcher?.unregister()

      if (continuation != null) {
        mainScope.launch {
          continuation.promise.resolve(success)
        }
      }
    }
    launcherRef.set(launcher)
    launcher.launch(Unit)
  }

  @OptIn(ExperimentalVitalApi::class)
  @ReactMethod
  fun disableBackgroundSync(promise: Promise) = runOnMain {
    vitalHealthConnectManager.disableBackgroundSync()
    promise.resolve(null)
  }

  @ReactMethod
  fun setSyncNotificationContent(content: String, promise: Promise) = runOnMain {
    val builder = vitalHealthConnectManager.syncNotificationBuilder as? DefaultSyncNotificationBuilder
      ?: return@runOnMain promise.resolve(null)

    try {
      val payload = Json.decodeFromString<JsonObject>(content).let {
        DefaultSyncNotificationContent(
          notificationTitle = it["notificationTitle"]!!.jsonPrimitive.toString(),
          notificationContent = it["notificationContent"]!!.jsonPrimitive.toString(),
          channelName = it["channelName"]!!.jsonPrimitive.toString(),
          channelDescription = it["channelDescription"]!!.jsonPrimitive.toString(),
        )
      }

      builder.setContentOverride(payload)
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(VITAL_HEALTH_ERROR, "Failed to decode the supplied notification content", e)
    }
  }

  @ReactMethod
  fun setPauseSynchronization(paused: Boolean, promise: Promise) = runOnMain {
    vitalHealthConnectManager.pauseSynchronization = paused
    promise.resolve(null)
  }

  @ReactMethod
  fun getPauseSynchronization(promise: Promise) = runOnMain {
    promise.resolve(vitalHealthConnectManager.pauseSynchronization)
  }

  @OptIn(ExperimentalVitalApi::class)
  @ReactMethod
  fun isBackgroundSyncEnabled(promise: Promise) = runOnMain {
    promise.resolve(vitalHealthConnectManager.isBackgroundSyncEnabled)
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

  companion object {
    const val NAME = "VitalHealthReactNative"

    /**
     * This method is a workaround which manually dispatches request permission results back to
     * where the Health Connect activity contract expects it.
     *
     * As at React Native 0.37, ReactActivity eats the `onRequestPermissionsResult` and does not
     * forward it to AndroidX AppCompatActivity / ComponentActivity. This causes some (if not all)
     * ActivityResultsContract to be broken.
     *
     */
    @SuppressLint("VisibleForTests")
    fun onRequestPermissionsResult(
      reactInstanceManager: ReactInstanceManager,
      p0: Int,
      p1: Array<out String>?,
      p2: IntArray?
    ) {
      val module = reactInstanceManager.currentReactContext?.getNativeModule(VitalHealthReactNativeModule::class.java) ?: return

      if (synchronized(module) { module.askForPermission != null }) {
        val activity = module.currentActivity as ComponentActivity

        // Lifted from ComponentActivity.onRequestPermissionsResult
        activity.activityResultRegistry.dispatchResult(
          p0,
          android.app.Activity.RESULT_OK,
          Intent()
            .putExtra(EXTRA_PERMISSIONS, p1!!)
            .putExtra(EXTRA_PERMISSION_GRANT_RESULTS, p2!!)
        )
      }
    }
  }

  private inline fun runOnMain(crossinline action: suspend () -> Unit) {
    mainScope.launch { action() }
  }
}

private data class AskForPermissionContinuation(
  val contract: ActivityResultContract<Unit, Deferred<PermissionOutcome>>,
  val promise: Promise
)

private data class EnableBackgroundSyncContinuation(
  val contract: ActivityResultContract<Unit, Boolean>,
  val promise: Promise
)
