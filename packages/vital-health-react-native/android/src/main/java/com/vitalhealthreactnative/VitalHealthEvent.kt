package com.vitalhealthreactnative

sealed class VitalHealthEvent(val value: String) {
  object Status : VitalHealthEvent("Status")
  object ConnectionStatus : VitalHealthEvent("VitalHealthConnectionStatus")

  companion object {
    fun values(): Array<VitalHealthEvent> {
      return arrayOf(Status, ConnectionStatus)
    }

    fun valueOf(value: String): VitalHealthEvent {
      return when (value) {
        "Status" -> Status
        "VitalHealthConnectionStatus" -> ConnectionStatus
        else -> throw IllegalArgumentException("Invalid VitalHealthEvent value: $value")
      }
    }
  }

}
