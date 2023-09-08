import type { DeviceModel } from './device_model';
import type { QuantitySample } from '@tryvital/vital-core-react-native';

export interface ScannedDevice {
  id: string;
  name: string;
  deviceModel: DeviceModel;
}

export type Libre1SensorState = "unknown" | "notActivated" | "warmingUp" | "active" | "expired" | "shutdown" | "failure";

export interface Libre1Sensor {
  serial: string,
  maxLife: number,
  age: number,
  state: Libre1SensorState
}

export interface Libre1Read {
  samples: QuantitySample[],
  sensor: Libre1Sensor
}
