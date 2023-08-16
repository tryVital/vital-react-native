import type { DeviceModel } from './device_model';
import type { QuantitySample } from '@tryvital/vital-core-react-native';

export interface ScannedDevice {
  id: string;
  name: string;
  deviceModel: DeviceModel;
}

export enum Libre1SensorState {
  Unknown = "unknown",
  NotActivated = "not_activated",
  WarmingUp = "warming_up",
  Active = "active",
  Expired = "expired",
  Shutdown = "shutdown",
  Failure = "failure",
}

export default interface Libre1Sensor {
  serial: string,
  maxLife: number,
  age: number,
  state: Libre1SensorState
}

export default interface Libre1Read {
  samples: QuantitySample[],
  sensor: Libre1Sensor
}