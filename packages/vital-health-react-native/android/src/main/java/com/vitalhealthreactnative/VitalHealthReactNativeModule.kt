package com.vitalhealthreactnative

import android.annotation.SuppressLint
import android.content.Intent
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContract
import androidx.activity.result.contract.ActivityResultContracts.RequestMultiplePermissions.Companion.EXTRA_PERMISSIONS
import androidx.activity.result.contract.ActivityResultContracts.RequestMultiplePermissions.Companion.EXTRA_PERMISSION_GRANT_RESULTS
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.tryvital.client.utils.VitalLogger
import io.tryvital.vitalhealthcore.model.ConnectionPolicy
import io.tryvital.vitalhealthcore.model.ProviderAvailability
import io.tryvital.vitalhealthcore.model.SyncStatus
import io.tryvital.vitalhealthcore.model.VitalResource
import io.tryvital.vitalhealthcore.model.WritableVitalResource
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Job
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive
import java.time.Instant
import java.util.concurrent.atomic.AtomicReference
import kotlin.collections.mutableMapOf
import kotlin.time.Duration.Companion.milliseconds

const val VITAL_HEALTH_ERROR = "VitalHealthError"

@ReactModule(name = VitalHealthReactNativeModule.NAME)
class VitalHealthReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val logger = VitalLogger.getOrCreate()

  private var askForPermission: AskForPermissionContinuation? = null
  private var enableBackgroundSync: EnableBackgroundSyncContinuation? = null

  private val managers = mutableMapOf<AndroidProvider, VitalHealthManagerBridge>()
  private var statusObservationJobs = mutableMapOf<AndroidProvider, Job>()
  private var connectionObservationJobs = mutableMapOf<AndroidProvider, Job>()

  private var mainScope = MainScope()

  override fun getName(): String {
    return NAME
  }

  override fun invalidate() {
    mainScope.cancel()
    super.invalidate()
  }

  @ReactMethod
  fun isAvailable(promise: Promise) = runOnMain {
    promise.resolve(definitionOf(AndroidProvider.HealthConnect).isAvailable(reactApplicationContext))
  }

  @ReactMethod
  fun configure(
    syncOnAppStart: Boolean,
    numberOfDaysToBackFill: Int,
    enableLogs: Boolean,
    connectionPolicy: String,
    promise: Promise,
  ) = runOnMain {
    logger.enabled = enableLogs

    val providerDefinition = definitionOf(AndroidProvider.HealthConnect)
    val availability = providerDefinition.isAvailable(reactApplicationContext)
    if (availability != ProviderAvailability.Installed) {
      return@runOnMain promise.reject(
        VITAL_HEALTH_ERROR,
        "${providerDefinition.displayName} is unavailable: $availability",
      )
    }

    val manager = providerDefinition.getOrCreateManager(reactApplicationContext)
    startStatusUpdate(providerDefinition, manager)

    manager.configure(
      syncOnAppStart = syncOnAppStart,
      numberOfDaysToBackFill = numberOfDaysToBackFill,
      logsEnabled = enableLogs,
      connectionPolicy = parseConnectionPolicy(connectionPolicy),
    )

    promise.resolve(null)
  }

  @ReactMethod
  fun ask(
    readResources: ReadableArray,
    writeResources: ReadableArray?,
    config: ReadableMap?,
    promise: Promise,
  ) = runOnMain {
    config

    if (synchronized(this) { askForPermission != null }) {
      return@runOnMain promise.reject(
        VITAL_HEALTH_ERROR,
        "Another ask for permission call is already in progress.",
      )
    }

    val activity = reactApplicationContext.currentActivity ?: return@runOnMain promise.reject(
      VITAL_HEALTH_ERROR,
      "Cannot find the current ReactNative Activity",
    )

    if (activity !is ComponentActivity) {
      return@runOnMain promise.reject(
        VITAL_HEALTH_ERROR,
        "The Android Activity class of your React Native host app must be a androidx.activity.ComponentActivity subclass for the permission request flow to function properly.",
      )
    }

    val providerDefinition = definitionOf(AndroidProvider.HealthConnect)
    val manager = providerDefinition.getOrCreateManager(reactApplicationContext)

    val read = readResources.toArrayList().mapTo(mutableSetOf()) {
      try {
        VitalResource.valueOf(it as String)
      } catch (e: IllegalArgumentException) {
        return@runOnMain promise.reject(
          VITAL_HEALTH_ERROR,
          "Unrecognized vital resource: $it",
        )
      }
    }
    val write = writeResources?.toArrayList()?.mapTo(mutableSetOf()) {
      try {
        WritableVitalResource.valueOf(it as String)
      } catch (e: IllegalArgumentException) {
        return@runOnMain promise.reject(
          VITAL_HEALTH_ERROR,
          "Unrecognized writable resource: $it",
        )
      }
    } ?: emptySet()

    val unsupportedWriteResources = write - providerDefinition.supportedWriteResources
    if (unsupportedWriteResources.isNotEmpty()) {
      return@runOnMain promise.reject(
        VITAL_HEALTH_ERROR,
        "Write access is unavailable for ${providerDefinition.displayName}: " +
          unsupportedWriteResources.joinToString(", ") { it.name },
      )
    }

    val contract = try {
      manager.createPermissionRequestContract(
        readResources = read,
        writeResources = write,
      )
    } catch (e: Throwable) {
      return@runOnMain promise.reject(VITAL_HEALTH_ERROR, e.message, e)
    }

    synchronized(this) {
      askForPermission = AskForPermissionContinuation(contract, manager, promise)
    }

    val registry = activity.activityResultRegistry
    val launcherRef = AtomicReference<ActivityResultLauncher<Unit>?>(null)
    val launcher = registry.register("io.tryvital.health.ask", contract) { result ->
      val continuation = synchronized(this) {
        val currentValue = askForPermission
        askForPermission = null
        currentValue
      }

      launcherRef.getAndSet(null)?.unregister()

      if (continuation != null) {
        mainScope.launch {
          try {
            continuation.promise.resolve(
              continuation.manager.resolvePermissionOutcome(result).jsValue,
            )
          } catch (e: Throwable) {
            continuation.promise.reject(VITAL_HEALTH_ERROR, e.message, e)
          }
        }
      }
    }
    launcherRef.set(launcher)
    launcher.launch(Unit)
  }

  @ReactMethod
  fun hasAskedForPermission(resource: String, promise: Promise) = runOnMain {
    val vitalResource = try {
      VitalResource.valueOf(resource)
    } catch (e: IllegalArgumentException) {
      return@runOnMain promise.reject(
        VITAL_HEALTH_ERROR,
        "Unrecognized vital resource: $resource",
      )
    }

    val manager = managerOf(AndroidProvider.HealthConnect)
    promise.resolve(manager.hasAskedForPermission(vitalResource))
  }

  @ReactMethod
  fun syncData(resources: ReadableArray, promise: Promise) = runOnMain {
    val vitalResources = resources.toArrayList()
      .mapNotNull {
        try {
          VitalResource.valueOf(it.toString())
        } catch (e: IllegalArgumentException) {
          promise.reject(VITAL_HEALTH_ERROR, "Unrecognized vital resource: $it")
          return@runOnMain
        }
      }
      .toSet()

    val manager = managerOf(AndroidProvider.HealthConnect)

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
    startDate: Double,
    endDate: Double,
    value: Double,
    promise: Promise,
  ) = runOnMain {
    val writableResource = try {
      WritableVitalResource.valueOf(resource)
    } catch (e: IllegalArgumentException) {
      return@runOnMain promise.reject(
        VITAL_HEALTH_ERROR,
        "Unrecognized writable resource: $resource",
      )
    }

    val providerDefinition = definitionOf(AndroidProvider.HealthConnect)
    if (writableResource !in providerDefinition.supportedWriteResources) {
      return@runOnMain promise.reject(
        VITAL_HEALTH_ERROR,
        "Writing ${writableResource.name} is unavailable for ${providerDefinition.displayName}.",
      )
    }

    val manager = providerDefinition.getOrCreateManager(reactApplicationContext)

    try {
      manager.writeRecord(
        writableResource,
        startDate = Instant.ofEpochMilli(startDate.toLong()),
        endDate = Instant.ofEpochMilli(endDate.toLong()),
        value = value,
      )
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(
        VITAL_HEALTH_ERROR,
        "Failed to write data: ${e.message}",
        e,
      )
    }
  }

  @ReactMethod
  fun enableBackgroundSync(promise: Promise) = runOnMain {
    if (synchronized(this) { enableBackgroundSync != null }) {
      return@runOnMain promise.reject(
        VITAL_HEALTH_ERROR,
        "Another enableBackgroundSync call is already in progress.",
      )
    }

    val activity = reactApplicationContext.currentActivity ?: return@runOnMain promise.reject(
      VITAL_HEALTH_ERROR,
      "Cannot find the current ReactNative Activity",
    )

    if (activity !is ComponentActivity) {
      return@runOnMain promise.reject(
        VITAL_HEALTH_ERROR,
        "The Android Activity class of your React Native host app must be a androidx.activity.ComponentActivity subclass for the permission request flow to function properly.",
      )
    }

    val manager = managerOf(AndroidProvider.HealthConnect)
    val contract = manager.enableBackgroundSyncContract()

    synchronized(this) {
      enableBackgroundSync = EnableBackgroundSyncContinuation(contract, promise)
    }

    val registry = activity.activityResultRegistry
    val launcherRef = AtomicReference<ActivityResultLauncher<Unit>?>(null)
    val launcher = registry.register("io.tryvital.health.enableBackgroundSync", contract) { success ->
      val continuation = synchronized(this) {
        val currentValue = enableBackgroundSync
        enableBackgroundSync = null
        currentValue
      }

      launcherRef.getAndSet(null)?.unregister()

      if (continuation != null) {
        continuation.promise.resolve(success)
      }
    }
    launcherRef.set(launcher)
    launcher.launch(Unit)
  }

  @ReactMethod
  fun disableBackgroundSync(promise: Promise) = runOnMain {
    managerOf(AndroidProvider.HealthConnect)
      .disableBackgroundSync()
    promise.resolve(null)
  }

  @ReactMethod
  fun setSyncNotificationContent(content: String, promise: Promise) = runOnMain {
    val manager = managerOf(AndroidProvider.HealthConnect)

    try {
      val payload = Json.decodeFromString<JsonObject>(content).let {
        VitalHealthSyncNotificationContent(
          notificationTitle = it["notificationTitle"]!!.jsonPrimitive.content,
          notificationContent = it["notificationContent"]!!.jsonPrimitive.content,
          channelName = it["channelName"]!!.jsonPrimitive.content,
          channelDescription = it["channelDescription"]!!.jsonPrimitive.content,
        )
      }

      manager.setSyncNotificationContent(reactApplicationContext, payload)
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(VITAL_HEALTH_ERROR, "Failed to decode the supplied notification content", e)
    }
  }

  @ReactMethod
  fun setPauseSynchronization(paused: Boolean, promise: Promise) = runOnMain {
    val manager = managerOf(AndroidProvider.HealthConnect)
    manager.pauseSynchronization = paused
    promise.resolve(null)
  }

  @ReactMethod
  fun getPauseSynchronization(promise: Promise) = runOnMain {
    val manager = managerOf(AndroidProvider.HealthConnect)
    promise.resolve(manager.pauseSynchronization)
  }

  @ReactMethod
  fun isBackgroundSyncEnabled(promise: Promise) = runOnMain {
    val manager = managerOf(AndroidProvider.HealthConnect)
    promise.resolve(manager.isBackgroundSyncEnabled)
  }

  @ReactMethod
  fun autoSyncThrottle(promise: Promise) = runOnMain {
    val manager = managerOf(AndroidProvider.HealthConnect)
    promise.resolve(manager.autoSyncThrottle.inWholeMilliseconds.toDouble())
  }

  @ReactMethod
  fun backgroundSyncMinimumInterval(promise: Promise) = runOnMain {
    val manager = managerOf(AndroidProvider.HealthConnect)
    promise.resolve(manager.backgroundSyncMinimumInterval.inWholeMilliseconds.toDouble())
  }

  @ReactMethod
  fun setBackgroundSyncMinimumInterval(intervalInMilliseconds: Double, promise: Promise) = runOnMain {
    val manager = managerOf(AndroidProvider.HealthConnect)
    manager.backgroundSyncMinimumInterval = intervalInMilliseconds.milliseconds
    promise.resolve(null)
  }

  @ReactMethod
  fun setAutoSyncThrottle(thresholdInMilliseconds: Double, promise: Promise) = runOnMain {
    val manager = definitionOf(AndroidProvider.HealthConnect).getOrCreateManager(reactApplicationContext)
    manager.autoSyncThrottle = thresholdInMilliseconds.milliseconds
    promise.resolve(null)
  }

  @ReactMethod
  fun openPlatformHealthApp(promise: Promise) = runOnMain {
    val activity = reactApplicationContext.currentActivity ?: return@runOnMain promise.reject(
      VITAL_HEALTH_ERROR,
      "No active Android Activity",
    )

    definitionOf(AndroidProvider.HealthConnect)
      .openPlatformHealthAppIntent(reactApplicationContext)
      ?.let(activity::startActivity)

    promise.resolve(null)
  }

  @ReactMethod
  fun getConnectionStatus(promise: Promise) = runOnMain {
    val manager = managerOf(AndroidProvider.HealthConnect)
    promise.resolve(
      manager.connectionStatus.value.name.replaceFirstChar { it.lowercase() },
    )
  }

  @ReactMethod
  fun connect(promise: Promise) = runOnMain {
    try {
      managerOf(AndroidProvider.HealthConnect)
        .connect()
      promise.resolve(null)
    } catch (e: Throwable) {
      promise.reject(VITAL_HEALTH_ERROR, e.message, e)
    }
  }

  @ReactMethod
  fun disconnect(promise: Promise) = runOnMain {
    try {
      managerOf(AndroidProvider.HealthConnect)
        .disconnect()
      promise.resolve(null)
    } catch (e: Throwable) {
      promise.reject(VITAL_HEALTH_ERROR, e.message, e)
    }
  }

  @ReactMethod
  fun addListener(eventName: String?) {
    eventName
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    count
  }

  override fun getConstants(): MutableMap<String, Any> {
    return VitalHealthEvent.values().associate { it.value to it.value }.toMutableMap()
  }

  private fun startStatusUpdate(
    providerDefinition: VitalHealthProviderDefinition,
    manager: VitalHealthManagerBridge,
  ) {
    val provider = providerDefinition.provider

    statusObservationJobs[provider]?.cancel()
    connectionObservationJobs[provider]?.cancel()

    statusObservationJobs[provider] = manager.status
      .onEach { status ->
        sendEvent(providerDefinition.syncStatusEvent, statusPayload(status))
      }
      .launchIn(mainScope)

    connectionObservationJobs[provider] = manager.connectionStatus
      .onEach { status ->
        sendEvent(
          providerDefinition.connectionStatusEvent,
          status.name.replaceFirstChar { it.lowercase() },
        )
      }
      .launchIn(mainScope)
  }

  private fun statusPayload(status: SyncStatus): Any {
    return when (status) {
      is SyncStatus.ResourceSyncFailed -> Arguments.createMap().apply {
        putString("status", "failedSyncing")
        putString("resource", status.resource.name)
      }
      is SyncStatus.ResourceNothingToSync -> Arguments.createMap().apply {
        putString("status", "nothingToSync")
        putString("resource", status.resource.name)
      }
      is SyncStatus.ResourceSyncing -> Arguments.createMap().apply {
        putString("status", "syncing")
        putString("resource", status.resource.name)
      }
      is SyncStatus.ResourceSyncingComplete -> Arguments.createMap().apply {
        putString("status", "successSyncing")
        putString("resource", status.resource.name)
      }
      SyncStatus.SyncingCompleted -> WritableNativeMap().apply {
        putString("status", "syncingCompleted")
      }
      SyncStatus.Unknown -> WritableNativeMap().apply {
        putString("status", "unknown")
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

  private fun parseConnectionPolicy(connectionPolicy: String): ConnectionPolicy {
    return kotlin.runCatching {
      ConnectionPolicy.valueOf(connectionPolicy.replaceFirstChar { it.titlecase() })
    }.getOrNull() ?: ConnectionPolicy.AutoConnect
  }

  private fun definitionOf(provider: AndroidProvider) = when (provider) {
    AndroidProvider.HealthConnect -> HealthConnectVitalHealthProviderDefinition
    AndroidProvider.SamsungHealth -> SamsungHealthVitalHealthProviderDefinition
  }

  private fun managerOf(provider: AndroidProvider): VitalHealthManagerBridge {
    val existing = this.managers[provider]
    if (existing != null) {
      return existing
    }

    val manager = definitionOf(provider).getOrCreateManager(reactApplicationContext)
    this.managers[provider] = manager
    return manager
  }

  companion object {
    const val NAME = "VitalHealthReactNative"

    @JvmStatic
    fun enableDebugLogging() {
      VitalLogger.getOrCreate().enabled = true
    }

    /**
     * This method is a workaround which manually dispatches request permission results back to
     * where AndroidX activity result contracts expect them.
     *
     * As at React Native 0.37, ReactActivity eats the `onRequestPermissionsResult` and does not
     * forward it to AndroidX AppCompatActivity / ComponentActivity. This causes some (if not all)
     * ActivityResultsContract to be broken.
     */
    @SuppressLint("VisibleForTests")
    fun onRequestPermissionsResult(
      reactInstanceManager: ReactInstanceManager,
      p0: Int,
      p1: Array<out String>?,
      p2: IntArray?,
    ) {
      val module = reactInstanceManager.currentReactContext
        ?.getNativeModule(VitalHealthReactNativeModule::class.java)
        ?: return

      if (synchronized(module) { module.askForPermission != null }) {
        val activity = module.reactApplicationContext.currentActivity as? ComponentActivity ?: return

        activity.activityResultRegistry.dispatchResult(
          p0,
          android.app.Activity.RESULT_OK,
          Intent()
            .putExtra(EXTRA_PERMISSIONS, p1!!)
            .putExtra(EXTRA_PERMISSION_GRANT_RESULTS, p2!!),
        )
      }
    }
  }

  private inline fun runOnMain(crossinline action: suspend () -> Unit) {
    mainScope.launch { action() }
  }
}

private data class AskForPermissionContinuation(
  val contract: ActivityResultContract<Unit, Deferred<*>>,
  val manager: VitalHealthManagerBridge,
  val promise: Promise,
)

private data class EnableBackgroundSyncContinuation(
  val contract: ActivityResultContract<Unit, Boolean>,
  val promise: Promise,
)
