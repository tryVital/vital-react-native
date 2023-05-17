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
import com.squareup.moshi.adapters.Rfc3339DateJsonAdapter
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import io.tryvital.client.*
import io.tryvital.client.services.data.ManualProviderSlug
import io.tryvital.client.services.data.ProviderSlug
import io.tryvital.client.services.data.Source
import io.tryvital.client.services.data.TimeseriesPayload
import io.tryvital.client.utils.VitalLogger
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import java.security.Provider
import java.time.ZoneId
import java.util.*

const val VITAL_CORE_ERROR = "VitalCoreError"

internal val moshi by lazy {
  Moshi.Builder()
    .add(ReactNativeTimeSeriesData.adapterFactory())
    .add(Date::class.java, Rfc3339DateJsonAdapter())
    .addLast(KotlinJsonAdapterFactory())
    .build()
}

@ReactModule(name = VitalCoreReactNativeModule.NAME)
class VitalCoreReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val mainScope = MainScope()
  var client: VitalClient? = null

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun setUserId(userId: String, promise: Promise) {
    val client = client ?: return promise.rejectCoreNotConfigured()
    client.setUserId(userId)
    promise.resolve(null)
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
    val client = client ?: return promise.rejectCoreNotConfigured()

    mainScope.launch {
      client.cleanUp()
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun hasUserConnectedTo(provider: String, promise: Promise) {
    val client = client ?: return promise.rejectCoreNotConfigured()

    val slug = try { ProviderSlug.fromJsonName(provider) } catch (e: IllegalArgumentException) {
      return promise.reject(VITAL_CORE_ERROR, "Unrecognized provider slug: $provider")
    }

    promise.resolve(client.hasUserConnectedTo(slug))
  }

  @ReactMethod
  fun userConnectedSources(promise: Promise) {
    val client = client ?: return promise.rejectCoreNotConfigured()
    val userId = client.currentUserId ?: return promise.rejectUserIDNotSet()

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
    val userId = client.currentUserId ?: return promise.rejectUserIDNotSet()

    val slug = try { ManualProviderSlug.fromJsonName(provider) } catch (e: IllegalArgumentException) {
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
    val userId = client.currentUserId ?: return promise.rejectUserIDNotSet()

    val slug = try { ManualProviderSlug.fromJsonName(provider) } catch (e: IllegalArgumentException) {
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

private fun ManualProviderSlug.Companion.fromJsonName(name: String): ManualProviderSlug
  = jsonAdapter.fromJsonValue(name) ?: throw java.lang.IllegalArgumentException("Unrecognized manual provider slug: $name")

private fun ProviderSlug.Companion.fromJsonName(name: String): ProviderSlug
  = jsonAdapter.fromJsonValue(name) ?: throw java.lang.IllegalArgumentException("Unrecognized provider slug: $name")
