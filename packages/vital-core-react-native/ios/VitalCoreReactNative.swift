import VitalCore

private let errorKey = "VitalCoreError"

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
      resolve(())
    }
  }

  @objc(configure:environment:region:enableLogs:resolver:rejecter:)
  func configure(
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

  @objc(hasUserConnectedTo:resolver:rejecter:)
  func hasUserConnectedTo(
    _ provider: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let slug = Provider.Slug(rawValue: provider) else {
      reject(errorKey, "Unrecognized provider slug: \(provider)", nil)
      return
    }

    Task {
      do {
        let result = try await VitalClient.shared.isUserConnected(to: slug)
        resolve(result)
      } catch let error {
        reject(errorKey, error.localizedDescription, error)
      }
    }
  }

  @objc(userConnectedSources:rejecter:)
  func userConnectedSources(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    Task {
      do {
        let sources = try await VitalClient.shared.user.userConnectedSources()
        let jsonObjects = sources.map { source -> [String: String?] in
          ["name": source.name, "slug": source.slug.rawValue, "logo": source.logo]
        }
        resolve(jsonObjects)
      } catch let error {
        reject(errorKey, error.localizedDescription, error)
      }
    }
  }

  @objc(createConnectedSourceIfNotExist:resolver:rejecter:)
  func createConnectedSourceIfNotExist(
    for provider: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let slug = Provider.Slug(rawValue: provider) else {
      reject(errorKey, "Unrecognized provider slug: \(provider)", nil)
      return
    }

    Task {
      do {
        try await VitalClient.shared.checkConnectedSource(for: slug)
        resolve(())
      } catch let error {
        reject(errorKey, error.localizedDescription, error)
      }
    }
  }

  @objc(postTimeSeriesData:provider:timeZone:resolver:rejecter:)
  func postTimeSeriesData(
    _ jsonString: String,
    provider: String,
    timeZoneString: String?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let timeZone: TimeZone

    if let name = timeZoneString {
      guard let namedTimeZone = TimeZone(identifier: name) else {
        reject(errorKey, "Unrecognized named time zone: \(name)", nil)
        return
      }

      timeZone = namedTimeZone
    } else {
      timeZone = .current
    }

    guard let jsonData = jsonString.data(using: .utf8) else {
      reject(errorKey, "Failed to coerce the provided JSON String as UTF-8 data", nil)
      return
    }

    guard let slug = Provider.Slug(rawValue: provider) else {
      reject(errorKey, "Unrecognized provider slug: \(provider)", nil)
      return
    }

    let decoded: RNTimeSeriesData

    do {
      let decoder = jsonDecoder()
      decoded = try decoder.decode(RNTimeSeriesData.self, from: jsonData)
    } catch let error {
      reject(errorKey, "Failed to decode the provided JSON String: \(error)", error)
      return
    }

    Task {
      do {
        try await VitalClient.shared.timeSeries.post(
          decoded.data,
          stage: .daily,
          provider: slug,
          timeZone: timeZone
        )
        resolve(())
      } catch let error {
        reject(errorKey, error.localizedDescription, error)
      }
    }
  }

  @objc(cleanUp:rejecter:)
  func cleanUp(resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
    Task {
      await VitalClient.shared.cleanUp()
      resolve(())
    }
  }

  private func jsonDecoder() -> JSONDecoder {
    let decoder = JSONDecoder()
    let iso8601 = ISO8601DateFormatter()

    // JS Date.toISOString() always output fractional seconds with 3 decimal places.
    iso8601.formatOptions = [.withInternetDateTime, .withFractionalSeconds]

    // JS Date is serialized as ISO8601 string by JSON.stringify.
    decoder.dateDecodingStrategy = .custom { decoder in
      let container = try decoder.singleValueContainer()
      let rawValue = try container.decode(String.self)
      guard let date = iso8601.date(from: rawValue) else {
        throw DecodingError.dataCorruptedError(
          in: container,
          debugDescription: "Raw value \(rawValue) is not a RFC 3339 timestamp with fractional seconds."
        )
      }
      return date
    }
    return decoder
  }
}
