import { NativeModules, Platform } from 'react-native';
import type { TimeSeriesData } from './models/TimeSeriesData';
import type { ManualProviderSlug, Provider } from './models/Provider';

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

export class VitalCore {
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

  static cleanUp(): Promise<void> {
    return VitalCoreReactNative.cleanUp();
  }
}
