import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import type { HealthConfig } from './health_config';

// Reexports
export * from './health_config';

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

export const VitalHealthReactNativeModule = VitalHealthReactNative;

export const VitalHealthEvents = {
  statusEvent: 'Status',
};

export interface SyncNotificationContent {
  notificationTitle: string;
  notificationContent: string;
  channelName: string;
  channelDescription: string;
}

export class VitalHealth {
  static status = new NativeEventEmitter(VitalHealthReactNative);

  static get canEnableBackgroundSyncNoninteractively(): boolean {
    return Platform.OS !== 'android';
  }

  /**
   * Whether health data sync is paused at the moment.
   */
  static get pauseSynchronization(): Promise<boolean> {
    return VitalHealthReactNative.getPauseSynchronization();
  }

  /**
   * [Android ONLY][Experimental API]
   * On iOS, this property always returns `true`. iOS HealthKit Background Delivery is
   * an app-level entitlement, and does not require explicit user consent.
   * 
   * ## Overview
   * 
   * Whether Background Sync on Android is enabled at the moment.
   */
  static get isBackgroundSyncEnabled(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    return VitalHealthReactNative.isBackgroundSyncEnabled();
  }

  /**
   * [Android ONLY][Experimental API]
   * On iOS, this property always returns `3_600_000`.
   */
  static get backgroundSyncMinimumInterval(): Promise<number> {
    if (Platform.OS !== 'android') {
      return Promise.resolve(3_600_000);
    }

    return VitalHealthReactNative.backgroundSyncMinimumInterval();
  }

  /**
   * [Android ONLY][Experimental API]
   * On iOS, this property always returns `0`.
   */
  static get autoSyncThrottle(): Promise<number> {
    if (Platform.OS !== 'android') {
      return Promise.resolve(0);
    }

    return VitalHealthReactNative.autoSyncThrottle();
  }

  static isAvailable(): Promise<boolean> {
    if (Platform.OS === 'android') {
      return VitalHealthReactNative.isAvailable();
    } else {
      return Promise.resolve(true);
    }
  }

  static configure(healthConfig: HealthConfig): Promise<void> {
    if (Platform.OS === 'android') {
      return VitalHealthReactNative.configure(
        healthConfig.androidConfig.syncOnAppStart,
        healthConfig.numberOfDaysToBackFill,
        healthConfig.logsEnabled
      );
    } else {
      return VitalHealthReactNative.configure(
        healthConfig.iOSConfig.backgroundDeliveryEnabled,
        healthConfig.numberOfDaysToBackFill,
        healthConfig.logsEnabled
      );
    }
  }

  /**
   * [Android ONLY][Experimental API]
   * On iOS, this method is a no-op returning `true`. iOS HealthKit Background Delivery is an app-level
   * entitlement, and does not require explicit user consent.
   * 
   * If you intend to pause or unpause synchronization, use `pauseSynchronization`
   * and `setPauseSynchronization(_:)` instead.
   * 
   * ## Overview
   * 
   * Enable background sync on Android. This includes requesting permissions from the end user whenever necessary.
   *
   * Vital SDK achieves automatic data sync through Android [AlarmManager] exact alarms.
   *
   * Refer to the [Vital Health Connect guide for full context and setup instructions](https://docs.tryvital.io/wearables/guides/android_health_connect).
   *
   * ## Gist on Exact Alarms
   *
   * "Exact Alarm" here refers to the Android Exact Alarm mechanism. The Vital SDK would propose
   * to the Android OS to fire the next data sync with a T+60min wall clock target. The Android OS
   * may fulfill the request exactly as proposed, e.g., when the user happens to be actively using
   * the device. However, it may also choose to defer it arbitrarily, under the influence of
   * power-saving policies like [Doze mode](https://developer.android.com/training/monitoring-device-state/doze-standby#understand_doze).
   *
   * On Android 12 (API Level 31) or above, this contract would automatically initiate the OS-required
   * user consent flow for Exact Alarm usage. If the permission has been granted prior, this activity
   * contract shall return synchronously.
   *
   * On Android 13 (API Level 33) or above, you have the option to use (with platform policy caveats)
   * the [android.Manifest.permission.USE_EXACT_ALARM] permission instead, which does not require an
   * explicit consent flow. This contract would return synchronously in this scenario.
   *
   * Regardless of API Level, your App Manifest must declare [android.Manifest.permission.RECEIVE_BOOT_COMPLETED].
   * Otherwise, background sync stops once the phone encounters a cold reboot or a quick restart.
   *
   * @return `true` if the background sync has been enabled successfully. `false` otherwise.
   */
  static async enableBackgroundSync(): Promise<boolean> {
    if (Platform.OS !== "android") {
      // iOS background delivery does not require user explicit consent.
      // It requires only the app-level HealthKit Bgnd. Delivery entitlement.
      return true;
    }
    
    return await VitalHealthReactNative.enableBackgroundSync();
  }

