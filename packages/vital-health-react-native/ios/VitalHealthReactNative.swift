import VitalCore
@_spi(VitalSDKCrossPlatformSupport) import VitalHealthKit
import Combine
import UIKit
import HealthKit

@objc(VitalHealthReactNative)
class VitalHealthReactNative: RCTEventEmitter {

  public var cancellable: AnyCancellable?

  /// Whether or not this native module is active & not invalidated.
  var isActive: Bool {
    callableJSModules != nil
  }

  deinit {
    cancellable?.cancel()
  }

  override init() {
    super.init()

    cancellable = VitalHealthKitClient.shared.status.sink { [weak self] status in
      guard let self = self, self.isActive else { return }

      var payload: [String: String] = [:]

      switch status {
        case let .failedSyncing(resource, error):
          payload["resource"] = String(describing: resource)
          payload["status"] = "failedSyncing"
          payload["extra"] = error?.localizedDescription

        case let .nothingToSync(resource):
          payload["resource"] = String(describing: resource)
          payload["status"] = "nothingToSync"

        case let .successSyncing(resource, _):
          payload["resource"] = String(describing: resource)
          payload["status"] = "successSyncing"

        case let .syncing(resource):
          payload["resource"] = String(describing: resource)
          payload["status"] = "syncing"

        case .syncingCompleted:
          payload["status"] = "completed"
      }

      self.sendEvent(withName: "Status", body: payload)
    }
  }

  override func supportedEvents() -> [String]! {
    return ["Status"]
  }

  @objc(configure:numberOfDaysToBackFill:enableLogs:resolver:rejecter:)
  func configure(
    _ backgroundDeliveryEnabled: Bool,
    numberOfDaysToBackFill: Int,
    enableLogs: Bool,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: RCTPromiseRejectBlock
  ) {
    VitalHealthKitClient.configure(
        .init(
            backgroundDeliveryEnabled: backgroundDeliveryEnabled,
            numberOfDaysToBackFill: numberOfDaysToBackFill,
            logsEnabled: enableLogs
          )
      )
    resolve(())
  }

   @objc(setUserId:resolver:rejecter:)
    func setUserId(_ userId: String, resolve: @escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
      guard let userId = UUID.init(uuidString: userId) else {
        reject(nil, "userId must be an UUID", nil)
        return
      }

      Task {
        await VitalClient.setUserId(userId)
        resolve(())
      }
    }

    @objc(configureClient:environment:region:enableLogs:resolver:rejecter:)
    func configureClient(
      _ apiKey: String,
      environment: String,
      region: String,
      enableLogs: Bool,
      resolve:@escaping RCTPromiseResolveBlock,
      reject:RCTPromiseRejectBlock
    ) {

      let env: Environment
      switch (environment, region) {
        case ("production", "us"):
          env = .production(.us)
        case ("production", "eu"):
          env = .production(.eu)
        case ("sandbox", "us"):
          env = .sandbox(.us)
        case ("sandbox", "eu"):
          env = .sandbox(.eu)
        default:
          reject(nil, "enviroment / region values not accepted", nil)
          return
      }

      VitalClient.configure(apiKey: apiKey, environment: env, configuration: .init(logsEnable: enableLogs))
      resolve(())
    }

