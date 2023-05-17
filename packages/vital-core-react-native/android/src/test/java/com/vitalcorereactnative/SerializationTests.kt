package com.vitalcorereactnative

import com.squareup.moshi.adapter
import org.junit.Assert.assertEquals
import org.junit.Test
import java.time.Instant
import java.util.*


class SerializationTests {
  @OptIn(ExperimentalStdlibApi::class)
  @Test
  fun canDeserializeGlucoseSamples() {
    val date = "2023-01-23T12:34:56Z"
    val jsonString = """
    {
      "type": "glucose",
      "samples": [
        {
          "id":"id", "value":123.0, "startDate":"$date", "endDate":"$date",
          "sourceBundle":"source", "productType":"product", "type":"fingerprick", "unit":"mmol/L"
        }
      ]
    }
    """.trimIndent()
    val adapter = moshi.adapter<ReactNativeTimeSeriesData>()

    assertEquals(
      adapter.fromJson(jsonString),
      ReactNativeTimeSeriesData.Glucose(
        listOf(
          ReactNativeQuantitySample(
            id = "id",
            value = 123.0,
            startDate = Date.from(Instant.parse(date)),
            endDate = Date.from(Instant.parse(date)),
            sourceBundle = "source",
            productType = "product",
            type = "fingerprick",
            unit = "mmol/L",
          )
        )
      )
    )
  }

  @OptIn(ExperimentalStdlibApi::class)
  @Test
  fun canDeserializeBloodPressureSamples() {
    val date = "2023-01-23T12:34:56Z"
    val jsonString = """
    {
      "type": "blood_pressure",
      "samples": [
        {
          "systolic": {
            "id":"id", "value":100.0, "startDate":"$date", "endDate":"$date",
            "sourceBundle":"source", "productType":"product", "type":"cuff", "unit":"mmHg"
          },
          "diastolic": {
            "id":"id", "value":90.0, "startDate":"$date", "endDate":"$date",
            "sourceBundle":"source", "productType":"product", "type":"cuff", "unit":"mmHg"
          },
          "pulse": {
            "id":"id", "value":80.0, "startDate":"$date", "endDate":"$date",
            "sourceBundle":"source", "productType":"product", "type":"cuff", "unit":"bpm"
          }
        }
      ]
    }
    """.trimIndent()
    val adapter = moshi.adapter<ReactNativeTimeSeriesData>()

    fun makeSample(value: Double, unit: String) = ReactNativeQuantitySample(
      id = "id",
      value = value,
      startDate = Date.from(Instant.parse(date)),
      endDate = Date.from(Instant.parse(date)),
      sourceBundle = "source",
      productType = "product",
      type = "cuff",
      unit = unit,
    )

    assertEquals(
      adapter.fromJson(jsonString),
      ReactNativeTimeSeriesData.BloodPressure(
        listOf(
          ReactNativeBloodPressureSample(
            systolic = makeSample(value = 100.0, unit = "mmHg"),
            diastolic = makeSample(value = 90.0, unit = "mmHg"),
            pulse = makeSample(value = 80.0, unit = "bpm"),
          )
        )
      )
    )
  }
}
