import VitalCore

private let errorKey = "VitalCoreError"
private let statusEventKey = "VitalClientStatus"
private let identifyExternalUserRequestKey = "IdentifyExternalUserRequest"

@objc(VitalCoreReactNative)
class VitalCoreReactNative: RCTEventEmitter {
  private var statusObservation: Task<Void, Never>?

  private let lock = NSLock()
  private var pendingIdentifyResponses: [String: CheckedContinuation<String, Never>] = [:]

  override func supportedEvents() -> [String]! {
    [statusEventKey, identifyExternalUserRequestKey]
  }

  override func startObserving() {
    statusObservation = Task {
      for await status in VitalClient.statuses {
        sendEvent(withName: statusEventKey, body: status.strings())
      }
    }
  }

  override func stopObserving() {
    statusObservation?.cancel()
    statusObservation = nil
  }

  @objc(status:rejecter:)
  func status(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    resolve(VitalClient.status.strings())
  }

  @objc(currentUserId:rejecter:)
  func currentUserId(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    resolve(VitalClient.currentUserId)
  }
  @objc(identifiedExternalUser:rejecter:)
  func identifiedExternalUser(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    resolve(VitalClient.identifiedExternalUser)
  }

  @objc(identifyExternalUser:callId:resolver:rejecter:)
  func identifyExternalUser(_ externalUserId: String, callId: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    Task {
      do {
        try await VitalClient.identifyExternalUser(externalUserId) { @MainActor externalUserId in
          // Setup a listener
          let rawResponse: String = await withCheckedContinuation { continuation in

            // Register the continuation
            lock.withLock { self.pendingIdentifyResponses[callId] = continuation }

            // Send the request to JS land, which should eventually invoke the continuation
            // via `identifyExternalUserResponse(4)`.
            self.sendEvent(withName: identifyExternalUserRequestKey, body: [callId, externalUserId])
          }

          let decoder = JSONDecoder()
          switch try decoder.decode(ReactNativeAuthenticateRequest.self, from: rawResponse.data(using: .utf8)!) {
          case let .apiKey(userId, key, environment):
            return .apiKey(key: key, userId: userId, environment)
          case let .signInToken(token):
            return .signInToken(rawToken: token)
          case let .error(error):
            throw error
          }
        }
        resolve(())
      } catch let error {
        reject("VitalCoreError", "\(error)", error)
      }
    }
  }

  @objc(identifyExternalUserResponse:callId:resolver:rejecter:)
  func identifyExternalUserResponse(_ jsonPayload: String, _ callId: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let continuation = lock.withLock { self.pendingIdentifyResponses.removeValue(forKey: callId) }
    defer { resolve(()) }
    continuation?.resume(returning: jsonPayload)
  }

  @objc(signIn:resolver:rejecter:)
  func signIn(withToken token: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    Task {
      do {
        try await VitalClient.signIn(withRawToken: token)
        resolve(())
      } catch let error {
        reject("VitalCoreError", "\(error)", error)
      }
    }
  }