  @objc(ask:writeResources:config:resolver:rejecter:)
  func ask(
    _ readResources: [String],
    writeResources: [String],
    config: [String: Any]?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    Task {
      do {
        let readPermissions = try readResources.map { try mapResourceToReadableVitalResource($0) }
        let writePermissions = try writeResources.map { try mapResourceToWritableVitalResource($0) }

        var extraReadPermissions = [HKObjectType]()
        var extraWritePermissions = [HKSampleType]()
        var dataTypeAllowlist: Set<HKObjectType>? = nil

        if let config = config {
          if let rawValues = config["extraReadPermissions"] as? [String] {
            extraReadPermissions = rawValues.compactMap(decodeHealthKitDataTypeIdentifier)
          }
          if let rawValues = config["extraWritePermissions"] as? [String] {
            extraWritePermissions = rawValues.compactMap(decodeHealthKitDataTypeIdentifier).compactMap { $0 as? HKSampleType }
          }
          if let rawValues = config["dataTypeAllowlist"] as? [String] {
            dataTypeAllowlist = Set(rawValues.compactMap(decodeHealthKitDataTypeIdentifier))
          }
        }

        let outcome = await VitalHealthKitClient.shared.ask(
          readPermissions: readPermissions,
          writePermissions: writePermissions,
          extraReadPermissions: extraReadPermissions,
          extraWritePermissions: extraWritePermissions,
          dataTypeAllowlist: dataTypeAllowlist
        )

        switch outcome {
          case .success:
            resolve("success")
          case .failure(let message):
            reject("failure", message, nil)
          case .healthKitNotAvailable:
            reject("healthKitNotAvailable", "healthKitNotAvailable", nil)
        }
      } catch VitalError.UnsupportedResource(let errorMessage) {
        reject("UnsupportedResource", errorMessage, nil)
      } catch {
        reject(nil, "Unknown error", nil)
      }
    }
  }

  @objc(syncData:resolver:rejecter:)
  func syncData(
    _ resources: [String],
    resolve: RCTPromiseResolveBlock,
    reject: RCTPromiseRejectBlock
  ) {
    do {
      let vitalResources: [VitalResource]
      if resources.isEmpty {
        // Treat empty set as "sync all".
        vitalResources = VitalResource.all
      } else {
        vitalResources = try resources.map { try mapResourceToReadableVitalResource($0) }
      }

      VitalHealthKitClient.shared.syncData(for: vitalResources)
      resolve(())
    } catch VitalError.UnsupportedResource(let errorMessage) {
      reject("UnsupportedResource", errorMessage, nil)
    } catch {
      reject(nil, "Unknown error", nil)
    }
  }

  @objc(hasAskedForPermission:resolver:rejecter:)
  func hasAskedForPermission(_ resource: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    do {
      let vitalResource = try mapResourceToReadableVitalResource(resource)
      Task {
        do {
          let statuses = try await VitalHealthKitClient.shared.permissionStatus(for: [vitalResource])
          if let status = statuses[vitalResource] {
            resolve(status == .asked)
          } else {
            reject(nil, "Unknown error [2]", nil)
          }

        } catch {
          reject(nil, "Unknown error [3]", nil)
        }
      }

    } catch VitalError.UnsupportedResource(let errorMessage) {
        reject("UnsupportedResource", errorMessage, nil)

    } catch {
        reject(nil, "Unknown error [1]", nil)
    }
  }

  @objc(writeHealthData:value:startDate:endDate:resolver:rejecter:)
     func writeHealthData(_ resource: String,
         value: Double,
         startDate: Double,
         endDate: Double,
         resolve: @escaping RCTPromiseResolveBlock,
         reject: RCTPromiseRejectBlock
     ){
      do {
        let resource = try mapResourceToReadableVitalResource(resource)

        let startDate = Date(timeIntervalSince1970: startDate / 1000)
        let endDate = Date(timeIntervalSince1970: endDate / 1000)

        let dataInput: DataInput

        switch resource {
          case .nutrition(.water):
            dataInput = .water(milliliters: Int(value))
          case .nutrition(.caffeine):
            dataInput = .caffeine(grams: Int(value))
           case .vitals(.mindfulSession):
            dataInput = .mindfulSession
          default:
            fatalError("\(resource) not supported for writing to HealthKit")
        }

        Task {
          try await VitalHealthKitClient.shared.write(input: dataInput, startDate: startDate, endDate: endDate)
          resolve(())
        }
      } catch VitalError.UnsupportedResource(let errorMessage) {
        reject("UnsupportedResource", errorMessage, nil)
      } catch {
        reject(nil, "Unknown error", nil)
      }
    }


  @objc(getPauseSynchronization:rejecter:)
  func getPauseSynchronization(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(VitalHealthKitClient.shared.pauseSynchronization)
  }

