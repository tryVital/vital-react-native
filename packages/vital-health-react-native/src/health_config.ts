export type ConnectionPolicy = 'autoConnect' | 'explicit';

export enum IOSHealthProvider {
  AppleHealthKit = 'apple_health_kit',
}

export enum AndroidHealthProvider {
  HealthConnect = 'health_connect',
  SamsungHealth = 'samsung_health',
}

export type HealthProvider = IOSHealthProvider | AndroidHealthProvider;

export class HealthConfig {
  logsEnabled = true;
  numberOfDaysToBackFill = 30;
  connectionPolicy: ConnectionPolicy = 'autoConnect';
  androidConfig = new AndroidHealthConfig();
  iOSConfig = new IOSHealthConfig();
}

export class AndroidHealthConfig {
  provider: AndroidHealthProvider = AndroidHealthProvider.HealthConnect;
  syncOnAppStart = true;
}

export class IOSHealthConfig {
  dataPushMode = 'automatic';
  backgroundDeliveryEnabled = true;
}
