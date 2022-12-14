import type { Brand } from './brand';

export enum DeviceKind {
  BloodPressure = 'bloodPressure',
  GlucoseMeter = 'glucoseMeter',
}

export interface DeviceModel {
  id: string;
  name: string;
  brand: Brand;
  kind: DeviceKind;
}
