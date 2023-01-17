package com.vitalhealthreactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class VitalHealthReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun configure(
    backgroundDeliveryEnabled: Boolean,
    numberOfDaysToBackFill: Int,
    enableLogs: Boolean,
    promise: Promise
  ) {
    promise.resolve(null)
  }

  @ReactMethod
  fun askForResources(resources: List<String>, promise: Promise) {
    promise.resolve(null)
  }

  @ReactMethod
  fun hasAskedForPermission(resource: String, promise: Promise) {
    promise.resolve(null)
  }

  @ReactMethod
  fun syncData(resources: List<String>, promise: Promise) {
    promise.resolve(null)
  }

  @ReactMethod
  fun cleanUp(promise: Promise) {
    promise.resolve(null)
  }


  companion object {
    const val NAME = "VitalHealthReactNative"
  }
}
