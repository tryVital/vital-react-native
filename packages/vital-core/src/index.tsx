import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-vital-core' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const VitalCore = NativeModules.VitalCore
  ? NativeModules.VitalCore
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function vitalCoreMultiply(a: number, b: number): Promise<number> {
  return VitalCore.multiply(a, b);
}
