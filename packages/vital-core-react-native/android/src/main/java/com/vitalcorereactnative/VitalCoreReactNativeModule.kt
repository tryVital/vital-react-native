package com.vitalcorereactnative

import com.facebook.react.bridge.NativeArray
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.squareup.moshi.Moshi
import com.squareup.moshi.adapter
import com.squareup.moshi.adapters.EnumJsonAdapter
import com.squareup.moshi.adapters.Rfc3339DateJsonAdapter
import io.tryvital.client.*
import io.tryvital.client.services.data.DataStage
import io.tryvital.client.services.data.IngestibleTimeseriesResource
import io.tryvital.client.services.data.ManualProviderSlug
import io.tryvital.client.services.data.ProviderSlug
import io.tryvital.client.services.data.Source
import io.tryvital.client.services.data.TimeseriesPayload
import io.tryvital.client.utils.VitalLogger
import kotlinx.coroutines.Job
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import java.time.ZoneId
import java.util.*
import kotlin.coroutines.Continuation
import kotlin.coroutines.resume

const val VITAL_CORE_ERROR = "VitalCoreError"
const val IDENTIFY_EXTERNAL_USER_REQUEST = "IdentifyExternalUserRequest"

internal val moshi by lazy {
  Moshi.Builder()
    .add(ReactNativeAuthenticateRequest.jsonAdapter)
    .add(Date::class.java, Rfc3339DateJsonAdapter())
    .build()
}

