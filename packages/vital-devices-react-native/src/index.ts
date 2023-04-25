import type { DeviceModel } from './model/device_model';
import { DeviceKind } from './model/device_model';
import { Brand } from './model/brand';
import { NativeEventEmitter, NativeModule, NativeModules, Platform } from 'react-native';
import { checkMultiple, PERMISSIONS } from 'react-native-permissions';

import type { BloodPressureSample, QuantitySample } from '@tryvital/vital-core-react-native';
import type { ScannedDevice } from './model/scanned_device';

export * from './model/device_model';
export * from './model/brand';
export * from './model/scanned_device';

const VitalDevicesEvents = {
  scanEvent: 'ScanEvent'
};

export class Cancellable {
  private hasCancelled: Boolean = false
  private onCancel: () => void

  constructor(onCancel: () => void) {
    this.onCancel = onCancel
  }

  cancel() {
    if (this.hasCancelled) {
      return
    }

    this.hasCancelled = true
    this.onCancel()
  }
}

export class VitalDevicesManager {
  eventEmitter: NativeEventEmitter
  
  constructor(eventEmitter: (module: NativeModule) => NativeEventEmitter) {
    this.eventEmitter = eventEmitter(NativeModules.VitalDevicesReactNative)
  }

  scanForDevice(deviceModel: DeviceModel, listener: { onDiscovered: (device: ScannedDevice) => void, onError: (error: Error) => void }): Cancellable {
    var subscription = this.eventEmitter.addListener(VitalDevicesEvents.scanEvent, (event) => {
      listener.onDiscovered(
        {
          id: event.id,
          name: event.name,
          deviceModel: event.deviceModel as DeviceModel
        }
      )
    })

    const cancellable = new Cancellable(
      () => {
        subscription.remove()
        NativeModules.VitalDevicesReactNative.stopScanForDevice();
      }
    );

    this.checkPermission()
    .then(() => {
      NativeModules.VitalDevicesReactNative.startScanForDevice(
        deviceModel.id,
        deviceModel.name,
        deviceModel.brand,
        deviceModel.kind
      );
    })
    .catch((error) => {
      listener.onError(new Error(error.toString()))
      cancellable.cancel()
    });

    return cancellable;
  }

  async pairDevice(scannedDeviceId: string): Promise<void> {
    await this.checkPermission();
    return await NativeModules.VitalDevicesReactNative.pair(scannedDeviceId);
  }

  async readBloodPressure(scannedDeviceId: string): Promise<BloodPressureSample[]> {
    await this.checkPermission();
    let response: { samples: BloodPressureSample[] } = await NativeModules.VitalDevicesReactNative
      .readBloodPressure(scannedDeviceId)
    return response.samples.map(fix_blood_pressure_sample)
  }

  async readGlucoseMeter(scannedDeviceId: string): Promise<QuantitySample[]> {
    await this.checkPermission();
    let response : { samples: QuantitySample[] } = await NativeModules.VitalDevicesReactNative
      .readGlucoseMeter(scannedDeviceId)
    return response.samples.map(fix_quantity_sample)
  }

  private async checkPermission() {
    if (Platform.OS === 'ios') {
      const result = await checkMultiple([
        PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
      ]);

      if (result[PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL] !== 'granted') {
        throw new Error(
          'Bluetooth permission is not granted. Please check your settings.'
        );
      }
    } else {
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
  }

  static brands = [
    Brand.Omron,
    Brand.AccuChek,
    Brand.Contour,
    Brand.Beurer,
    Brand.Libre,
  ];

  static supportedDevices: DeviceModel[] = [
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

function fix_blood_pressure_sample(sample: BloodPressureSample): BloodPressureSample {
  sample.systolic = fix_quantity_sample(sample.systolic)
  sample.diastolic = fix_quantity_sample(sample.diastolic)
  sample.pulse = sample.pulse != null ? fix_quantity_sample(sample.pulse) : null
  return sample
}

function fix_quantity_sample(sample: QuantitySample): QuantitySample {
  // Android & iOS: epoch milliseconds in double
  // Convert to JS Date
  if (typeof sample.startDate !== 'number' || typeof sample.endDate !== 'number') {
    throw Error("vital-device native bridge: Expected number for Date. Found " + typeof sample.startDate)
  }
  sample.startDate = new Date(sample.startDate)
  sample.endDate = new Date(sample.endDate)
  return sample
}
