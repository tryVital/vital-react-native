import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'vital-health-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const VitalHealthReactNative = NativeModules.VitalHealthReactNative
  ? NativeModules.VitalHealthReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export class VitalHealth {
   static configure(backgroundDeliveryEnabled: boolean, numberOfDaysToBackFill: number, enableLogs: boolean): Promise<void> {
      return VitalHealthReactNative.configure(backgroundDeliveryEnabled, numberOfDaysToBackFill, enableLogs);
  }

  static askForResources(resources: string[]): Promise<void> {
    return VitalHealthReactNative.askForResources(resources);
  }

  static hasPermissionForResource(resource: string): Promise<boolean> {
    return VitalHealthReactNative.hasPermissionForResource(resource);
  }

  static cleanUp(): Promise<void> {
    return VitalHealthReactNative.cleanUp();
  }
}
