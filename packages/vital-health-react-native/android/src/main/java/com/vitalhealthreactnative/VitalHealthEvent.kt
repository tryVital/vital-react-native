package com.vitalhealthreactnative

sealed class VitalHealthEvent(val value: String) {
  object HealthConnectSyncStatus : VitalHealthEvent("Status")
  object HealthConnectConnectionStatus : VitalHealthEvent("HealthConnectConnectionStatus")
  object SamsungHealthSyncStatus : VitalHealthEvent("SamsungHealthSyncStatus")
  object SamsungHealthConnectionStatus : VitalHealthEvent("SamsungHealthConnectionStatus")

  companion object {
    fun values(): Array<VitalHealthEvent> {
      return arrayOf(HealthConnectSyncStatus, HealthConnectConnectionStatus, SamsungHealthSyncStatus, SamsungHealthConnectionStatus)
    }

    fun valueOf(value: String): VitalHealthEvent = values().first { it.value == value }
  }
}
