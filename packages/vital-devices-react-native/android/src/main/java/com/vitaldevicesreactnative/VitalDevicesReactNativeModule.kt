package com.vitaldevicesreactnative

import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.tryvital.client.services.data.QuantitySamplePayload
import io.tryvital.vitaldevices.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*


class VitalDevicesReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val vitalDeviceManager = VitalDeviceManager(reactContext)
  private val knownScannedDevices: MutableMap<String, ScannedDevice> = mutableMapOf()
  private var mainScope = MainScope()
  private var activeScan: Job? = null

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  private fun getConnectedDevices(
    id: String,
    name: String,
    brand: String,
    kind: String,
    promise: Promise
  ) {
    try {
      val deviceModel = DeviceModel(
        id = id,
        name = name,
        brand = stringToBrand(brand),
        kind = stringToKind(kind),
      )

      val devices = vitalDeviceManager.connected(deviceModel)
      devices.forEach { knownScannedDevices[it.address] = it }

      promise.resolve(WritableNativeMap().apply {
        putArray("devices", WritableNativeArray().apply {
          devices.forEach {
            WritableNativeMap().apply {
              putString("id", it.address)
              putString("name", it.name)
              putString("address", it.address)
              putMap("deviceModel", WritableNativeMap().apply {
                putString("name", it.deviceModel.name)
                putString("brand", brandToString(it.deviceModel.brand))
                putString("kind", kindToString(it.deviceModel.kind))
              })
            }
          }
        }
      })
    } catch (e: Exception) {
        promise.reject("ScanError", e.message, e)
    }
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

    try {
      activeScan?.cancel()
      activeScan = vitalDeviceManager
        .search(deviceModel)
        .flowOn(Dispatchers.IO)
        .onEach {
          knownScannedDevices[it.address] = it

          sendEvent(VitalDevicesEvent.ScanEvent, WritableNativeMap().apply {
            putString("id", it.address)
            putString("name", it.name)
            putString("address", it.address)
            putMap("deviceModel", WritableNativeMap().apply {
              putString("name", it.deviceModel.name)
              putString("brand", brandToString(it.deviceModel.brand))
              putString("kind", kindToString(it.deviceModel.kind))
            })
          })
        }
        .onStart { promise.resolve(null) }
        .launchIn(mainScope)
    } catch (e: Exception) {
        promise.reject("ScanError", e.message, e)
    }
  }

  @ReactMethod
  fun stopScanForDevice(promise: Promise) {
    activeScan?.cancel()
    promise.resolve(null)
  }

  @ReactMethod
  fun pair(scannedDeviceId: String, promise: Promise) {
    val scannedDevice = knownScannedDevices[scannedDeviceId]

    if (scannedDevice == null) {
      promise.reject("PairError", "Device not found", null)
      return
    }

    mainScope.launch {
      try {
        vitalDeviceManager
          .pair(scannedDevice)
          .flowOn(Dispatchers.IO)
          .collect()

        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject("PairError", e.message, e)
      }
    }
  }

  @ReactMethod
  private fun readGlucoseMeter(scannedDeviceId: String, promise: Promise) {
    val scannedDevice = knownScannedDevices[scannedDeviceId]

    if (scannedDevice == null) {
      promise.reject("ReadError", "Device not found", null)
      return
    }

    mainScope.launch {
      try {
        val samples = vitalDeviceManager
          .glucoseMeter(reactApplicationContext, scannedDevice)
          .flowOn(Dispatchers.IO)
          .first()

        promise.resolve(WritableNativeMap().apply {
          putArray("samples", WritableNativeArray().apply {
            samples.forEach {
              pushMap(WritableNativeMap().apply {
                mapSample(it)
              })
            }
          })
        })
      } catch (e: Exception) {
        promise.reject("ReadError", e.message, e)
      }
    }
  }

  @ReactMethod
  private fun readBloodPressure(scannedDeviceId: String, promise: Promise) {
    val scannedDevice = knownScannedDevices[scannedDeviceId]

    if (scannedDevice == null) {
      promise.reject("ReadError", "Device not found", null)
      return
    }

    mainScope.launch {
      try {
        val samples = vitalDeviceManager
          .bloodPressure(reactApplicationContext, scannedDevice)
          .flowOn(Dispatchers.IO)
          .first()

        promise.resolve(WritableNativeMap().apply {
          putArray("samples", WritableNativeArray().apply {
            samples.forEach {
              pushMap(WritableNativeMap().apply {
                putMap("systolic", WritableNativeMap().apply {
                  mapSample(it.systolic)
                })
                putMap("diastolic", WritableNativeMap().apply {
                  mapSample(it.diastolic)
                })
                putMap("pulse", WritableNativeMap().apply {
                  mapSample(it.pulse)
                })
              })
            }
          })
        })
      } catch (e: Exception) {
        promise.reject("ReadError", e.message, e)
      }
    }
  }

  private fun WritableNativeMap.mapSample(it: QuantitySamplePayload) {
    putString("id", it.id)
    putString("value", it.value)
    putString("unit", it.unit)
    putString("startDate", it.startDate.time.toString())
    putString("endDate", it.endDate.time.toString())
    putString("type", it.type)
  }

  @ReactMethod
  fun addListener(eventName: String?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  private fun sendEvent(event: VitalDevicesEvent, params: Any) {
    try {
      reactApplicationContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(event.value, params)
    } catch (e: Exception) {
      Log.e("VitalDevices", "sendEvent: $e")
    }
  }

  override fun getConstants(): MutableMap<String, Any> {
    return VitalDevicesEvent.values().associate { it.value to it.value }.toMutableMap()
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

  companion object {
    const val NAME = "VitalDevicesReactNative"
  }
}
