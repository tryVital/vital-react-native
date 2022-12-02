import VitalCore

@objc(VitalCoreReactNative)
class VitalCoreReactNative: NSObject {

  @objc(setUpId:withResolver:withRejecter:)
  func setUpId(userId: String, resolve: RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
    print("setUpId called")

    guard let userId = UUID.init(uuidString: userId) else {
      reject(nil, "userId must be an UUID", nil)
      return
    }

    Task {
      await VitalClient.setUserId(userId)
      resolve(())
    }
  }

  @objc(configurate:withEnvironment:withRegion:withEnableLogs:withResolver:withRejecter:)
  func configurate(
    apiKey: String,
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
      resolve(())
    }
  }
}
