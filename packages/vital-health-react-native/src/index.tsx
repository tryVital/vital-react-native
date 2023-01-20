import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

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
  static status = new NativeEventEmitter(VitalHealthReactNative);

  static configure(
    backgroundDeliveryEnabled: boolean,
    numberOfDaysToBackFill: number,
    enableLogs: boolean
  ): Promise<void> {
    return VitalHealthReactNative.configure(
      backgroundDeliveryEnabled,
      numberOfDaysToBackFill,
      enableLogs
    );
  }

  static askForResources(resources: VitalResource[]): Promise<void> {
    return VitalHealthReactNative.ask(resources, []);
  }

  static ask(
    readResources: VitalResource[],
    writeResources: VitalWriteResource[]
  ): Promise<void> {
    return VitalHealthReactNative.ask(readResources, writeResources);
  }

  static writeHealthData(
    resource: VitalWriteResource,
    value: number,
    startDate: Date,
    endDate: Date
  ): Promise<void> {
    return VitalHealthReactNative.writeHealthData(
      resource,
      value,
      startDate.getTime(),
      endDate.getTime()
    );
  }

  static hasAskedForPermission(resource: VitalResource): Promise<boolean> {
    return VitalHealthReactNative.hasAskedForPermission(resource);
  }

  static syncData(resources: VitalResource[]): Promise<void> {
    return VitalHealthReactNative.syncData(resources);
  }

  static cleanUp(): Promise<void> {
    return VitalHealthReactNative.cleanUp();
  }
}

// noinspection JSUnusedGlobalSymbols
export enum VitalResource {
  Profile = 'profile',
  Body = 'body',
  Workout = 'workout',
  Activity = 'activity',
  Sleep = 'sleep',
  Glucose = 'glucose',
  BloodPressure = 'bloodPressure',
  HeartRate = 'heartRate',
  Steps = 'steps',
  ActiveEnergyBurned = 'activeEnergyBurned',
  BasalEnergyBurned = 'basalEnergyBurned',
  Water = 'water',
  Caffeine = 'caffeine',
  MindfulSession = 'mindfulSession',
}

export enum VitalWriteResource {
  Water = 'water',
  Caffeine = 'caffeine', // ios only
  MindfulSession = 'mindfulSession', // iOS only, value is ignored
}
