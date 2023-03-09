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
    private var knownScannedDevices: [UUID: ScannedDevice] = []

    deinit {
        scannerResultCancellable?.cancel()
        glucoseMeterCancellable?.cancel()
        bloodPressureCancellable?.cancel()
        pairCancellable?.cancel()
    }

    @objc(getConnectedDevices:name:brand:kind:resolver:rejecter:)
    func connectedDevices(
        _ id: String,
        name: String,
        brand: String,
        kind: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            let deviceModel = DeviceModel(
                id: id,
                name: name,
                brand: try mapStringToBrand(brand),
                kind: try mapStringToKind(kind)
            )

            let devices = deviceManager.connected(deviceModel)
            let responses: [[String: Any?]] = devices.map { device in
                [
                    "id": device.id.uuidString,
                    "name": device.name,
                    "deviceModel": [
                        "id": device.deviceModel.id,
                        "name": device.deviceModel.name,
                        "brand": device.deviceModel.brand.rawValue,
                        "kind": device.deviceModel.kind.rawValue
                    ]
                ]
            }

            devices.forEach { knownScannedDevices[$0.id] = $0 }

            resolve(["devices": responses])
        } catch VitalError.UnsupportedBrand(let errorMessage) {
            reject("UnsupportedBrand", errorMessage, nil)
        } catch VitalError.UnsupportedKind(let errorMessage) {
            reject("UnsupportedKind", errorMessage, nil)
        } catch let error {
            reject("Unknown", error.localizedDescription, error)
        }
    }

    @objc(startScanForDevice:name:brand:kind:resolver:rejecter:)
    func startScanForDevice(
        _ id:String,
        name: String,
        brand: String,
        kind: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            let deviceModel = DeviceModel(
                id: id,
                name: name,
                brand: try mapStringToBrand(brand),
                kind: try mapStringToKind(kind)
            )

            scannerResultCancellable?.cancel()
            scannerResultCancellable =  deviceManager
                .search(for: deviceModel)
                .receive(on: DispatchQueue.main)
                .sink { [weak self] value in
                    self?.knownScannedDevices[value.id] = value
                    self?.sendEvent(
                        withName: "ScanEvent",
                        body: [
                            "id": value.id.uuidString,
                            "name": value.name,
                            "deviceModel": [
                                "id": value.deviceModel.id,
                                "name": value.deviceModel.name,
                                "brand": value.deviceModel.brand.rawValue,
                                "kind": value.deviceModel.kind.rawValue
                            ]
                        ]
                    )
                }

            resolve(())
        } catch VitalError.UnsupportedBrand(let errorMessage) {
            reject("UnsupportedBrand", errorMessage, nil)
        } catch VitalError.UnsupportedKind(let errorMessage) {
            reject("UnsupportedKind", errorMessage, nil)
        } catch let error {
            reject("Unknown", error.localizedDescription, error)
        }
    }

    @objc(stopScanForDevice:rejecter:)
    func stopScanForDevice(_ resolve: @escaping RCTPromiseResolveBlock,
                           reject:RCTPromiseRejectBlock) {
        scannerResultCancellable?.cancel()
        resolve(())
    }

    @objc(pair:resolver:rejecter:)
    func pair(
        _ scannedDeviceId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard
            let scannedDeviceUUID = UUID(uuidString: scannedDeviceId),
            let scannedDevice = knownScannedDevices[scannedDeviceUUID]
        else {
            reject("DeviceNotFound", "Device not found with id \(scannedDeviceId)", nil)
            return
        }

        let pairable: DevicePairable

        switch scannedDevice.deviceModel.kind{
        case .glucoseMeter:
            pairable = deviceManager.glucoseMeter(for: scannedDevice)
        case .bloodPressure:
            pairable = deviceManager.bloodPressureReader(for: scannedDevice)
        }

        pairCancellable = pairable
            .pair(device: scannedDevice)
            .sink { completion in
                switch completion {
                case .finished:
                    resolve(())
                case let .failure(error):
                    reject("PairError", error.localizedDescription, error)
                }
            } receiveValue: { _ in }
    }

    @objc(readGlucoseMeter:resolver:rejecter:)
    func readGlucoseMeter(
        _ scannedDeviceId:String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {    
        guard
            let scannedDeviceId = UUID(uuidString: scannedDeviceId),
            let scannedDevice = knownScannedDevices[scannedDeviceId]
        else {
            reject("DeviceNotFound", "Device not found with id \(scannedDeviceId)", nil)
            return
        }

        glucoseMeterCancellable?.cancel()
        glucoseMeterCancellable = deviceManager
            .glucoseMeter(for: scannedDevice)
            .read(device: scannedDevice)
            .sink { completion in
                if case let .failure(error) = completion {
                    reject("ReadError", "error reading data from device \(error)", error)
                }
            } receiveValue: { samples in
                let mappedSamples = samples.map { sample in
                    [
                        "id": sample.id,
                        "value": sample.value,
                        "unit": sample.unit,
                        "startDate": sample.startDate.timeIntervalSince1970,
                        "endDate": sample.endDate.timeIntervalSince1970,
                        "type": sample.type
                    ] as [String: Any?]
                }
                resolve(["samples": mappedSamples])
            }
    }

    @objc(readBloodPressure:resolver:rejecter:)
    func readBloodPressure(
        _ scannedDeviceId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard
            let scannedDeviceId = UUID(uuidString: scannedDeviceId),
            let scannedDevice = knownScannedDevices[scannedDeviceId]
        else {
            reject("DeviceNotFound", "Device not found with id \(scannedDeviceId)", nil)
            return
        }

        bloodPressureCancellable?.cancel()
        bloodPressureCancellable = deviceManager.bloodPressureReader(for: scannedDevice)
            .read(device: scannedDevice)
            .sink { completion in
                if case let .failure(error) = completion {
                    reject("ReadError", "error reading data from device \(error)", error)
                }
            } receiveValue: { samples in
                let mappedSamples = samples.map { sample in
                    [
                        "systolic": [
                            "id": sample.systolic.id,
                            "value": sample.systolic.value,
                            "unit": sample.systolic.unit,
                            "startDate": sample.systolic.startDate.timeIntervalSince1970,
                            "endDate": sample.systolic.endDate.timeIntervalSince1970,
                            "type": sample.systolic.type
                        ] as [String: Any?],
                        "diastolic": [
                            "id": sample.diastolic.id,
                            "value": sample.diastolic.value,
                            "unit": sample.diastolic.unit,
                            "startDate": sample.diastolic.startDate.timeIntervalSince1970,
                            "endDate": sample.diastolic.endDate.timeIntervalSince1970,
                            "type": sample.diastolic.type
                        ] as [String: Any?],
                        "pulse": [
                            "id": sample.pulse?.id,
                            "value": sample.pulse?.value,
                            "unit": sample.pulse?.unit,
                            "startDate": sample.pulse?.startDate.timeIntervalSince1970,
                            "endDate": sample.pulse?.endDate.timeIntervalSince1970,
                            "type": sample.pulse?.type
                        ] as [String: Any?]
                    ]
                }
                resolve(["samples": mappedSamples])
            }
    }

    override func supportedEvents() -> [String]! {
        return ["ScanEvent"]
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
