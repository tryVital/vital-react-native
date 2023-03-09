package com.vitaldevicesreactnative

sealed class VitalDevicesEvent(val value: String) {
  object ScanEvent : VitalDevicesEvent("ScanEvent")

  companion object {
    fun values(): Array<VitalDevicesEvent> {
      return arrayOf(ScanEvent)
    }

    fun valueOf(value: String): VitalDevicesEvent {
      return when (value) {
        "ScanEvent" -> ScanEvent
        else -> throw IllegalArgumentException("Invalid VitalDevicesEvent value: $value")
      }
    }
  }
}
