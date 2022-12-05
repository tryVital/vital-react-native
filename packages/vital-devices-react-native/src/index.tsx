import { EventEmitter, NativeModules, Platform } from 'react-native';
import { DeviceKind, DeviceModel } from './model/device_model';
import { Brand } from './model/brand';
import type { ScannedDevice } from './model/scanned_device';

const LINKING_ERROR =
  `The package 'vital-devices-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const VitalDevicesReactNative = NativeModules.VitalDevicesReactNative
  ? NativeModules.VitalDevicesReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const supportedDevices = [
  {
    id: 'omron_m4',
    name: 'Omron Intelli IT M4',
    brand: Brand.Omron,
    kind: DeviceKind.BloodPressure,
  },
  {
    id: 'omron_m7',
    name: 'Omron Intelli IT M7',
    brand: Brand.Omron,
    kind: DeviceKind.BloodPressure,
  },
  {
    id: 'accuchek_guide',
    name: 'Accu-Chek Guide',
    brand: Brand.AccuChek,
    kind: DeviceKind.GlucoseMeter,
  },
  {
    id: 'accuchek_guide_me',
    name: 'Accu-Chek Guide Me',
    brand: Brand.AccuChek,
    kind: DeviceKind.GlucoseMeter,
  },
  {
    id: 'accuchek_guide_active',
    name: 'Accu-Chek Active',
    brand: Brand.AccuChek,
    kind: DeviceKind.GlucoseMeter,
  },
  {
    id: 'contour_next_one',
    name: 'Contour Next One',
    brand: Brand.Contour,
    kind: DeviceKind.GlucoseMeter,
  },
  {
    id: 'beurer',
    name: 'Beurer Devices',
    brand: Brand.Beurer,
    kind: DeviceKind.BloodPressure,
  },
  {
    id: 'libre1',
    name: 'Freestyle Libre 1',
    brand: Brand.Libre,
    kind: DeviceKind.GlucoseMeter,
  },
];

export class VitalDevicesManager {
  init() {
    throw new Error('init() has not been implemented.');
  }

  scanForDevice(deviceModel: DeviceModel): EventEmitter {
    throw new Error('scanForDevice() has not been implemented.');
  }

  stopScan(): Promise<void> {
    throw new Error('stopScan() has not been implemented.');
  }

  pair(scannedDevice: ScannedDevice): EventEmitter {
    throw new Error('pair() has not been implemented.');
  }

  readGlucoseMeterData(scannedDevice: ScannedDevice): EventEmitter {
    throw new Error('readGlucoseMeterData() has not been implemented.');
  }

  readBloodPressureData(scannedDevice: ScannedDevice): EventEmitter {
    throw new Error('readBloodPressureData() has not been implemented.');
  }

  cleanUp(): Promise<void> {
    throw new Error('cleanUp() has not been implemented.');
  }

  devices: DeviceModel[] = supportedDevices;

  brands: Brand[] = [
    Brand.Omron,
    Brand.AccuChek,
    Brand.Contour,
    Brand.Beurer,
    Brand.Libre,
  ];
}