@ReactModule(name = VitalCoreReactNativeModule.NAME)
class VitalCoreReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val mainScope = MainScope()
  val client: VitalClient get() = VitalClient.getOrCreate(reactApplicationContext)
  private var listenerCount = 0
  private var statusObserver: Job? = null

  private val pendingIdentifyCalls = mutableMapOf<String, Continuation<String>>()

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun addListener(eventName: String) {
    if (listenerCount == 0) {
      statusObserver = mainScope.launch {
        VitalClient.statuses(reactApplicationContext)
          .onEach { eventEmitter().emit(STATUS_EVENT_KEY, it.toReactNativeStrings()) }
          .collect()
      }
    }

    listenerCount += 1
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    listenerCount -= count
    if (listenerCount == 0) {
      statusObserver?.cancel()
      statusObserver = null
    }
  }

  @ReactMethod
  fun signIn(token: String, promise: Promise) {
    mainScope.launch {
      try {
        VitalClient.signIn(reactApplicationContext, token)
        promise.resolve(null)
      } catch (e: Throwable) {
        promise.reject(e)
      }
    }
  }

  @ReactMethod
  fun status(promise: Promise) {
    // Ensure that the SDK is initialized.
    VitalClient.getOrCreate(reactApplicationContext)

    // NOTE: lowerCamelCase to be consistent with iOS RN interop.
    promise.resolve(VitalClient.status.toReactNativeStrings())
  }

  @ReactMethod
  fun currentUserId(promise: Promise) {
    // Ensure that the SDK is initialized.
    VitalClient.getOrCreate(reactApplicationContext)

    promise.resolve(VitalClient.currentUserId)
  }

  @ReactMethod
  fun identifiedExternalUser(promise: Promise) {
    // Ensure that the SDK is initialized.
    VitalClient.getOrCreate(reactApplicationContext)

    promise.resolve(VitalClient.identifiedExternalUser)
  }

  @ReactMethod
  fun identifyExternalUser(externalUserId: String, callId: String, promise: Promise) {
    mainScope.launch {
      try {
        VitalClient.identifyExternalUser(
          reactApplicationContext,
          externalUserId
        ) { innerExternalUserId ->
          val jsonPayload = suspendCancellableCoroutine<String> { continuation ->
            synchronized(this) {
              pendingIdentifyCalls[callId] = continuation
            }
            eventEmitter().emit(
              IDENTIFY_EXTERNAL_USER_REQUEST,
              WritableNativeArray().apply {
                pushString(callId)
                pushString(innerExternalUserId)
              }
            )
          }

          val request = moshi.adapter(ReactNativeAuthenticateRequest::class.java).fromJson(jsonPayload)
            ?: throw RuntimeException("failed to deserialize ReactNativeAuthenticateRequest")

          when (request) {
            is ReactNativeAuthenticateRequest.Error -> {
              throw RuntimeException("JS Error: ${request.name} ${request.message} ${request.stack}")
            }
            is ReactNativeAuthenticateRequest.SignInToken -> {
              AuthenticateRequest.SignInToken(request.rawToken)
            }
            is ReactNativeAuthenticateRequest.APIKey -> {
              AuthenticateRequest.APIKey(
                request.key,
                request.userId,
                Environment.valueOf(request.environment.lowercase().replaceFirstChar { it.uppercase() }),
                Region.valueOf(request.region.uppercase())
              )
            }
          }
        }

        promise.resolve(null)

      } catch (e: Throwable) {
        promise.reject(VITAL_CORE_ERROR, e.message, e)
      }
    }
  }

  @ReactMethod
  fun identifyExternalUserResponse(jsonPayload: String, callId: String, promise: Promise) {
    val continuation = synchronized(this) { pendingIdentifyCalls.remove(callId) }
    continuation?.resume(jsonPayload)
    promise.resolve(null)
  }

  @ReactMethod
  fun setUserId(userId: String, promise: Promise) {
    try {
      VitalClient.setUserId(reactApplicationContext, userId)
      promise.resolve(null)
    } catch (e: Throwable) {
      promise.reject(VITAL_CORE_ERROR, e.message, e)
    }
  }

  @ReactMethod
  fun configure(apiKey: String, environment: String, region: String, enableLogs: Boolean, promise: Promise) {
    try {
      VitalLogger.getOrCreate().enabled = enableLogs

      VitalClient.configure(
        context = reactApplicationContext,
        region = Region.valueOf(region.uppercase()),
        environment = Environment.valueOf(environment.lowercase().replaceFirstChar { it.uppercase() }),
        apiKey = apiKey
      )

      promise.resolve(null)
    } catch (e: Throwable) {
      promise.reject(VITAL_CORE_ERROR, e.message, e)
    }
  }

  @ReactMethod
  fun signOut(promise: Promise) {
    mainScope.launch {
      try {
        client.signOut()
        promise.resolve(null)
      } catch (e: Throwable) {
        promise.reject(VITAL_CORE_ERROR, e.message, e)
      }
    }
  }

  @ReactMethod
  fun hasUserConnectedTo(provider: String, promise: Promise) {
    val slug = try { ProviderSlug.fromJsonName(provider) } catch (e: IllegalArgumentException) {
      return promise.reject(VITAL_CORE_ERROR, "Unrecognized provider slug: $provider")
    }

    promise.resolve(client.hasUserConnectedTo(slug))
  }

  @ReactMethod
  fun userConnections(promise: Promise) {
    mainScope.launch {
      try {
        val sources = client.userConnections()
        promise.resolve(
          WritableNativeArray().apply {
            for (source in sources) {
              WritableNativeMap()
                .apply {
                  putString("name", source.name)
                  putString("slug", source.slug.toString())
                  putString("logo", source.logo)
                  putString("status", source.status.toString())
                  putMap("resourceAvailability", WritableNativeMap().apply {
                    for ((resource, value) in source.resourceAvailability) {
                      putMap(resource.toString(), WritableNativeMap().apply {
                        putString("status", value.status.toString())

                        val req = value.scopeRequirements
                        if (req != null) {
                          putMap("scopeRequirements", WritableNativeMap().apply {
                            putMap("userGranted", WritableNativeMap().apply {
                              putArray("required", WritableNativeArray().apply {
                                req.userGranted.required.forEach(this::pushString)
                              })
                              putArray("optional", WritableNativeArray().apply {
                                req.userGranted.optional.forEach(this::pushString)
                              })
                            })
                            putMap("userDenied", WritableNativeMap().apply {
                              putArray("required", WritableNativeArray().apply {
                                req.userDenied.required.forEach(this::pushString)
                              })
                              putArray("optional", WritableNativeArray().apply {
                                req.userDenied.optional.forEach(this::pushString)
                              })
                            })
                          })
                        } else {
                          putNull("scopeRequirements")
                        }
                      })
                    }
                  })
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
  fun deregisterProvider(provider: String, promise: Promise) {
    val userId = VitalClient.currentUserId ?: return promise.rejectUserIDNotSet()

    val slug = try { ProviderSlug.fromJsonName(provider) } catch (e: IllegalArgumentException) {
      return promise.reject(VITAL_CORE_ERROR, "Unrecognized provider slug: $provider")
    }

    mainScope.launch {
      try {
        client.userService.deregisterProvider(
          userId = userId,
          provider = slug
        )
        promise.resolve(null)
      } catch (e: Throwable) {
        promise.reject(VITAL_CORE_ERROR, "Failed to deregister provider: ${e.message}", e)
      }
    }
  }

  @ReactMethod
  fun sdkVersion(promise: Promise) {
    promise.resolve(VitalClient.sdkVersion)
  }

  @ReactMethod
  fun getAccessToken(promise: Promise) {
    mainScope.launch {
      try {
        val accessToken = VitalClient.getAccessToken(reactApplicationContext)
        promise.resolve(accessToken)
      } catch (e: Throwable) {
        promise.reject(VITAL_CORE_ERROR, e.message, e)
      }
    }
  }

  @ReactMethod
  fun refreshToken(promise: Promise) {
    mainScope.launch {
      try {
        VitalClient.refreshToken(reactApplicationContext)
        promise.resolve(null)
      } catch (e: Throwable) {
        promise.reject(VITAL_CORE_ERROR, e.message, e)
      }
    }
  }

  private fun eventEmitter() = reactApplicationContext
    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)

  companion object {
    const val NAME = "VitalCoreReactNative"

    // NOTE: Must be consistent with iOS RN Interop.
    const val STATUS_EVENT_KEY = "VitalClientStatus"
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

private fun Set<VitalClient.Status>.toReactNativeStrings(): NativeArray = WritableNativeArray().apply {
  forEach { status -> pushString(status.name.replaceFirstChar { it.lowercase() }) }
}
