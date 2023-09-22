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

    @objc(readLibre1WithReadingMessage:errorMessage:completionMessage:resolver:rejecter:)
    func readLibre1(
        readingMessage: String,
        errorMessage: String,
        completionMessage: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        Task {
            let libre1 = Libre1Reader(
                readingMessage: readingMessage,
                errorMessage: errorMessage,
                completionMessage: completionMessage,
                queue: DispatchQueue.main
            )
            do {
                let read = try await libre1.read()

                let mappedSamples = read.samples.map { $0.toDictionary() }
                resolve(
                    [
                        "samples": mappedSamples,
                        "sensor": read.sensor.toDictionary()
                    ]
                )
            }
            catch let error {
                reject(nil, error.localizedDescription, nil)
            }
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
            scannerResultCancellable = deviceManager
                .search(for: deviceModel)
                .receive(on: DispatchQueue.main)
                .sink { [weak self] value in
                    self?.scannedDevices.append(value)
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
            let scannedDevice = scannedDevices.first(where: { $0.id == scannedDeviceUUID })
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
            let scannedDevice = scannedDevices.first(where: { $0.id == scannedDeviceId })
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
                let mappedSamples = samples.map { $0.toDictionary() }
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
            let scannedDevice = scannedDevices.first(where: { $0.id == scannedDeviceId })
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
                        "systolic": sample.systolic.toDictionary(),
                        "diastolic": sample.diastolic.toDictionary(),
                        "pulse": sample.pulse?.toDictionary()
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

extension QuantitySample {
    func toDictionary() -> [String: Any?] {
        [
            "id": id,
            "value": value,
            "unit": unit,
            // JS interop expects epoch millisecond
            "startDate": startDate.timeIntervalSince1970 * 1000,
            "endDate": endDate.timeIntervalSince1970 * 1000,
            "type": type,
            "metadata": metadata?.dictionary
        ]
    }
}

extension Libre1Sensor {
    func toDictionary() -> [String: Any?] {
        [
            "serial": serial,
            "maxLife": maxLife,
            "age": age,
            "state": state.rawValue,
        ]
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
