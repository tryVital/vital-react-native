import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import type { ManualProviderSlug, ProviderSlug, UserConnection } from './models/Provider';
import type { VitalCoreStatus } from './models/VitalCoreStatus';
import type { AuthenticateRequest } from './models/AuthenticateRequest';

export { VitalCoreStatus } from './models/VitalCoreStatus';
export { default as QuantitySample } from './models/QuantitySample';
export { default as BloodPressureSample } from './models/BloodPressureSample';
export * from './models/TimeSeriesData';
export { ManualProviderSlug } from './models/Provider';

const LINKING_ERROR =
  `The package 'vital-core-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const VitalCoreReactNative = NativeModules.VitalCoreReactNative
  ? NativeModules.VitalCoreReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export interface Subscription {
  remove: () => void
}

export class VitalCore {
  private static eventEmitter = new NativeEventEmitter(NativeModules.VitalCoreReactNative);

  static setEventEmitter(emitter: NativeEventEmitter) {
    this.eventEmitter = emitter;
  }

  static currentUserId(): Promise<string | null> {
    return VitalCoreReactNative.currentUserId();
  }

  /**
   * The currently identified External User ID of the Mobile SDK.
   * This has meaning only if you have migrated to [identifyExternalUser].
   */
  static identifiedExternalUser(): Promise<string | null> {
    return VitalCoreReactNative.identifiedExternalUser();
  }

  static status(): Promise<VitalCoreStatus[]> {
    return VitalCoreReactNative.status();
  }

  /**
   * Identify your user to the Vital Mobile SDK with an external user identifier from your system.
   *
   * This is _external_ with respect to the SDK. From your perspective, this would be your _internal_ user identifier.
   *
   * If the identified external user is not what the SDK has last seen, or has last successfully signed-in:
   * 1. The SDK calls your supplied [authenticate] lambda.
   * 2. Your lambda obtains a Vital Sign-In Token **from your backend service** and returns it.
   * 3. The SDK performs the following actions:
   *
   * | SDK Signed-In User | The supplied Sign-In Token | Outcome |
   * | ------ | ------ | ------ |
   * | User A | User B | Sign out user A, then Sign in user B |
   * | User A | User A | No-op |
   * | None | User A | Sign In user A |
   *
   * Your [authenticate] lambda can throw CancellationError to abort the identify operation.
   *
   * You should identify at regular and significant moments in your app user lifecycle to ensure that it stays in sync with
   * the Vital Mobile SDK user state. For example:
   *
   * 1. Identify your user after you signed in a new user.
   * 2. Identify your user again after you have reloaded user state from persistent storage (e.g. [SharedPreferences]) post app launch.
   *
   * You can query the current identified user through [identifiedExternalUser].
   *
   * ## Notes on migrating from [signIn]
   *
   * [identifyExternalUser] does not perform any action or [VitalCore.signOut] when the Sign-In Token you supplied belongs
   * to the already signed-in Vital User — regardless of whether the sign-in happened prior to or after the introduction of
   * [identifyExternalUser].
   *
   * Because of this behaviour, you can migrate by simply replacing [signIn] with [identifyExternalUser].
   * There is no precaution in SDK State — e.g., the Health SDK data sync state — being unintentionally reset.
   */
  static async identifyExternalUser(externalUserId: string, authenticate: (externalUserId: string) => Promise<AuthenticateRequest>): Promise<void> {
    const callId = (new Date().getTime()).toString();

    // Android/iOS sends IdentifyExternalUserRequest when the SDK detects an external user ID change,
    // and needs new credentials to sign-in the new user.
    const listener = this.eventEmitter.addListener(
      "IdentifyExternalUserRequest",
      (args) => {
        const [eventCallId, eventExternalUserId] = args;

        if (eventCallId !== callId) {
          return;
        }

        authenticate(eventExternalUserId).then(
          (request) => {
            VitalCoreReactNative.identifyExternalUserResponse(JSON.stringify(request), callId);
          },
          (err) => {
            const errorPayload = err instanceof Error
              ? { type: "error", name: err.name, message: err.message, stack: err.stack }
              : { type: "error", message: err.toString() };

            VitalCoreReactNative.identifyExternalUserResponse(JSON.stringify(errorPayload), callId);
          }
        );
      }
    );

    try {
      await VitalCoreReactNative.identifyExternalUser(externalUserId, callId);

    } finally {
      listener.remove()
    }
  }

  static signIn(token: string): Promise<void> {
    return VitalCoreReactNative.signIn(token);
  }

  static observeStatusChange(listener: (status: VitalCoreStatus[]) => void): Subscription {
    var isCancelled = false

    const wrappedListener = (status: VitalCoreStatus[]) => {
      if (isCancelled) {
        return;
      }
      listener(status);
    }
    const subscription = this.eventEmitter.addListener("VitalClientStatus", wrappedListener);
    this.status().then(wrappedListener);

    return {
      remove() {
        isCancelled = true;
        subscription.remove();
      },
    };
  }

  static setUserId(userId: string): Promise<void> {
    return VitalCoreReactNative.setUserId(userId);
  }

  static configure(
    apiKey: string,
    environment: string,
    region: string,
    enableLogs: boolean
  ): Promise<void> {
    return VitalCoreReactNative.configure(
      apiKey,
      environment,
      region,
      enableLogs
    );
  }

  static hasUserConnectedTo(
    provider: ManualProviderSlug
  ): Promise<boolean> {
    return VitalCoreReactNative.hasUserConnectedTo(provider);
  }

  static userConnections(): Promise<UserConnection[]> {
    return VitalCoreReactNative.userConnections();
  }

  static deregisterProvider(provider: ProviderSlug): Promise<void> {
    return VitalCoreReactNative.deregisterProvider(provider);
  }

  static getAccessToken(): Promise<string> {
    return VitalCoreReactNative.getAccessToken();
  }

  static refreshToken(): Promise<void> {
    return VitalCoreReactNative.refreshToken();
  }

  static async getVitalAPIHeaders(): Promise<Record<string, string>> {
    const [accessToken, sdkVersion] = await Promise.all([this.getAccessToken(), this.sdkVersion()]);
    let versionKey: string

    if (Platform.OS == "android") {
      versionKey = "X-Vital-Android-SDK-Version"
    } else if (Platform.OS == "ios" || Platform.OS == "macos") {
      versionKey = "X-Vital-iOS-SDK-Version"
    } else {
      throw Error(`Unsupported React Native platform: ${Platform.OS}`)
    }

    let headers: Record<string, string> = {"Authorization": `Bearer ${accessToken}`}
    headers[versionKey] = sdkVersion;
    return headers
  }

  static sdkVersion(): Promise<string> {
    return VitalCoreReactNative.sdkVersion();
  }

  static signOut(): Promise<void> {
    return VitalCoreReactNative.signOut();
  }
}
