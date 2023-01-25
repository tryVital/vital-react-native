export class HealthConfig {
  logsEnabled = true;
  numberOfDaysToBackFill = 90;
  androidConfig = new AndroidHealthConfig();
  iosConfig = new IosHealthConfig();
}

export class AndroidHealthConfig {
  syncOnAppStart = true;
}

export class IosHealthConfig {
  dataPushMode = 'automatic';
  backgroundDeliveryEnabled = true;
}
