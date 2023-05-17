package com.vitalcorereactnative

import com.squareup.moshi.adapters.PolymorphicJsonAdapterFactory
import io.tryvital.client.services.data.BloodPressureSamplePayload
import io.tryvital.client.services.data.QuantitySamplePayload
import java.util.*


sealed class ReactNativeTimeSeriesData {
  data class Glucose(val samples: List<ReactNativeQuantitySample>): ReactNativeTimeSeriesData()
  data class BloodPressure(val samples: List<ReactNativeBloodPressureSample>): ReactNativeTimeSeriesData()

  companion object {
    fun adapterFactory(): PolymorphicJsonAdapterFactory<ReactNativeTimeSeriesData> = PolymorphicJsonAdapterFactory
      .of(ReactNativeTimeSeriesData::class.java, "type")
      .withSubtype(Glucose::class.java, "glucose")
      .withSubtype(BloodPressure::class.java, "blood_pressure")
  }
}

data class ReactNativeQuantitySample(
  val id: String?,
  val value: Double,
  // JS Date is stringified via `Date.toISOString()` - ISO8601
  val startDate: Date,
  val endDate: Date,
  val sourceBundle: String?,
  val productType: String?,
  val type: String?,
  val unit: String,
) {
  val payload get() = QuantitySamplePayload(
    id = id,
    value = value,
    startDate = startDate,
    endDate = endDate,
    sourceBundle = sourceBundle,
    deviceModel = productType,
    type = type,
    unit = unit,
    metadata = null
  )
}

data class ReactNativeBloodPressureSample(
  val systolic: ReactNativeQuantitySample,
  val diastolic: ReactNativeQuantitySample,
  val pulse: ReactNativeQuantitySample?,
) {
  val payload get() = BloodPressureSamplePayload(
    systolic = systolic.payload,
    diastolic = diastolic.payload,
    pulse = pulse?.payload
  )
}
