package com.vitalhealthreactnative

sealed class VitalHealthEvent(val value: String) {
  object Status : VitalHealthEvent("Status")

  companion object {
    fun values(): Array<VitalHealthEvent> {
      return arrayOf(Status)
    }

    fun valueOf(value: String): VitalHealthEvent {
      return when (value) {
        "Status" -> Status
        else -> throw IllegalArgumentException("Invalid VitalHealthEvent value: $value")
      }
    }
  }

}
