import UIKit
import Combine
import CoreBluetooth
import CoreLocation
import CombineCoreBluetooth
import VitalCore
import VitalDevices

@objc(VitalDevicesReactNative)
class VitalDevicesReactNative: RCTEventEmitter {

    private lazy var deviceManager = DevicesManager()

        private var glucoseMeterCancellable: Cancellable? = nil
        private var bloodPressureCancellable: Cancellable? = nil
        private var pairCancellable: Cancellable? = nil


    private var scannerResultCancellable: Cancellable? = nil
    private var scannedDevices: [ScannedDevice] = []

    deinit {
        scannerResultCancellable?.cancel()
             glucoseMeterCancellable?.cancel()
             bloodPressureCancellable?.cancel()
             pairCancellable?.cancel()
    }

    @objc(startScanForDevice:name:brand:kind:resolver:rejecter:)
    func startScanForDevice(_ id:String,
                            name: String,
                            brand: String,
                            kind: String,
                            resolve: @escaping RCTPromiseResolveBlock,
                            reject:RCTPromiseRejectBlock) -> Void {
        do {
            let deviceModel = DeviceModel(
                id: id,
                name: name,
                brand: try mapStringToBrand(brand),
                kind: try mapStringToKind(kind)
            )

            scannerResultCancellable?.cancel()
            scannerResultCancellable =  deviceManager.search(for:deviceModel)
                .sink {[weak self] value in
                    self?.scannedDevices.append(value)
                    self?.sendEvent(withName: "ScanEvent", body: encode(InternalScannedDevice(id: value.id.uuidString, name: value.name, deviceModel: value.deviceModel)))
                }

            resolve(())
        } catch VitalError.UnsupportedBrand(let errorMessage) {
            resolve(encode(ErrorResult(code: "UnsupportedBrand", message: errorMessage)))
        } catch VitalError.UnsupportedKind(let errorMessage) {
            resolve(encode(ErrorResult(code: "UnsupportedKind", message: errorMessage)))
        } catch {
            resolve(encode(ErrorResult(code: "Unknown error")))
        }
    }

    @objc(stopScanForDevice:rejecter:)
    func stopScanForDevice(_ resolve: @escaping RCTPromiseResolveBlock,
                           reject:RCTPromiseRejectBlock) -> Void {
        scannerResultCancellable?.cancel()
        resolve(())
    }

    @objc(pairDevice:resolver:rejecter:)
    func pairDevice(_ scannedDeviceId:String,
                    resolve: @escaping RCTPromiseResolveBlock,
                    reject:RCTPromiseRejectBlock) -> Void {
        let scannedDevice = scannedDevices.first(where: { $0.id == UUID(uuidString:scannedDeviceId) })

        guard scannedDevice != nil else {
            resolve(encode(ErrorResult(code: "DeviceNotFound", message: "Device not found with id \(scannedDeviceId)")))
            return
        }

        pairCancellable?.cancel()
        switch scannedDevice!.deviceModel.kind{
        case .glucoseMeter:
            pairCancellable = deviceManager
                .glucoseMeter(for: scannedDevice!)
                .pair(device: scannedDevice!)
                .sink(receiveCompletion: {[weak self] value in
                    self?.handlePairCompletion(value: value )
                },
                      receiveValue:{[weak self] value in
                      self?.handlePairValue()
                })
        case .bloodPressure:
            pairCancellable = deviceManager
                .bloodPressureReader(for: scannedDevice!)
                .pair(device: scannedDevice!)
                .sink(receiveCompletion: {[weak self] value in
                    self?.handlePairCompletion(value: value )
                },
                      receiveValue:{[weak self] value in
                    self?.handlePairValue()
                })
        }
        resolve(())
    }

    private func handlePairCompletion(value: Subscribers.Completion<any Error>){
        switch value {
        case .failure(let error):  self.sendEvent(withName: "PairEvent", body: encode(ErrorResult(code: "PairError", message: error.localizedDescription)))
        case .finished:  self.sendEvent(withName: "PairEvent", body: encode(true))
        }
    }

    private func handlePairValue() {
        self.sendEvent(withName: "PairEvent", body: encode(true))
    }

    @objc(readBloodPressure:resolver:rejecter:)
    func readBloodPressure(_ pairedDeviceId:String,
                           resolve: @escaping RCTPromiseResolveBlock,
                           reject:RCTPromiseRejectBlock) -> Void {

        resolve(())
    }

    @objc(readGlucoseMeter:resolver:rejecter:)
    func readGlucoseMeter(_ pairedDeviceId:String,
                          resolve: @escaping RCTPromiseResolveBlock,
                          reject:RCTPromiseRejectBlock) -> Void {

        resolve(())
    }

    override func supportedEvents() -> [String]! {
        return ["ScanEvent","PairEvent","GlucoseMeterReadEvent","BloodPressureReadEvent"]
    }
}

private func mapStringToBrand(_ brandId: String) throws -> Brand  {
    switch brandId {
        case "omron": return Brand.omron
        case "accuChek": return Brand.accuChek
        case "contour": return Brand.contour
        case "beurer": return Brand.beurer
        case "libre": return Brand.libre
        default: throw VitalError.UnsupportedBrand(brandId)
    }
}

private func mapStringToKind(_ kindId: String) throws -> DeviceModel.Kind  {
    switch kindId {
    case "bloodPressure": return DeviceModel.Kind.bloodPressure
    case "glucoseMeter": return DeviceModel.Kind.glucoseMeter
    default: throw VitalError.UnsupportedKind(kindId)
    }
}

private func mapBrandToString(_ brand: Brand) -> String {
    switch brand {
    case .omron: return "omron"
    case .accuChek: return "accuChek"
    case .contour: return "contour"
    case .beurer: return "beurer"
    case .libre: return "libre"
    }
}

private func encode(_ encodable: Encodable) -> String? {
  let json: String?
  let jsonEncoder = JSONEncoder()

  if let data = try? encode(encodable, encoder: jsonEncoder) {
    json = String(data: data, encoding: .utf8)
  } else {
    json = nil
  }
  return json
}

private func encode(_ value: Encodable, encoder: JSONEncoder) throws -> Data? {
  if let data = value as? Data {
    return data
  } else if let string = value as? String {
    return string.data(using: .utf8)
  } else {
    return try encoder.encode(AnyEncodable(value: value))
  }
}

public struct InternalScannedDevice: Equatable, Encodable {
  public let id: String
  public let name: String
  public let deviceModel: DeviceModel

  init(
    id: String,
    name: String,
    deviceModel: DeviceModel
  ) {
    self.id = id
    self.name = name
    self.deviceModel = deviceModel
  }
}

struct AnyEncodable: Encodable {
  let value: Encodable

  func encode(to encoder: Encoder) throws {
    try value.encode(to: encoder)
  }
}

struct ErrorResult: Encodable {
  let code: String
  let message: String?

  init(code: String, message: String? = nil){
    self.code = code
    self.message = message
  }
}

enum VitalError: Error {
  case UnsupportedRegion(String)
  case UnsupportedEnvironment(String)
  case UnsupportedResource(String)
  case UnsupportedDataPushMode(String)
  case UnsupportedProvider(String)
  case UnsupportedBrand(String)
  case UnsupportedKind(String)
}
