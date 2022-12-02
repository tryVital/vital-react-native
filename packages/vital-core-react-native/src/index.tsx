import { NativeModules, Platform } from 'react-native';

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

export function setUserId(userId: string): Promise<void> {
  return VitalCoreReactNative.setUserId(userId);
}

export function configurate(apiKey: string, environment: string, region: string, enableLogs: boolean): Promise<void> {
  return VitalCoreReactNative.configurate(apiKey, environment, region, enableLogs);
}
