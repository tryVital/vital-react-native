package com.vitalhealthreactnative

import android.content.Context
import androidx.activity.result.contract.ActivityResultContract
import io.tryvital.vitalhealthconnect.DefaultSyncNotificationBuilder
import io.tryvital.vitalhealthconnect.DefaultSyncNotificationContent
import io.tryvital.vitalhealthconnect.ExperimentalVitalApi
import io.tryvital.vitalhealthconnect.VitalHealthConnectManager
import io.tryvital.vitalhealthconnect.autoSyncThrottle
import io.tryvital.vitalhealthconnect.backgroundSyncMinimumInterval
import io.tryvital.vitalhealthconnect.disableBackgroundSync
import io.tryvital.vitalhealthconnect.enableBackgroundSyncContract
import io.tryvital.vitalhealthconnect.isBackgroundSyncEnabled
import io.tryvital.vitalhealthconnect.model.PermissionOutcome as HealthConnectPermissionOutcome
import io.tryvital.vitalhealthcore.model.ConnectionPolicy
import io.tryvital.vitalhealthcore.model.ProviderAvailability
import io.tryvital.vitalhealthcore.model.VitalResource
import io.tryvital.vitalhealthcore.model.WritableVitalResource
import kotlinx.coroutines.Deferred
import java.time.Instant

internal object HealthConnectVitalHealthProviderDefinition : VitalHealthProviderDefinition {
  override val provider = AndroidProvider.HealthConnect
  override val displayName = "Health Connect"
  override val supportedWriteResources = setOf(
    WritableVitalResource.Water,
    WritableVitalResource.Glucose,
  )
  override val syncStatusEvent = VitalHealthEvent.HealthConnectSyncStatus
  override val connectionStatusEvent = VitalHealthEvent.HealthConnectConnectionStatus

  override fun isAvailable(context: Context): ProviderAvailability {
    return VitalHealthConnectManager.isAvailable(context)
  }

  override fun openPlatformHealthAppIntent(context: Context) =
    VitalHealthConnectManager.openHealthConnectIntent(context)

  override fun getOrCreateManager(context: Context): VitalHealthManagerBridge {
    return HealthConnectVitalHealthManagerBridge(
      VitalHealthConnectManager.getOrCreate(context),
    )
  }
}

@OptIn(ExperimentalVitalApi::class)
private class HealthConnectVitalHealthManagerBridge(
  private val manager: VitalHealthConnectManager,
) : VitalHealthManagerBridge {
  override val status = manager.status
  override val connectionStatus = manager.connectionStatus

  override var pauseSynchronization: Boolean
    get() = manager.pauseSynchronization
    set(value) {
      manager.pauseSynchronization = value
    }

  override val isBackgroundSyncEnabled: Boolean
    get() = manager.isBackgroundSyncEnabled

  override var autoSyncThrottle
    get() = manager.autoSyncThrottle
    set(value) {
      manager.autoSyncThrottle = value
    }

  override var backgroundSyncMinimumInterval
    get() = manager.backgroundSyncMinimumInterval
    set(value) {
      manager.backgroundSyncMinimumInterval = value
    }

  override fun configure(
    syncOnAppStart: Boolean,
    numberOfDaysToBackFill: Int,
    logsEnabled: Boolean,
    connectionPolicy: ConnectionPolicy,
  ) {
    manager.configureHealthConnectClient(
      logsEnabled = logsEnabled,
      syncOnAppStart = syncOnAppStart,
      numberOfDaysToBackFill = numberOfDaysToBackFill,
      connectionPolicy = connectionPolicy,
    )
  }

  @Suppress("UNCHECKED_CAST")
  override fun createPermissionRequestContract(
    readResources: Set<VitalResource>,
    writeResources: Set<WritableVitalResource>,
  ): ActivityResultContract<Unit, Deferred<*>> {
    return manager.createPermissionRequestContract(
      readResources = readResources,
      writeResources = writeResources,
    ) as ActivityResultContract<Unit, Deferred<*>>
  }

  @Suppress("UNCHECKED_CAST")
  override suspend fun resolvePermissionOutcome(result: Deferred<*>): VitalHealthPermissionOutcome {
    return when ((result as Deferred<HealthConnectPermissionOutcome>).await()) {
      is HealthConnectPermissionOutcome.Success -> VitalHealthPermissionOutcome.Success
      is HealthConnectPermissionOutcome.HealthConnectUnavailable ->
        VitalHealthPermissionOutcome.HealthDataUnavailable
      is HealthConnectPermissionOutcome.Cancelled -> VitalHealthPermissionOutcome.Cancelled
      is HealthConnectPermissionOutcome.NotPrompted -> VitalHealthPermissionOutcome.NotPrompted
      is HealthConnectPermissionOutcome.UnknownError -> VitalHealthPermissionOutcome.UnknownError
    }
  }

  override fun hasAskedForPermission(resource: VitalResource): Boolean {
    return manager.hasAskedForPermission(resource)
  }

  override suspend fun syncData(resources: Set<VitalResource>?) {
    manager.syncData(resources)
  }

  override suspend fun writeRecord(
    resource: WritableVitalResource,
    startDate: Instant,
    endDate: Instant,
    value: Double,
  ) {
    manager.writeRecord(resource, startDate, endDate, value)
  }

  override fun enableBackgroundSyncContract(): ActivityResultContract<Unit, Boolean> {
    return manager.enableBackgroundSyncContract()
  }

  override fun disableBackgroundSync() {
    manager.disableBackgroundSync()
  }

  override fun setSyncNotificationContent(
    context: Context,
    content: VitalHealthSyncNotificationContent,
  ): Boolean {
    val builder = VitalHealthConnectManager.syncNotificationBuilder(context)
      as? DefaultSyncNotificationBuilder
      ?: return false

    builder.setContentOverride(
      DefaultSyncNotificationContent(
        notificationTitle = content.notificationTitle,
        notificationContent = content.notificationContent,
        channelName = content.channelName,
        channelDescription = content.channelDescription,
      ),
    )
    return true
  }

  override suspend fun connect() {
    manager.connect()
  }

  override suspend fun disconnect() {
    manager.disconnect()
  }
}
