package com.vitaldevicesreactnative

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.tryvital.vitaldevices.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.flowOn


class VitalDevicesReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val vitalDeviceManager = VitalDeviceManager(reactContext)
  private val scannedDevices: MutableList<ScannedDevice> = mutableListOf()
  private var mainScope: CoroutineScope? = null

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  private fun startScanForDevice(
    id: String,
    name: String,
    brand: String,
    kind: String,
    promise: Promise
  ) {
    val deviceModel = DeviceModel(
      id = id,
      name = name,
      brand = stringToBrand(brand),
      kind = stringToKind(kind),
    )

    Log.e("VitalDevices", "startScanForDevice: $deviceModel")

    mainScope?.cancel()
    mainScope = MainScope()
    mainScope?.launch {
      try {
        sendEvent("ScanEvent", "sad1")
        vitalDeviceManager.search(deviceModel).flowOn(Dispatchers.IO).collect {
          withContext(Dispatchers.Main) {
            Log.e("VitalDevices", "startScanForDevice: $it")
            scannedDevices.add(it)
            sendEvent("ScanEvent", "sad2")
          }
        }
      } catch (e: Exception) {
        withContext(Dispatchers.Main) {
          //todo: handle error
        }
      }
    }
    promise.resolve(null)
  }

  @ReactMethod
  fun stopScanForDevice(promise: Promise) {
    mainScope?.cancel()
    promise.resolve(null)
  }

  @ReactMethod
  fun addListener(eventName: String?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  private fun sendEvent(event: String, params: Any) {
    Log.e("VitalDevices", "sendEvent: $event, $params")
    try {
      reactApplicationContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(event, params)
    } catch (e: Exception) {
      Log.e("VitalDevices", "sendEvent: $e")
    }
  }

  private fun kindToString(kind: Kind): String {
    return when (kind) {
      Kind.GlucoseMeter -> "glucoseMeter"
      Kind.BloodPressure -> "bloodPressure"
    }
  }

  private fun brandToString(brand: Brand): String {
    return when (brand) {
      Brand.Omron -> "omron"
      Brand.AccuChek -> "accuChek"
      Brand.Contour -> "contour"
      Brand.Beurer -> "beurer"
      Brand.Libre -> "libre"
    }
  }

  private fun stringToBrand(string: String): Brand {
    return when (string) {
      "omron" -> Brand.Omron
      "accuChek" -> Brand.AccuChek
      "contour" -> Brand.Contour
      "beurer" -> Brand.Beurer
      "libre" -> Brand.Libre
      else -> throw Exception("Unsupported brand $string")
    }
  }

  private fun stringToKind(string: String): Kind {
    return when (string) {
      "bloodPressure" -> Kind.BloodPressure
      "glucoseMeter" -> Kind.GlucoseMeter
      else -> throw Exception("Unsupported kind $string")
    }
  }

  override fun getConstants(): MutableMap<String, Any> {
    return hashMapOf("SentScan" to "sentScan")
  }

  companion object {
    const val NAME = "VitalDevicesReactNative"
  }
}
