package com.vitalhealthreactnative

import android.content.Context
import androidx.activity.result.contract.ActivityResultContract
import io.tryvital.vitalhealthcore.model.ConnectionPolicy
import io.tryvital.vitalhealthcore.model.ProviderAvailability
import io.tryvital.vitalhealthcore.model.VitalResource
import io.tryvital.vitalhealthcore.model.WritableVitalResource
import io.tryvital.vitalsamsunghealth.DefaultSyncNotificationBuilder
import io.tryvital.vitalsamsunghealth.DefaultSyncNotificationContent
import io.tryvital.vitalsamsunghealth.ExperimentalVitalApi
import io.tryvital.vitalsamsunghealth.VitalSamsungHealthManager
import io.tryvital.vitalsamsunghealth.autoSyncThrottle
import io.tryvital.vitalsamsunghealth.backgroundSyncMinimumInterval
import io.tryvital.vitalsamsunghealth.disableBackgroundSync
import io.tryvital.vitalsamsunghealth.enableBackgroundSyncContract
import io.tryvital.vitalsamsunghealth.isBackgroundSyncEnabled
import io.tryvital.vitalsamsunghealth.model.PermissionOutcome as SamsungPermissionOutcome
import kotlinx.coroutines.Deferred
import java.time.Instant

internal object SamsungHealthVitalHealthProviderDefinition : VitalHealthProviderDefinition {
  override val provider = AndroidProvider.SamsungHealth
  override val displayName = "Samsung Health"
  override val supportedWriteResources: Set<WritableVitalResource> = emptySet()
  override val syncStatusEvent = VitalHealthEvent.SamsungHealthSyncStatus
  override val connectionStatusEvent = VitalHealthEvent.SamsungHealthConnectionStatus

  override fun isAvailable(context: Context): ProviderAvailability {
    return VitalSamsungHealthManager.isAvailable(context)
  }

  override fun openPlatformHealthAppIntent(context: Context) =
    VitalSamsungHealthManager.openSamsungHealthIntent(context)

  override fun getOrCreateManager(context: Context): VitalHealthManagerBridge {
    return SamsungHealthVitalHealthManagerBridge(
      VitalSamsungHealthManager.getOrCreate(context),
    )
  }
}

@OptIn(ExperimentalVitalApi::class)
private class SamsungHealthVitalHealthManagerBridge(
  private val manager: VitalSamsungHealthManager,
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
    manager.configureSamsungHealthClient(
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
    require(writeResources.isEmpty()) {
      "Samsung Health does not support requesting write permissions."
    }

    return manager.createPermissionRequestContract(
      readResources = readResources,
    ) as ActivityResultContract<Unit, Deferred<*>>
  }

  @Suppress("UNCHECKED_CAST")
  override suspend fun resolvePermissionOutcome(result: Deferred<*>): VitalHealthPermissionOutcome {
    return when ((result as Deferred<SamsungPermissionOutcome>).await()) {
      is SamsungPermissionOutcome.Success -> VitalHealthPermissionOutcome.Success
      is SamsungPermissionOutcome.HealthConnectUnavailable ->
        VitalHealthPermissionOutcome.HealthDataUnavailable
      is SamsungPermissionOutcome.Cancelled -> VitalHealthPermissionOutcome.Cancelled
      is SamsungPermissionOutcome.NotPrompted -> VitalHealthPermissionOutcome.NotPrompted
      is SamsungPermissionOutcome.UnknownError -> VitalHealthPermissionOutcome.UnknownError
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
    throw UnsupportedOperationException("Samsung Health does not support writing health data.")
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
    val builder = VitalSamsungHealthManager.syncNotificationBuilder(context)
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