  @objc(setPauseSynchronization:resolver:rejecter:)
  func setPauseSynchronization(_ paused: Bool, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    VitalHealthKitClient.shared.pauseSynchronization = paused
    resolve(())
  }

  @objc(openPlatformHealthApp:rejecter:)
  func openPlatformHealthApp(_ resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    Task { @MainActor in
      await UIApplication.shared.open(URL(string: "x-apple-health://")!)
      resolve(())
    }
  }

  @objc(openSyncProgressView:rejecter:)
  func openSyncProgressView(_ resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      defer { resolve(()) }
      guard
        let keyWindow = UIApplication.shared.windows.first(where: { $0.isKeyWindow })
      else { return }

      keyWindow.rootViewController?.present(
        SyncProgressViewController(),
        animated: true,
        completion: nil
      )
    }
  }
}

private func mapResourceToReadableVitalResource(_ name: String) throws -> VitalResource {
  switch name {
  case "profile":
    return .profile
  case "body":
    return .body
  case "workout":
    return .workout
  case "activity":
    return .activity
  case "sleep":
    return .sleep
  case "glucose":
    return .vitals(.glucose)
  case "bloodPressure":
    return .vitals(.bloodPressure)
  case "heartRate":
    return .vitals(.heartRate)
  case "heartRateVariability":
    return .vitals(.heartRateVariability)
  case "mindfulSession":
    return .vitals(.mindfulSession)
  case "steps":
    return .individual(.steps)
  case "activeEnergyBurned":
    return .individual(.activeEnergyBurned)
  case "basalEnergyBurned":
    return .individual(.basalEnergyBurned)
  case "floorsClimbed":
    return .individual(.floorsClimbed)
  case "distance":
    return .individual(.distance)
  case "vo2Max":
    return .individual(.vo2Max)
  case "exerciseTime":
    return .individual(.exerciseTime)
  case "weight":
    return .individual(.weight)
  case "bodyFat":
    return .individual(.bodyFat)
  case "water":
    return .nutrition(.water)
  case "caffeine":
    return .nutrition(.caffeine)
  case "temperature":
    return .vitals(.temperature)
  case "respiratoryRate":
    return .vitals(.respiratoryRate)
  case "bloodOxygen":
    return .vitals(.bloodOxygen)
  case "menstrualCycle":
    return .menstrualCycle
  case "meal":
    return .meal
  case "afibBurden":
    return .afibBurden
  case "heartRateAlert":
    return .heartRateAlert
  case "electrocardiogram":
    return .electrocardiogram
  case "bodyMassIndex":
    return .individual(.bodyMassIndex)
  case "waistCircumference":
    return .individual(.waistCircumference)
  case "leanBodyMass":
    return .individual(.leanBodyMass)
  case "wheelchairPush":
    return .individual(.wheelchairPush)
  case "standHour":
    return .standHour
  case "standDuration":
    return .standDuration
  case "sleepApneaAlert":
    return .sleepApneaAlert
  case "sleepBreathingDisturbance":
    return .sleepBreathingDisturbance
  case "forcedExpiratoryVolume1":
    return .forcedExpiratoryVolume1
  case "forcedVitalCapacity":
    return .forcedVitalCapacity
  case "peakExpiratoryFlowRate":
    return .peakExpiratoryFlowRate
  case "inhalerUsage":
    return .inhalerUsage
  case "fall":
    return .fall
  case "uvExposure":
    return .uvExposure
  case "daylightExposure":
    return .daylightExposure
  case "handwashing":
    return .handwashing
  case "basalBodyTemperature":
    return .basalBodyTemperature
  default:
    throw VitalError.UnsupportedResource(name)
  }
}

private func mapResourceToWritableVitalResource(_ name: String) throws -> WritableVitalResource {
  switch name {
    case "water":
      return .water
    case "caffeine":
      return .caffeine
    case "mindfulSession":
      return .mindfulSession
    default:
      throw VitalError.UnsupportedResource(name)
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
