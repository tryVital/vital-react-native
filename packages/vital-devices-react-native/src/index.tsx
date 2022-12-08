import { NativeEventEmitter, NativeModules } from 'react-native';
import type { DeviceModel } from './model/device_model';

let eventListener = new NativeEventEmitter(
  NativeModules.VitalDevicesReactNative
).addListener('ScanEvent', (event: any) => {
  console.log('happy', event);
});

export function scanForDevice(deviceModel: DeviceModel): void {
  console.log('scanForDevice react');

  console.log(NativeModules);
  console.log(NativeModules.VitalDevicesReactNative);
  console.log(eventListener);

  NativeModules.VitalDevicesReactNative.startScanForDevice(
    deviceModel.id,
    deviceModel.name,
    deviceModel.brand,
    deviceModel.kind
  );
}
