import VitalCore
import VitalHealthKit
import Combine

@objc(VitalHealthReactNative)
class VitalHealthReactNative: RCTEventEmitter {

  public static var status: RCTEventEmitter!
  public var cancellable: AnyCancellable?

  deinit {
    cancellable?.cancel()
  }

  override init() {
    super.init()
    VitalHealthReactNative.status = self

    cancellable = VitalHealthKitClient.shared.status.sink { status in
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
      
      self.sendEvent(withName: "status", body: payload)
    }
  }

  override func supportedEvents() -> [String]! {
    return ["status"]
  }

  @objc(configure:numberOfDaysToBackFill:enableLogs:resolver:rejecter:)
  func configure(
    _ backgroundDeliveryEnabled: Bool,
    numberOfDaysToBackFill: Int,
    enableLogs: Bool,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: RCTPromiseRejectBlock
  ) {
    Task {
      await VitalHealthKitClient.configure(
          .init(
              backgroundDeliveryEnabled: backgroundDeliveryEnabled,
              numberOfDaysToBackFill: numberOfDaysToBackFill,
              logsEnabled: enableLogs
            )
        )
      resolve(())
    }
  }


  @objc(askForResources:resolver:rejecter:)
  func askForResources(
    _ resources: [String],
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    Task {
      do {
        
        let readPermissions = try resources.map { try mapResourceToVitalResource($0) }
        let outcome = await VitalHealthKitClient.shared.ask(readPermissions: readPermissions, writePermissions: [])

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
      try VitalHealthKitClient.shared.syncData(for: resources.map { try mapResourceToVitalResource($0) })
      resolve(())
    } catch VitalError.UnsupportedResource(let errorMessage) {
      reject("UnsupportedResource", errorMessage, nil)
    } catch {
      reject(nil, "Unknown error", nil)
    }
  }

  @objc(cleanUp:rejecter:)
  func cleanUp(_ resolve: @escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
    Task {
      await VitalHealthKitClient.shared.cleanUp()
      resolve(())
    }
  }

  @objc(hasAskedForPermission:resolver:rejecter:)
  func hasAskedForPermission(_ resource: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    do {
      let vitalResource = try mapResourceToVitalResource(resource)
      let value: Bool = VitalHealthKitClient.shared.hasAskedForPermission(resource: vitalResource)
      resolve(value)
    } catch VitalError.UnsupportedResource(let errorMessage) {
        reject("UnsupportedResource", errorMessage, nil)
    } catch {
        reject(nil, "Unknown error", nil)
    }
  }
}

private func mapResourceToVitalResource(_ name: String) throws -> VitalResource {
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
      return .vitals(.hearthRate)
    case "steps":
      return .individual(.steps)
    case "activeEnergyBurned":
      return .individual(.activeEnergyBurned)
    case "basalEnergyBurned":
      return .individual(.basalEnergyBurned)
    case "floorsClimbed":
      return .individual(.floorsClimbed)
    case "distanceWalkingRunning":
      return .individual(.distanceWalkingRunning)
    case "vo2Max":
      return .individual(.vo2Max)
    case "weight":
      return .individual(.weight)
    case "bodyFat":
      return .individual(.bodyFat)
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