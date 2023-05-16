package com.vitalcorereactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.module.annotations.ReactModule
import com.squareup.moshi.Moshi
import com.squareup.moshi.adapter
import io.tryvital.client.*
import io.tryvital.client.services.data.ManualProviderSlug
import io.tryvital.client.services.data.ProviderSlug
import io.tryvital.client.services.data.Source
import io.tryvital.client.services.data.TimeseriesPayload
import io.tryvital.client.utils.VitalLogger
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import java.time.ZoneId

const val VITAL_CORE_ERROR = "VitalCoreError"

@ReactModule(name = VitalCoreReactNativeModule.NAME)
class VitalCoreReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val mainScope = MainScope()
  var client: VitalClient? = null

  // TODO: VIT-2924 user ID management is misplaced. For now assume VitalHealth is always used.
  var userId: String? = null

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun setUserId(userId: String, promise: Promise) {
    promise.reject(VITAL_CORE_ERROR, "setUserId is unimplemented at VitalCore; Please use setUserId at VitalHealth for the time being.")
  }

  @ReactMethod
  fun configure(apiKey: String, environment: String, region: String, enableLogs: Boolean, promise: Promise) {
    try {
      VitalLogger.getOrCreate().enabled = enableLogs

      client = VitalClient(
        reactApplicationContext,
        // TODO: Expose these as enum constants in the RN SDK
        region = Region.valueOf(region.uppercase()),
        environment = Environment.valueOf(environment.lowercase().replaceFirstChar { it.uppercase() }),
        apiKey = apiKey
      )

      promise.resolve(null)
    } catch (e: IllegalArgumentException) {
      promise.reject(VITAL_CORE_ERROR, e.message, e)
    }
  }

  @ReactMethod
  fun cleanUp(promise: Promise) {
    promise.resolve(null)
  }

  @ReactMethod
  fun hasUserConnectedTo(provider: String, promise: Promise) {
    val client = client ?: return promise.rejectCoreNotConfigured()

    val slug = try { ProviderSlug.valueOf(provider) } catch (e: IllegalArgumentException) {
      return promise.reject(VITAL_CORE_ERROR, "Unrecognized provider slug: $provider")
    }

    promise.resolve(client.hasUserConnectedTo(slug))
  }

  @ReactMethod
  fun userConnectedSources(promise: Promise) {
    val client = client ?: return promise.rejectCoreNotConfigured()
    val userId = userId ?: return promise.rejectUserIDNotSet()

    mainScope.launch {
      try {
        val sources = client.userConnectedSources(userId)
        promise.resolve(
          WritableNativeArray().apply {
            for (source in sources) {
              WritableNativeMap()
                .apply {
                  putString("name", source.name)
                  putString("slug", source.slug.toString())
                  putString("logo", source.logo)
                }
                .let(this::pushMap)
            }
          }
        )
      } catch (e: Throwable) {
        promise.reject(VITAL_CORE_ERROR, "Failed to look up user connected source: ${e.message}", e)
      }
    }
  }

  @ReactMethod
  fun createConnectedSourceIfNotExist(provider: String, promise: Promise) {
    val client = client ?: return promise.rejectCoreNotConfigured()
    val userId = userId ?: return promise.rejectUserIDNotSet()

    val slug = try { ManualProviderSlug.valueOf(provider) } catch (e: IllegalArgumentException) {
      return promise.reject(VITAL_CORE_ERROR, "Unrecognized manual provider: $provider")
    }

    mainScope.launch {
      try {
        client.createConnectedSourceIfNotExist(slug, userId)
        promise.resolve(null)
      } catch (e: Throwable) {
        promise.reject(VITAL_CORE_ERROR, "Failed to create connected source for $provider: ${e.message}", e)
      }
    }
  }

  @ReactMethod
  @OptIn(ExperimentalStdlibApi::class)
  fun postTimeSeriesData(jsonString: String, provider: String, timeZoneString: String?, promise: Promise) {
    val client = client ?: return promise.rejectCoreNotConfigured()
    val userId = userId ?: return promise.rejectUserIDNotSet()

    val slug = try { ManualProviderSlug.valueOf(provider) } catch (e: IllegalArgumentException) {
      return promise.reject(VITAL_CORE_ERROR, "Unrecognized manual provider: $provider")
    }

    val timeZone = if (timeZoneString != null) {
      try {
        ZoneId.of(timeZoneString)
      } catch (e: Exception) {
        promise.reject(VITAL_CORE_ERROR, "Unrecognized named time zone: $timeZoneString", e)
        return
      }
    } else {
      ZoneId.systemDefault()
    }

    val moshi = Moshi.Builder().add(ReactNativeTimeSeriesData.adapter()).build()
    val adapter = moshi.adapter<ReactNativeTimeSeriesData>()

    val data = adapter.fromJson(jsonString)
    if (data == null) {
      promise.reject(VITAL_CORE_ERROR, "Failed to decode the provided JSON String.", null)
      return
    }

    fun <T> makeTimeseriesPayload(data: T) = TimeseriesPayload(
      stage = "daily",
      provider = slug,
      startDate = null,
      endDate = null,
      timeZoneId = timeZone.id,
      data = data,
    )

    mainScope.launch {
      try {
        when (data) {
          is ReactNativeTimeSeriesData.Glucose ->
            client.vitalsService.sendGlucose(
              userId = userId,
              glucosePayloads = makeTimeseriesPayload(
                data.samples.map { it.payload }
              )
            )
          is ReactNativeTimeSeriesData.BloodPressure ->
            client.vitalsService.sendBloodPressure(
              userId = userId,
              timeseriesPayload = makeTimeseriesPayload(
                data.samples.map { it.payload }
              )
            )
        }

        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject(VITAL_CORE_ERROR, "${(e::class.simpleName ?: "")}: ${e.message}", e)
      }
    }
  }

  companion object {
    const val NAME = "VitalCoreReactNative"
  }
}

private fun Promise.rejectCoreNotConfigured()
  = reject(VITAL_CORE_ERROR, "VitalCore client has not been configured.")

private fun Promise.rejectUserIDNotSet()
  = reject(VITAL_CORE_ERROR, "User ID has not been set.")
