import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { AndroidHealthProvider, IOSHealthProvider } from './health_config';
import type { HealthConfig, HealthProvider } from './health_config';
import type { AskConfig } from './ask_config';
import type { Subscription } from '@tryvital/vital-core-react-native';

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

const eventNames = {
  syncStatus: {
    apple_health_kit: 'Status',
    health_connect: 'Status',
    samsung_health: 'SamsungHealthSyncStatus',
  } satisfies Record<HealthProvider, string>,
  connectionStatus: {
    apple_health_kit: 'VitalHealthConnectionStatus',
    health_connect: 'HealthConnectConnectionStatus',
    samsung_health: 'SamsungHealthConnectionStatus',
  } satisfies Record<HealthProvider, string>,
};

function defaultHealthProvider(): HealthProvider {
  return Platform.OS === 'android'
    ? AndroidHealthProvider.HealthConnect
    : IOSHealthProvider.AppleHealthKit;
}

function isAndroidHealthProvider(
  provider: HealthProvider
): provider is AndroidHealthProvider {
  return (
    provider === AndroidHealthProvider.HealthConnect ||
    provider === AndroidHealthProvider.SamsungHealth
  );
}

function validateHealthProvider(provider: HealthProvider): HealthProvider {
  if (Platform.OS === 'ios') {
    if (provider !== IOSHealthProvider.AppleHealthKit) {
      throw new Error(
        `Provider ${provider} is only supported on Android. Use ${IOSHealthProvider.AppleHealthKit} on iOS.`
      );
    }

    return provider;
  }

  if (Platform.OS === 'android') {
    if (!isAndroidHealthProvider(provider)) {
      throw new Error(
        `Provider ${provider} is only supported on iOS. Use ${AndroidHealthProvider.HealthConnect} or ${AndroidHealthProvider.SamsungHealth} on Android.`
      );
    }

    return provider;
  }

  throw new Error(`Unsupported platform: ${Platform.OS}.`);
}

export const VitalHealthReactNativeModule = VitalHealthReactNative;

export const VitalHealthEvents = {
  statusEvent: eventNames.syncStatus[defaultHealthProvider()],
};

export interface SyncNotificationContent {
  notificationTitle: string;
  notificationContent: string;
  channelName: string;
  channelDescription: string;
}

export type ConnectionStatus =
  | 'autoConnect'
  | 'connected'
  | 'disconnected'
  | 'connectionPaused';

export class VitalHealth {
  static status = new NativeEventEmitter(VitalHealthReactNative);
  private static eventEmitter = new NativeEventEmitter(VitalHealthReactNative);

  static setEventEmitter(emitter: NativeEventEmitter) {
    this.eventEmitter = emitter;
  }

  static get canEnableBackgroundSyncNoninteractively(): boolean {
    return Platform.OS !== 'android';
  }

