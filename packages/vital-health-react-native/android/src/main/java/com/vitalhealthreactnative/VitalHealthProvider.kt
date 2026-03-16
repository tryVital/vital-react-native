package com.vitalhealthreactnative

import android.content.Context
import android.content.Intent
import androidx.activity.result.contract.ActivityResultContract
import io.tryvital.vitalhealthcore.model.ConnectionPolicy
import io.tryvital.vitalhealthcore.model.ConnectionStatus
import io.tryvital.vitalhealthcore.model.ProviderAvailability
import io.tryvital.vitalhealthcore.model.SyncStatus
import io.tryvital.vitalhealthcore.model.VitalResource
import io.tryvital.vitalhealthcore.model.WritableVitalResource
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.StateFlow
import java.time.Instant
import kotlin.time.Duration

internal enum class AndroidProvider {
  HealthConnect, SamsungHealth;

  companion object {
    fun of(rawValue: String) = when (rawValue) {
      "health_connect" -> HealthConnect
      "samsung_health" -> SamsungHealth
      else -> throw IllegalArgumentException("unrecognized AndroidProvider: ${rawValue}")
    }
  }
}

internal interface VitalHealthProviderDefinition {
  val provider: AndroidProvider
  val displayName: String
  val supportedWriteResources: Set<WritableVitalResource>
  val syncStatusEvent: VitalHealthEvent
  val connectionStatusEvent: VitalHealthEvent

  fun isAvailable(context: Context): ProviderAvailability
  fun openPlatformHealthAppIntent(context: Context): Intent?
  fun getOrCreateManager(context: Context): VitalHealthManagerBridge
}

internal interface VitalHealthManagerBridge {
  val status: Flow<SyncStatus>
  val connectionStatus: StateFlow<ConnectionStatus>
  var pauseSynchronization: Boolean
  val isBackgroundSyncEnabled: Boolean
  var autoSyncThrottle: Duration
  var backgroundSyncMinimumInterval: Duration

  fun configure(
    syncOnAppStart: Boolean,
    numberOfDaysToBackFill: Int,
    logsEnabled: Boolean,
    connectionPolicy: ConnectionPolicy,
  )

  fun createPermissionRequestContract(
    readResources: Set<VitalResource>,
    writeResources: Set<WritableVitalResource>,
  ): ActivityResultContract<Unit, Deferred<*>>

  suspend fun resolvePermissionOutcome(result: Deferred<*>): VitalHealthPermissionOutcome

  fun hasAskedForPermission(resource: VitalResource): Boolean

  suspend fun syncData(resources: Set<VitalResource>? = null)

  suspend fun writeRecord(
    resource: WritableVitalResource,
    startDate: Instant,
    endDate: Instant,
    value: Double,
  )

  fun enableBackgroundSyncContract(): ActivityResultContract<Unit, Boolean>
  fun disableBackgroundSync()

  fun setSyncNotificationContent(
    context: Context,
    content: VitalHealthSyncNotificationContent,
  ): Boolean

  suspend fun connect()
  suspend fun disconnect()
}

internal data class VitalHealthSyncNotificationContent(
  val notificationTitle: String,
  val notificationContent: String,
  val channelName: String,
  val channelDescription: String,
)

internal enum class VitalHealthPermissionOutcome(val jsValue: String) {
  Success("success"),
  HealthDataUnavailable("healthDataUnavailable"),
  Cancelled("cancelled"),
  NotPrompted("notPrompted"),
  UnknownError("unknownError"),
}
