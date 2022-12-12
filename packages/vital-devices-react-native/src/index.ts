import type { DeviceModel } from './model/device_model';
import { NativeModules, Platform } from 'react-native';
import { checkMultiple, PERMISSIONS } from 'react-native-permissions';
import { Brand } from './model/brand';
import { DeviceKind } from './model/device_model';

const LINKING_ERROR =
  `The package 'vital-core-react-native' doesn't seem to be linked. Make sure: \n\n` +
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

export const VitalDevicesNativeModule = VitalDevicesReactNative;

export const VitalDevicesEvents = {
  scanEvent: VitalDevicesNativeModule.ScanEvent,
  pairEvent: VitalDevicesNativeModule.PairEvent,
  glucoseMeterReadEvent: VitalDevicesNativeModule.GlucoseMeterReadEvent,
  bloodPressureReadEvent: VitalDevicesNativeModule.BloodPressureReadEvent,
};

export class VitalDevicesManager {
  async scanForDevice(deviceModel: DeviceModel) {
    await this.checkPermission();

    return NativeModules.VitalDevicesReactNative.startScanForDevice(
      deviceModel.id,
      deviceModel.name,
      deviceModel.brand,
      deviceModel.kind
    );
  }

  async stopScan() {
    return NativeModules.VitalDevicesReactNative.stopScanForDevice();
  }

  async pairDevice(scannedDeviceId: string) {
    await this.checkPermission();

    return NativeModules.VitalDevicesReactNative.pair(scannedDeviceId);
  }

  async readBloodPressure(scannedDeviceId: string) {
    await this.checkPermission();

    return NativeModules.VitalDevicesReactNative.startReadingBloodPressure(
      scannedDeviceId
    );
  }

  async readGlucoseMeter(scannedDeviceId: string) {
    await this.checkPermission();

    return NativeModules.VitalDevicesReactNative.startReadingGlucoseMeter(
      scannedDeviceId
    );
  }

  private async checkPermission() {
    const result = await checkMultiple([
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    ]);

    if (result[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] !== 'granted') {
      throw new Error('Bluetooth scan permission is not granted');
    }

    if (result[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] !== 'granted') {
      throw new Error('Bluetooth connect permission is not granted');
    }
  }

  static brands = [
    Brand.Omron,
    Brand.AccuChek,
    Brand.Contour,
    Brand.Beurer,
    Brand.Libre,
  ];

  static supportedDevices = [
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
}