  static getConnectionStatus(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<ConnectionStatus> {
    provider = validateHealthProvider(provider);
    return VitalHealthReactNative.getConnectionStatus(provider);
  }

  /**
   * @deprecated Use `getConnectionStatus()` instead.
   */
  static get connectionStatus(): Promise<ConnectionStatus> {
    return this.getConnectionStatus();
  }

  static observeConnectionStatusChange(
    listener: (status: ConnectionStatus) => void,
    provider: HealthProvider = defaultHealthProvider()
  ): Subscription {
    var isCancelled = false;

    const wrappedListener = (status: ConnectionStatus) => {
      if (isCancelled) {
        return;
      }
      listener(status);
    };
    const subscription = this.eventEmitter.addListener(
      eventNames.connectionStatus[provider],
      wrappedListener
    );
    this.getConnectionStatus().then(wrappedListener);

    return {
      remove() {
        isCancelled = true;
        subscription.remove();
      },
    };
  }

  static observeSyncStatusChange(
    listener: (status: ConnectionStatus) => void,
    provider: HealthProvider = defaultHealthProvider()
  ): Subscription {
    var isCancelled = false;

    const wrappedListener = (status: ConnectionStatus) => {
      if (isCancelled) {
        return;
      }
      listener(status);
    };
    const subscription = this.eventEmitter.addListener(
      eventNames.connectionStatus[provider],
      wrappedListener
    );
    this.getConnectionStatus().then(wrappedListener);

    return {
      remove() {
        isCancelled = true;
        subscription.remove();
      },
    };
  }
  /**
   * Whether health data sync is paused at the moment.
   *
   * To pause or unpause synchronization client-side, use `setPauseSynchronization`.
   *
   * Note that this has no effect on the Junction API side. This is intended as a temporary pause switch.
   * Consider using [Explicit Connect mode](https://docs.junction.com/wearables/sdks/health/connection-policies#explicit-connect-mode)
   * if you need the Junction API to track and persist disconnections.
   */
  static isProviderSynchronizationPaused(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<boolean> {
    provider = validateHealthProvider(provider);
    return VitalHealthReactNative.getPauseSynchronization(provider);
  }

  /**
   * @deprecated Use `isProviderSynchronizationPaused()` instead.
   */
  static get pauseSynchronization(): Promise<boolean> {
    return this.isProviderSynchronizationPaused();
  }

  /**
   * IMPORTANT: This is Android-only API.
   *
   * On iOS, this property always returns `true`. iOS HealthKit Background Delivery is
   * an app-level entitlement, and does not require explicit user consent.
   *
   * ## Overview
   *
   * Whether Background Sync on Android is enabled at the moment.
   */
  static isBackgroundSyncEnabledForProvider(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<boolean> {
    provider = validateHealthProvider(provider);

    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    return VitalHealthReactNative.isBackgroundSyncEnabled(provider);
  }

  /**
   * @deprecated Use `isBackgroundSyncEnabledForProvider()` instead.
   */
  static get isBackgroundSyncEnabled(): Promise<boolean> {
    return this.isBackgroundSyncEnabledForProvider();
  }

  /**
   * IMPORTANT: This is Android-only API.
   *
   * Returns the target frequency of Health Connect Background Sync.
   *
   * On iOS, this property always returns `3_600_000`.
   */
  static getBackgroundSyncMinimumInterval(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<number> {
    provider = validateHealthProvider(provider);

    if (Platform.OS !== 'android') {
      return Promise.resolve(3_600_000);
    }

    return VitalHealthReactNative.backgroundSyncMinimumInterval(provider);
  }

  /**
   * @deprecated Use `getBackgroundSyncMinimumInterval()` instead.
   */
  static get backgroundSyncMinimumInterval(): Promise<number> {
    return this.getBackgroundSyncMinimumInterval();
  }

  /**
   * IMPORTANT: This is Android-only API.
   *
   * Returns the minimum time that must have elapsed before a any automatic Health Connect
   * data sync attempt is permitted.
   *
   * Automatic sync attempts include recurring Background Sync, as well as Sync on App Launch/Resumption.
   *
   * On iOS, this property always returns `0`.
   */
  static getAutoSyncThrottle(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<number> {
    provider = validateHealthProvider(provider);

    if (Platform.OS !== 'android') {
      return Promise.resolve(0);
    }

    return VitalHealthReactNative.autoSyncThrottle(provider);
  }

  /**
   * @deprecated Use `getAutoSyncThrottle()` instead.
   */
  static get autoSyncThrottle(): Promise<number> {
    return this.getAutoSyncThrottle();
  }

  static isAvailable(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<boolean> {
    provider = validateHealthProvider(provider);

    if (Platform.OS === 'android') {
      return VitalHealthReactNative.isAvailable(provider);
    } else {
      return Promise.resolve(true);
    }
  }

  static configure(
    healthConfig: HealthConfig,
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<void> {
    provider = validateHealthProvider(provider);

    if (Platform.OS === 'android') {
      return VitalHealthReactNative.configure(
        provider,
        healthConfig.androidConfig.syncOnAppStart,
        healthConfig.numberOfDaysToBackFill,
        healthConfig.logsEnabled,
        healthConfig.connectionPolicy
      );
    } else {
      return VitalHealthReactNative.configure(
        provider,
        healthConfig.iOSConfig.backgroundDeliveryEnabled,
        healthConfig.numberOfDaysToBackFill,
        healthConfig.logsEnabled,
        healthConfig.connectionPolicy
      );
    }
  }

  /**
   * Setup a HealthKit (iOS) or Health Connect (Android) connection with this device.
   *
   * @precondition You must configure the Health SDK to use the `explicit` Connection Policy.
   */
  static async connect(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<void> {
    provider = validateHealthProvider(provider);
    return await VitalHealthReactNative.connect(provider);
  }

  /**
   * Disconnect the active HealthKit (iOS) or Health Connect (Android) connection with this device.
   *
   * @precondition You must configure the Health SDK to use the `explicit` Connection Policy.
   */
  static async disconnect(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<void> {
    provider = validateHealthProvider(provider);
    return await VitalHealthReactNative.disconnect(provider);
  }

  /**
   * IMPORTANT: This is Android-only API.
   *
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
  static async enableBackgroundSync(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<boolean> {
    provider = validateHealthProvider(provider);

    if (Platform.OS !== 'android') {
      // iOS background delivery does not require user explicit consent.
      // It requires only the app-level HealthKit Bgnd. Delivery entitlement.
      return true;
    }

    return await VitalHealthReactNative.enableBackgroundSync(provider);
  }

  /**
   * IMPORTANT: This is Android-only API.
   *
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
  static async disableBackgroundSync(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<void> {
    provider = validateHealthProvider(provider);

    if (Platform.OS !== 'android') {
      // iOS background delivery does not require user explicit consent.
      // It requires only the app-level HealthKit Bgnd. Delivery entitlement.
      return;
    }

    return await VitalHealthReactNative.disableBackgroundSync(provider);
  }

  /**
   * IMPORTANT: This is Android-only API.
   *
   * On iOS, this method is a no-op. iOS does not require apps to show a user-visible
   * notification when performing extended work in background.
   *
   * ## Overview
   * Set the text content related to the Sync Notification. The OS has full discretion to present
   * this notification to the user, when any data sync work in background is taking longer than expected.
   *
   * Refer to the [Vital Health Connect guide for full context and setup instructions](https://docs.tryvital.io/wearables/guides/android_health_connect).
   */
  static async setSyncNotificationContent(
    content: SyncNotificationContent,
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<void> {
    provider = validateHealthProvider(provider);

    if (Platform.OS !== 'android') {
      // iOS background delivery does not require user explicit consent.
      // It requires only the app-level HealthKit Bgnd. Delivery entitlement.
      return;
    }

    return await VitalHealthReactNative.setSyncNotificationContent(
      provider,
      JSON.stringify(content)
    );
  }

  /**
   * IMPORTANT: This is Android-only API.
   *
   * On iOS, this method is a no-op.
   *
   * Set the minimum time that must have elapsed before a any automatic Health Connect
   * data sync attempt is permitted.
   *
   * A throttling threshold below 5 seconds is ignored.
   */
  static async setAutoSyncThrottle(
    thresholdInMilliseconds: number,
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<void> {
    provider = validateHealthProvider(provider);

    if (Platform.OS !== 'android') {
      return;
    }

    return await VitalHealthReactNative.setAutoSyncThrottle(
      provider,
      thresholdInMilliseconds
    );
  }

  /**
   * IMPORTANT: This is Android-only API.
   *
   * On iOS, this method is a no-op.
   *
   * Set the target frequency of Health Connect Background Sync.
   *
   * A minimum interval below 3600 seconds is ignored.
   */
  static async setBackgroundSyncMinimumInterval(
    intervalInMilliseconds: number,
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<void> {
    provider = validateHealthProvider(provider);

    if (Platform.OS !== 'android') {
      return;
    }

    return await VitalHealthReactNative.setBackgroundSyncMinimumInterval(
      provider,
      intervalInMilliseconds
    );
  }

  /**
   * Pause or unpause health data sync.
   *
   * Note that this has no effect on the Junction API side. This is intended as a temporary client-side pause switch.
   * Consider using [Explicit Connect mode](https://docs.junction.com/wearables/sdks/health/connection-policies#explicit-connect-mode)
   * if you need the Junction API to track and persist disconnections.
   */
  static async setPauseSynchronization(
    paused: boolean,
    provider: HealthProvider = defaultHealthProvider()
  ) {
    provider = validateHealthProvider(provider);
    return await VitalHealthReactNative.setPauseSynchronization(
      provider,
      paused
    );
  }

  static askForResources(
    resources: VitalResource[],
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<PermissionOutcome> {
    return this.ask(resources, [], undefined, provider);
  }

  static async ask(
    readResources: VitalResource[],
    writeResources: VitalWriteResource[],
    config: AskConfig | undefined = undefined,
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<PermissionOutcome> {
    provider = validateHealthProvider(provider);

    if (config && Platform.OS !== config.type) {
      throw new Error(
        `ask config is for ${config.type} but runtime is ${Platform.OS}.`
      );
    }

    const result = await VitalHealthReactNative.ask(
      provider,
      readResources,
      writeResources,
      config
    );

    if (Platform.OS !== 'android') {
      return 'success';
    } else {
      return result as PermissionOutcome;
    }
  }

  static writeHealthData(
    resource: VitalWriteResource,
    value: number,
    startDate: Date,
    endDate: Date,
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<void> {
    provider = validateHealthProvider(provider);
    return VitalHealthReactNative.writeHealthData(
      provider,
      resource,
      value,
      startDate.getTime(),
      endDate.getTime()
    );
  }

  static hasAskedForPermission(
    resource: VitalResource,
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<boolean> {
    provider = validateHealthProvider(provider);
    return VitalHealthReactNative.hasAskedForPermission(provider, resource);
  }

  static syncData(
    resources: VitalResource[] = [],
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<void> {
    provider = validateHealthProvider(provider);
    return VitalHealthReactNative.syncData(provider, resources);
  }

  static openPlatformHealthApp(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<void> {
    provider = validateHealthProvider(provider);
    return VitalHealthReactNative.openPlatformHealthApp(provider);
  }

  static async openSyncProgressView(
    provider: HealthProvider = defaultHealthProvider()
  ): Promise<void> {
    provider = validateHealthProvider(provider);

    if (Platform.OS !== 'ios') {
      return;
    }

    return await VitalHealthReactNative.openSyncProgressView(provider);
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
  HeartRateVariability = 'heartRateVariability',
  BloodOxygen = 'bloodOxygen',
  Steps = 'steps',
  ActiveEnergyBurned = 'activeEnergyBurned',
  BasalEnergyBurned = 'basalEnergyBurned',
  /**
   * @deprecated renamed to `Distance`.
   */
  DistanceWalkingRunning = 'distance',
  Distance = 'distance',
  FloorsClimbed = 'floorsClimbed',
  VO2Max = 'vo2Max',
  Water = 'water',
  Caffeine = 'caffeine',
  MindfulSession = 'mindfulSession',
  Temperature = 'temperature',
  RespiratoryRate = 'respiratoryRate',
  MenstrualCycle = 'menstrualCycle',
  Meal = 'meal',

  /** iOS Only */
  AFibBurden = 'afibBurden',
  /** iOS Only */
  HeartRateAlert = 'heartRateAlert',
  /** iOS Only */
  Electrocardiogram = 'electrocardiogram',
  /** iOS Only */
  WheelchairPush = 'wheelchairPush',
  /** iOS Only */
  LeanBodyMass = 'leanBodyMass',
  /** iOS Only */
  WaistCircumference = 'waistCircumference',
  /** iOS Only */
  BodyMassIndex = 'bodyMassIndex',
  /** iOS Only */
  StandHour = 'standHour',
  /** iOS Only */
  StandDuration = 'standDuration',
  /** iOS Only */
  SleepApneaAlert = 'sleepApneaAlert',
  /** iOS Only */
  SleepBreathingDisturbance = 'sleepBreathingDisturbance',
  /** iOS Only */
  ForcedExpiratoryVolume1 = 'forcedExpiratoryVolume1',
  /** iOS Only */
  ForcedVitalCapacity = 'forcedVitalCapacity',
  /** iOS Only */
  PeakExpiratoryFlowRate = 'peakExpiratoryFlowRate',
  /** iOS Only */
  InhalerUsage = 'inhalerUsage',
  /** iOS Only */
  Fall = 'fall',
  /** iOS Only */
  UvExposure = 'uvExposure',
  /** iOS Only */
  DaylightExposure = 'daylightExposure',
  /** iOS Only */
  Handwashing = 'handwashing',
  /** iOS Only */
  BasalBodyTemperature = 'basalBodyTemperature',
  /** iOS Only */
  HeartRateRecoveryOneMinute = 'heartRateRecoveryOneMinute',
}

export enum VitalWriteResource {
  Water = 'water',
  /** iOS Only */
  Caffeine = 'caffeine',
  /** iOS Only */
  MindfulSession = 'mindfulSession',
}

export type PermissionOutcome =
  | 'success'
  | 'cancelled'
  | 'unknownError'
  | 'notPrompted'
  | 'healthDataUnavailable';
