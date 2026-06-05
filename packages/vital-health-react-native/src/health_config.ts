export type ConnectionPolicy = 'autoConnect' | 'explicit';

export enum IOSHealthProvider {
  AppleHealthKit = 'apple_health_kit',
}

export enum AndroidHealthProvider {
  HealthConnect = 'health_connect',
  SamsungHealth = 'samsung_health',
}

export type HealthProvider =
  | 'apple_health_kit'
  | 'health_connect'
  | 'samsung_health';

export class HealthConfig {
  logsEnabled = true;
  numberOfDaysToBackFill = 30;
  connectionPolicy: ConnectionPolicy = 'autoConnect';
  androidConfig = new AndroidHealthConfig();
  iOSConfig = new IOSHealthConfig();
}

export class AndroidHealthConfig {
  syncOnAppStart = true;
}

export class IOSHealthConfig {
  dataPushMode = 'automatic';
  backgroundDeliveryEnabled = true;
  /**
   * Controls which apps/sources are allowed to contribute sleep data during sync (iOS only).
   *
   * - `undefined` (default): use the SDK's built-in default allow list of known sleep providers.
   * - `'all'`: accept sleep data from every source.
   * - `string[]`: accept only the listed source app bundle identifiers. Use {@link SleepDataApp}
   *   for the known providers, or pass any raw bundle identifier string.
   *
   * Manually-entered sleep data is always allowed, regardless of this setting.
   */
  sleepDataAllowlist?: SleepDataAllowlist;
}

/**
 * Known sleep data source apps and their bundle identifiers, mirroring the iOS SDK's
 * `AppIdentifier` constants. Use these with {@link IOSHealthConfig.sleepDataAllowlist}.
 */
export const SleepDataApp = {
  appleHealthKit: 'com.apple.health',
  oura: 'com.ouraring.oura',
  withings: 'com.withings.wiScaleNG',
  whoop: 'com.whoop.iphone',
  garmin: 'com.garmin.connect.mobile',
  fitbit: 'com.fitbit.FitbitMobile',
  polar: 'fi.polar.polarflow',
  coros: 'com.coros.coros',
  suunto: 'com.sports-tracker.suunto.iphone',
  xiaomi: 'com.xiaomi.miwatch.pro',
  muse: 'com.interaxon.muse',
  biostrap: 'com.biostrap.Biostrap',
  cardiomood: 'com.corsanohealth.cardiomood',
  eightsleep: 'com.eightsleep.Eight',
  zepp: 'com.huami.watch',
  zeppLife: 'HM.wristband',
  sleepCycle: 'com.lexwarelabs.goodmorning',
} as const;

/**
 * Sleep data allow list value. `'all'` accepts every source; a `string[]` of bundle identifiers
 * accepts only those sources; leaving it `undefined` uses the SDK default.
 */
export type SleepDataAllowlist = 'all' | string[];