  @objc(setUserId:resolver:rejecter:)
  func setUserId(_ userId: String, resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
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
        reject(errorKey, "\(error)", error)
      }
    }
  }

  @objc(userConnections:rejecter:)
  func userConnections(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    Task {
      do {
        let connections = try await VitalClient.shared.user.userConnections()
        let jsonObjects = connections.map { source -> [String: Any] in
          [
            "name": source.name,
            "slug": source.slug.rawValue,
            "logo": source.logo,
            "status": source.status.rawValue,
            "resourceAvailability": Dictionary(
              uniqueKeysWithValues: source.resourceAvailability.map { key, value in
                (
                  key.rawValue,
                  [
                    "status": value.status.rawValue,
                    "scopeRequirements": value.scopeRequirements.map { req in
                      [
                        "userGranted": [
                          "required": req.userGranted.required,
                          "optional": req.userGranted.optional,
                        ],
                        "userDenied": [
                          "required": req.userDenied.required,
                          "optional": req.userDenied.optional,
                        ],
                      ]
                    } as Any
                  ]
                )
              }
            )
          ]
        }
        resolve(jsonObjects)
      } catch let error {
        reject(errorKey, "\(error)", error)
      }
    }
  }

  @objc(signOut:rejecter:)
  func signOut(resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
    Task {
      await VitalClient.shared.signOut()
      resolve(())
    }
  }

  @objc(sdkVersion:rejecter:)
  func sdkVersion(resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
    resolve(VitalClient.sdkVersion)
  }

  @objc(getAccessToken:rejecter:)
  func getAccessToken(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    Task {
      do {
        let accessToken = try await VitalClient.getAccessToken()
        resolve(accessToken)
      } catch let error {
        reject(errorKey, "\(error)", error)
      }
    }
  }

  @objc(refreshToken:rejecter:)
  func refreshToken(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    Task {
      do {
        try await VitalClient.refreshToken()
        resolve(())
      } catch let error {
        reject(errorKey, "\(error)", error)
      }
    }
  }

  @objc(deregisterProvider:resolver:rejecter:)
  func deregisterProvider(
    provider: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {

    guard let slug = Provider.Slug(rawValue: provider) else {
      reject(errorKey, "Unrecognized provider slug: \(provider)", nil)
      return
    }

    Task {
      do {
        try await VitalClient.shared.user.deregisterProvider(provider: slug)
        resolve(())
      } catch let error {
        reject(errorKey, "\(error)", error)
      }
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

extension VitalClient.Status {
  func strings() -> [String] {
    var strings = [String]()

    // Should be kept consistent with Android interop
    if contains(.signedIn) {
      strings.append("signedIn")
    }
    if contains(.configured) {
      strings.append("configured")
    }
    if contains(.useSignInToken) {
      strings.append("useSignInToken")
    }
    if contains(.useApiKey) {
      strings.append("useApiKey")
    }
    if contains(.pendingReauthentication) {
      strings.append("pendingReauthentication")
    }

    return strings
  }
}

enum ReactNativeAuthenticateRequest: Decodable {
  case signInToken(String)
  case apiKey(userId: String, key: String, environment: Environment)
  case error(JSError)

  enum CodingKeys: CodingKey {
    case type
    case rawToken
    case userId
    case key
    case environment
    case region
    case message
    case name
    case stack
  }

  init(from decoder: any Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)

    switch try container.decode(String.self, forKey: .type) {
    case "signInToken":
      self = .signInToken(try container.decode(String.self, forKey: .rawToken))
    case "apiKey":

      let env: Environment
      let rawEnv = try container.decode(String.self, forKey: .environment)
      let rawRegion = try container.decode(String.self, forKey: .region)

      switch (rawEnv, rawRegion) {
      case ("production", "us"):
        env = .production(.us)
      case ("production", "eu"):
        env = .production(.eu)
      case ("sandbox", "us"):
        env = .sandbox(.us)
      case ("sandbox", "eu"):
        env = .sandbox(.eu)
      default:
        throw DecodingError.dataCorruptedError(forKey: .environment, in: container, debugDescription: "unsupported: \(rawEnv) \(rawRegion)")
      }

      self = .apiKey(
        userId: try container.decode(String.self, forKey: .userId),
        key: try container.decode(String.self, forKey: .key),
        environment: env
      )
    case "error":
      self = .error(
        JSError(
          message: try container.decode(String.self, forKey: .message),
          name: try container.decodeIfPresent(String.self, forKey: .name),
          stack: try container.decodeIfPresent(String.self, forKey: .stack)
        )
      )
    case let value:
      throw DecodingError.dataCorruptedError(forKey: .type, in: container, debugDescription: "unrecognized: \(value)")
    }
  }
}

internal struct JSError: Error, CustomStringConvertible {
  let message: String
  let name: String?
  let stack: String?

  var description: String {
    "JS Error: \(name ?? "<no name>") \(message) \(stack ?? "<no stack>")"
  }
}
