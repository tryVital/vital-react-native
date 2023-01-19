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
                    self?.sendEvent(withName: "ScanEvent", body:
                                        [
                                            "id": value.id.uuidString,
                                            "name": value.name,
                                            "deviceModel": [
                                                "id": value.deviceModel.id,
                                                "name": value.deviceModel.name,
                                                "brand": value.deviceModel.brand.rawValue,
                                                "kind": value.deviceModel.kind.rawValue
                                            ]
                                        ])
                }

            resolve(())
        } catch VitalError.UnsupportedBrand(let errorMessage) {
            resolve(["error": "UnsupportedBrand", "message": errorMessage])
        } catch VitalError.UnsupportedKind(let errorMessage) {
            resolve(["error": "UnsupportedKind", "message": errorMessage])
        } catch {
            resolve(["error": "Unknown", "message": error.localizedDescription])
        }
    }

    @objc(stopScanForDevice:rejecter:)
    func stopScanForDevice(_ resolve: @escaping RCTPromiseResolveBlock,
                           reject:RCTPromiseRejectBlock) -> Void {
        scannerResultCancellable?.cancel()
        resolve(())
    }

    @objc(pair:resolver:rejecter:)
    func pair(_ scannedDeviceId:String,
              resolve: @escaping RCTPromiseResolveBlock,
              reject:RCTPromiseRejectBlock) -> Void {
        let scannedDevice = scannedDevices.first(where: { $0.id == UUID(uuidString:scannedDeviceId) })

        guard scannedDevice != nil else {
            resolve([
                "error": "DeviceNotFound",
                "message": "Device not found with id \(scannedDeviceId)"
            ])
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
        case .failure(let error):  self.sendEvent(withName: "PairEvent", body: ["error": "PairError", "message": error.localizedDescription])
        case .finished:  self.sendEvent(withName: "PairEvent", body: true)
        }
    }

    private func handlePairValue() {
        self.sendEvent(withName: "PairEvent", body: true)
    }

    @objc(startReadingGlucoseMeter:resolver:rejecter:)
    func startReadingGlucoseMeter(_ scannedDeviceId:String,
                                  resolve: @escaping RCTPromiseResolveBlock,
                                  reject:RCTPromiseRejectBlock) -> Void {

        let scannedDeviceId = UUID(uuidString: scannedDeviceId)!
        let scannedDevice = scannedDevices.first(where: { $0.id == scannedDeviceId })

        
        guard scannedDevice != nil else {
            resolve([
                "error": "DeviceNotFound",
                "message": "Device not found with id \(scannedDeviceId)"
            ])
            return
        }

        glucoseMeterCancellable?.cancel()
        glucoseMeterCancellable =  deviceManager.glucoseMeter(for :scannedDevice!)
            .read(device: scannedDevice!)
            .sink (receiveCompletion: {[weak self] value in
                self?.sendEvent(withName: "GlucoseMeterReadEvent", body: ["error": "ReadError", "message": "error reading data from device \(value)"])
            }, receiveValue:{[weak self] value in
            self?.sendEvent(withName: "GlucoseMeterReadEvent", body: [
                                "samples": value.map({[
                                        "id": $0.id,
                                        "value": $0.value,
                                        "unit": $0.unit,
                                        "startDate": $0.startDate.timeIntervalSince1970,
                                        "endDate": $0.endDate.timeIntervalSince1970,
                                        "type": $0.type
                                ]})
                            ] )
            })

        resolve(())
    }

    @objc(startReadingBloodPressure:resolver:rejecter:)
    func startReadingBloodPressure(_ scannedDeviceId:String,
                                   resolve: @escaping RCTPromiseResolveBlock,
                                   reject:RCTPromiseRejectBlock) -> Void {
        let scannedDeviceId = UUID(uuidString: scannedDeviceId)!
        let scannedDevice = scannedDevices.first(where: { $0.id == scannedDeviceId })

        guard scannedDevice != nil else {
            resolve([
                "error": "DeviceNotFound",
                "message": "Device not found with id \(scannedDeviceId)"
            ])
            return
        }

        bloodPressureCancellable?.cancel()
        bloodPressureCancellable = deviceManager.bloodPressureReader(for :scannedDevice!)
            .read(device: scannedDevice!)
            .sink (receiveCompletion: {[weak self] value in
                self?.sendEvent(withName: "BloodPressureReadEvent", body: ["error": "ReadError", "message": "error reading data from device \(value)"])
            }, receiveValue:{[weak self] value in
                self?.sendEvent(withName: "BloodPressureReadEvent", body:[
                    "samples": value.map({[
                        "systolic": [
                            "id": $0.systolic.id,
                            "value": $0.systolic.value,
                            "unit": $0.systolic.unit,
                            "startDate": $0.systolic.startDate.timeIntervalSince1970,
                            "endDate": $0.systolic.endDate.timeIntervalSince1970,
                            "type": $0.systolic.type
                        ],
                        "diastolic": [
                            "id": $0.diastolic.id,
                            "value": $0.diastolic.value,
                            "unit": $0.diastolic.unit,
                            "startDate": $0.diastolic.startDate.timeIntervalSince1970,
                            "endDate": $0.diastolic.endDate.timeIntervalSince1970,
                            "type": $0.diastolic.type
                        ],
                        "pulse": [
                            "id": $0.pulse?.id,
                            "value": $0.pulse?.value,
                            "unit": $0.pulse?.unit,
                            "startDate": $0.pulse?.startDate.timeIntervalSince1970,
                            "endDate": $0.pulse?.endDate.timeIntervalSince1970,
                            "type": $0.pulse?.type
                        ]
                    ]})
                ] )
            })

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