  /**
   * [Android ONLY][Experimental API]
   * On iOS, this method is a no-op. iOS HealthKit Background Delivery is an app-level
   * entitlement, and does not require explicit user consent.
   * 
   * If you intend to pause or unpause synchronization, use `pauseSynchronization`
   * and `setPauseSynchronization(_:)` instead.
   * 
   * ## Overview
   *
   * Disable background sync on Android.
   */
  static async disableBackgroundSync(): Promise<void> {
    if (Platform.OS !== "android") {
      // iOS background delivery does not require user explicit consent.
      // It requires only the app-level HealthKit Bgnd. Delivery entitlement.
      return;
    }

    return await VitalHealthReactNative.disableBackgroundSync();
  }

  /**
   * [Android ONLY][Experimental API]
   * On iOS, this method is a no-op. iOS does not require apps to show a user-visible
   * notification when performing extended work in background.
   * 
   * ## Overview
   * Set the text content related to the Sync Notification. The OS has full discretion to present
   * this notification to the user, when any data sync work in background is taking longer than expected.
   * 
   * Refer to the [Vital Health Connect guide for full context and setup instructions](https://docs.tryvital.io/wearables/guides/android_health_connect).
   */
  static async setSyncNotificationContent(content: SyncNotificationContent): Promise<void> {
    if (Platform.OS !== "android") {
      // iOS background delivery does not require user explicit consent.
      // It requires only the app-level HealthKit Bgnd. Delivery entitlement.
      return;
    }

    return await VitalHealthReactNative.setSyncNotificationContent(
      JSON.stringify(content)
    );
  }

  /**
   * [Android ONLY][Experimental API]
   * On iOS, this method is a no-op.
   * 
   * A throttling threshold below 5 seconds is ignored.
   */
  static async setAutoSyncThrottle(thresholdInMilliseconds: number): Promise<void> {
    if (Platform.OS !== "android") {
      return;
    }

    return await VitalHealthReactNative.setAutoSyncThrottle(thresholdInMilliseconds);
  }

  /**
   * [Android ONLY][Experimental API]
   * On iOS, this method is a no-op.
   * 
   * A minimum interval below 3600 seconds is ignored.
   */
  static async setBackgroundSyncMinimumInterval(intervalInMilliseconds: number): Promise<void> {
    if (Platform.OS !== "android") {
      return;
    }

    return await VitalHealthReactNative.setBackgroundSyncMinimumInterval(intervalInMilliseconds);
  }

  /**
   * Pause or unpause health data sync.
   */
  static async setPauseSynchronization(paused: boolean) {
    return await VitalHealthReactNative.setPauseSynchronization(paused);
  }

  static askForResources(resources: VitalResource[]): Promise<PermissionOutcome> {
    return this.ask(resources, []);
  }

  static async ask(
    readResources: VitalResource[],
    writeResources: VitalWriteResource[]
  ): Promise<PermissionOutcome> {
    const result = await VitalHealthReactNative.ask(readResources, writeResources);

    if (Platform.OS !== "android") {
      return "success";
    } else {
      return result as PermissionOutcome;
    }
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

  static syncData(resources: VitalResource[] = []): Promise<void> {
    return VitalHealthReactNative.syncData(resources);
  }

  static openPlatformHealthApp(): Promise<void> {
    return VitalHealthReactNative.openPlatformHealthApp();
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
  MenstrualCycle = 'menstrualCycle',
}

export enum VitalWriteResource {
  Water = 'water',
  Caffeine = 'caffeine', // iOS only
  MindfulSession = 'mindfulSession', // iOS only, value is ignored
}

export type PermissionOutcome = 'success' | 'cancelled' | 'unknownError' | 'notPrompted' | 'healthDataUnavailable';
