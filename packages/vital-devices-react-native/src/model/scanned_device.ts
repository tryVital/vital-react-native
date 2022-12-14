import type { DeviceModel } from './device_model';

export interface ScannedDevice {
  id: string;
  name: string;
  deviceModel: DeviceModel;
}
