package com.vitaldevicesreactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class VitalDevicesReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  private suspend fun startScanForDevice(id:String, name:String,brand:String, kind:String, promise: Promise) {
    val deviceModel = DeviceModel(
      id = id,
      name = name,
      brand = stringToBrand(brand),
      kind = stringToKind(kind),
    )

    try {
      vitalDeviceManager.search(deviceModel).flowOn(Dispatchers.IO).collect {
        withContext(Dispatchers.Main) {
          scannedDevices.add(it)
          channel.invokeMethod(
            "sendScan", JSONObject(
              mapOf(
                "id" to it.address, "name" to it.name, "deviceModel" to mapOf(
                  "id" to it.deviceModel.id,
                  "name" to it.deviceModel.name,
                  "brand" to brandToString(it.deviceModel.brand),
                  "kind" to kindToString(it.deviceModel.kind)
                )
              )
            ).toString()
          )
        }
      }
    } catch (e: Exception) {
      withContext(Dispatchers.Main) {
        channel.invokeMethod(
          "sendScan", JSONObject(
            mapOf(
              "code" to "UnknownError",
              "message" to e.message,
            )
          ).toString()
        )
      }
    }
  }


  companion object {
    const val NAME = "VitalDevicesReactNative"
  }
}
