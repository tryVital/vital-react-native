package com.vitaldevicesreactnative

sealed class VitalDevicesEvent(val value: String) {
  object ScanEvent : VitalDevicesEvent("ScanEvent")
  object PairEvent : VitalDevicesEvent("PairEvent")
  object GlucoseMeterReadEvent : VitalDevicesEvent("GlucoseMeterReadEvent")
  object BloodPressureReadEvent : VitalDevicesEvent("BloodPressureReadEvent")

  companion object {
    fun values(): Array<VitalDevicesEvent> {
      return arrayOf(ScanEvent, PairEvent, GlucoseMeterReadEvent, BloodPressureReadEvent)
    }

    fun valueOf(value: String): VitalDevicesEvent {
      return when (value) {
        "ScanEvent" -> ScanEvent
        "PairEvent" -> PairEvent
        "GlucoseMeterReadEvent" -> GlucoseMeterReadEvent
        "BloodPressureReadEvent" -> BloodPressureReadEvent
        else -> throw IllegalArgumentException("Invalid VitalDevicesEvent value: $value")
      }
    }
  }
}
