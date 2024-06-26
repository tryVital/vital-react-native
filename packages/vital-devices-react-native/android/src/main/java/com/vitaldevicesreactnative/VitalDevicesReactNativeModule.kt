package com.vitaldevicesreactnative

import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.tryvital.client.services.data.LocalQuantitySample
import io.tryvital.vitaldevices.*
import io.tryvital.vitaldevices.devices.Libre1Reader
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*


class VitalDevicesReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val vitalDeviceManager = VitalDeviceManager(reactContext)
  private val scannedDevices: MutableList<ScannedDevice> = mutableListOf()
  private var mainScope = MainScope()
  private var activeScan: Job? = null

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

    try {
      activeScan?.cancel()
      activeScan = vitalDeviceManager
        .search(deviceModel)
        .flowOn(Dispatchers.IO)
        .onEach {
          scannedDevices.add(it)
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
    } catch (e: Throwable) {
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
    val scannedDevice = scannedDevices.firstOrNull { it.address == scannedDeviceId }

    if (scannedDevice == null) {
      promise.reject("PairError", "Device not found", null)
      return
    }

    mainScope.launch {
      try {
        when (scannedDevice.deviceModel.kind) {
          Kind.GlucoseMeter -> vitalDeviceManager
            .glucoseMeter(reactApplicationContext, scannedDevice)
            .pair()

          Kind.BloodPressure -> vitalDeviceManager
            .bloodPressure(reactApplicationContext, scannedDevice)
            .pair()
        }

        promise.resolve(null)
      } catch (e: Throwable) {
        promise.reject("PairError", e.message, e)
      }
    }
  }

  @ReactMethod
  private fun readLibre1(promise: Promise) {
    mainScope.launch {
      val activity = currentActivity ?: return@launch promise.reject("ReadError", "No active Android Activity")
      try {
        val reader = Libre1Reader.create(activity)
        val libre1 = reader.read()

        promise.resolve(WritableNativeMap().apply {
          putArray("samples", WritableNativeArray().apply {
            libre1.samples.forEach {
              pushMap(WritableNativeMap().apply {
                mapSample(it)
              })
            }
          })
          putMap("sensor", WritableNativeMap().apply {
            putString("serial", libre1.sensor.serial)
            putInt("age", libre1.sensor.age)
            putInt("maxLife", libre1.sensor.maxLife)
            // lowerCamelCase to match iOS
            putString("state", libre1.sensor.state.toString().replaceFirstChar { it.lowercaseChar() })
          })
        })
      } catch (e: Throwable) {
        promise.reject("ReadError", e.message, e)
      }
    }
  }

  @ReactMethod
  private fun readGlucoseMeter(scannedDeviceId: String, promise: Promise) {
    val scannedDevice = scannedDevices.firstOrNull { it.address == scannedDeviceId }

    if (scannedDevice == null) {
      promise.reject("ReadError", "Device not found", null)
      return
    }

    mainScope.launch {
      try {
        val samples = vitalDeviceManager
          .glucoseMeter(reactApplicationContext, scannedDevice)
          .read()

        promise.resolve(WritableNativeMap().apply {
          putArray("samples", WritableNativeArray().apply {
            samples.forEach {
              pushMap(WritableNativeMap().apply {
                mapSample(it)
              })
            }
          })
        })
      } catch (e: Throwable) {
        promise.reject("ReadError", e.message, e)
      }
    }
  }

  @ReactMethod
  private fun readBloodPressure(scannedDeviceId: String, promise: Promise) {
    val scannedDevice = scannedDevices.firstOrNull { it.address == scannedDeviceId }

    if (scannedDevice == null) {
      promise.reject("ReadError", "Device not found", null)
      return
    }

    mainScope.launch {
      try {
        val samples = vitalDeviceManager
          .bloodPressure(reactApplicationContext, scannedDevice)
          .read()

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

                val pulse = it.pulse
                if (pulse != null) {
                  putMap("pulse", WritableNativeMap().apply {
                    mapSample(pulse)
                  })
                } else {
                  putNull("pulse")
                }
              })
            }
          })
        })
      } catch (e: Throwable) {
        promise.reject("ReadError", e.message, e)
      }
    }
  }

  private fun WritableNativeMap.mapSample(it: LocalQuantitySample) {
    if (it.id != null) {
      putString("id", it.id)
    }
    putDouble("value", it.value)
    putString("unit", it.unit)
    putDouble("startDate", it.startDate.toEpochMilli().toDouble())
    putDouble("endDate", it.endDate.toEpochMilli().toDouble())

    if (it.type != null) {
      putString("type", it.type!!.rawValue)
    }
  }

  @ReactMethod
  fun addListener(@Suppress("UNUSED_PARAMETER") eventName: String?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun removeListeners(@Suppress("UNUSED_PARAMETER") count: Int) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  private fun sendEvent(event: VitalDevicesEvent, params: Any) {
    try {
      reactApplicationContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(event.value, params)
    } catch (e: Throwable) {
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
