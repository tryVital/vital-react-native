package com.vitaldevicesreactnative

import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.tryvital.client.services.data.QuantitySample
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
    mainScope?.cancel()
    mainScope = MainScope()
    mainScope?.launch {
      try {
        vitalDeviceManager.search(deviceModel).flowOn(Dispatchers.IO).collect {
          withContext(Dispatchers.Main) {
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
            }
            )
          }
        }
      } catch (e: Exception) {
        withContext(Dispatchers.Main) {
          sendEvent(VitalDevicesEvent.ScanEvent, WritableNativeMap().apply {
            putString("error", e.message)
          })
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
  fun pair(scannedDeviceId: String, promise: Promise) {
    val scannedDevice = scannedDevices.firstOrNull { it.address == scannedDeviceId }

    if (scannedDevice == null) {
      sendEvent(VitalDevicesEvent.PairEvent, WritableNativeMap().apply {
        putString("error", "Device not found")
      })
    } else {
      mainScope?.cancel()
      mainScope = MainScope()
      mainScope?.launch {
        try {
          withContext(Dispatchers.Default) {
            vitalDeviceManager.pair(scannedDevice).collect {
              withContext(Dispatchers.Main) {
                sendEvent(VitalDevicesEvent.PairEvent, it)
              }
            }
          }
        } catch (e: Exception) {
          withContext(Dispatchers.Main) {
            sendEvent(VitalDevicesEvent.PairEvent, WritableNativeMap().apply {
              putString("error", e.message)
            })
          }
        }
      }
      promise.resolve(null)
    }
  }

  @ReactMethod
  private fun startReadingGlucoseMeter(scannedDeviceId: String, promise: Promise) {
    val scannedDevice = scannedDevices.firstOrNull { it.address == scannedDeviceId }

    if (scannedDevice == null) {
      sendEvent(VitalDevicesEvent.GlucoseMeterReadEvent, WritableNativeMap().apply {
        putString("error", "Device not found")
      })
    } else {
      mainScope?.cancel()
      mainScope = MainScope()
      mainScope?.launch {
        try {
          withContext(Dispatchers.Default) {
            vitalDeviceManager.glucoseMeter(reactApplicationContext, scannedDevice)
              .flowOn(Dispatchers.IO)
              .collect { samples ->
                withContext(Dispatchers.Main) {
                  sendEvent(VitalDevicesEvent.GlucoseMeterReadEvent, WritableNativeMap().apply {
                    putArray("samples", WritableNativeArray().apply {
                      samples.forEach {
                        pushMap(WritableNativeMap().apply {
                          mapSample(it)
                        })
                      }
                    })
                  })
                }
              }
          }
        } catch (e: Exception) {
          withContext(Dispatchers.Main) {
            sendEvent(VitalDevicesEvent.GlucoseMeterReadEvent, WritableNativeMap().apply {
              putString("error", e.message)
            })
          }
        }
      }
      promise.resolve(null)
    }
  }

  @ReactMethod
  private fun startReadingBloodPressure(scannedDeviceId: String, promise: Promise) {
    val scannedDevice = scannedDevices.firstOrNull { it.address == scannedDeviceId }

    if (scannedDevice == null) {
      sendEvent(VitalDevicesEvent.BloodPressureReadEvent, WritableNativeMap().apply {
        putString("error", "Device not found")
      })
    } else {
      mainScope?.cancel()
      mainScope = MainScope()
      mainScope?.launch {
        try {
          withContext(Dispatchers.Default) {
            vitalDeviceManager.bloodPressure(reactApplicationContext, scannedDevice)
              .flowOn(Dispatchers.IO)
              .collect { samples ->
                withContext(Dispatchers.Main) {
                  sendEvent(VitalDevicesEvent.BloodPressureReadEvent, WritableNativeMap().apply {
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
                }
              }
          }
        } catch (e: Exception) {
          withContext(Dispatchers.Main) {
            sendEvent(VitalDevicesEvent.BloodPressureReadEvent, WritableNativeMap().apply {
              putString("error", e.message)
            })
          }

        }
      }

      promise.resolve(null)
    }
  }

  private fun WritableNativeMap.mapSample(it: QuantitySample) {
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
