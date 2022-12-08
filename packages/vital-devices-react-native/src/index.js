import { DeviceKind } from './model/device_model';
import { Brand } from './model/brand';
export class VitalDevices {
    static scanForDevice() {
        return Promise.resolve();
    }
    static stopScanForDevice() {
        console.log('stopScanForDevice react');
    }
}
export const brands = [
    Brand.Omron,
    Brand.AccuChek,
    Brand.Contour,
    Brand.Beurer,
    Brand.Libre,
];
export const supportedDevices2 = [
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
