package com.vitalcorereactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class VitalCoreReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun setUserId(userId: String, promise: Promise) {
    promise.resolve(null)
  }

  @ReactMethod
  fun configure(apiKey: String, environment: String, region: String, enableLogs: Boolean, promise: Promise) {
    promise.resolve(null)
  }

  @ReactMethod
  fun cleanUp(promise: Promise) {
    promise.resolve(null)
  }

  companion object {
    const val NAME = "VitalCoreReactNative"
  }
}
