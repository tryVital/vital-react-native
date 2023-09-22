export class HealthConfig {
  logsEnabled = true;
  numberOfDaysToBackFill = 30;
  androidConfig = new AndroidHealthConfig();
  iOSConfig = new IOSHealthConfig();
}

export class AndroidHealthConfig {
  syncOnAppStart = true;
}

export class IOSHealthConfig {
  dataPushMode = 'automatic';
  backgroundDeliveryEnabled = true;
}
