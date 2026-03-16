package com.vitalhealthreactnative

sealed class VitalHealthEvent(val value: String) {
  object HealthConnectSyncStatus : VitalHealthEvent("HealthConnectSyncStatus")
  object HealthConnectConnectionStatus : VitalHealthEvent("HealthConnectConnectionStatus")
  object SamsungHealthSyncStatus : VitalHealthEvent("SamsungHealthSyncStatus")
  object SamsungHealthConnectionStatus : VitalHealthEvent("VitalHealthConnectConnectionStatus")

  companion object {
    fun values(): Array<VitalHealthEvent> {
      return arrayOf(HealthConnectSyncStatus, HealthConnectConnectionStatus, SamsungHealthSyncStatus, SamsungHealthConnectionStatus)
    }

    fun valueOf(value: String): VitalHealthEvent = values().first { it.value == value }
  }
}
