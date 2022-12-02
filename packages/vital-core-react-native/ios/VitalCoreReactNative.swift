import VitalCore

@objc(VitalCoreReactNative)
class VitalCoreReactNative: NSObject {

  @objc(setUserId:resolver:rejecter:)
  func setUserId(_ userId: String, resolve: @escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
    guard let userId = UUID.init(uuidString: userId) else {
      reject(nil, "userId must be an UUID", nil)
      return
    }

    Task {
      await VitalClient.setUserId(userId)
      print("userId")
      resolve(())
    }
  }

  @objc(configurate:environment:region:enableLogs:resolver:rejecter:)
  func configurate(
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

    Task {
      await VitalClient.configure(apiKey: apiKey, environment: env, configuration: .init(logsEnable: enableLogs))
      print("configurate")
      resolve(())
    }
  }
}
