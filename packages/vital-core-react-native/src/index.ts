import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import type { TimeSeriesData } from './models/TimeSeriesData';
import type { ManualProviderSlug, Provider, ProviderSlug } from './models/Provider';
import type { VitalCoreStatus } from './models/VitalCoreStatus';

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

  static status(): Promise<VitalCoreStatus[]> {
    return VitalCoreReactNative.status();
  }

  static signIn(token: string): Promise<void> {
    return VitalCoreReactNative.signIn(token);
  }

  static observeStatusChange(listener: (status: VitalCoreStatus[]) => void): Subscription {
    var isCancelled = false
    var subscription = { remove: () => { isCancelled = true } };

    this.status().then((initialStatus) => {
      if (!isCancelled) {
        listener(initialStatus);

        let emitterSub = this.eventEmitter.addListener("VitalClientStatus", listener)
        subscription.remove = () => { emitterSub.remove() }
      }
    });

    return subscription
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

  static userConnectedSources(): Promise<Provider[]> {
    return VitalCoreReactNative.userConnectedSources();
  }

  static createConnectedSourceIfNotExist(
    provider: ManualProviderSlug
  ): Promise<void> {
    return VitalCoreReactNative.createConnectedSourceIfNotExist(provider);
  }

  static postTimeSeriesData(
    data: TimeSeriesData,
    provider: ManualProviderSlug,
    timeZone: string | undefined = undefined
  ): Promise<void> {
    return VitalCoreReactNative.postTimeSeriesData(
      JSON.stringify(data),
      provider,
      timeZone
    );
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

  static cleanUp(): Promise<void> {
    return VitalCoreReactNative.cleanUp();
  }
}
