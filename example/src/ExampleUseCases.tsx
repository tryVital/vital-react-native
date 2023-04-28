import { ProviderSlug, VitalCore } from "@tryvital/vital-core-react-native";
import { Brand, Cancellable, DeviceKind, ScannedDevice, VitalDevicesManager } from "@tryvital/vital-devices-react-native";
import { VitalHealth, VitalResource } from "@tryvital/vital-health-react-native";
import { Platform } from "react-native";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";

// VitalHealth example use case: Sync Activity data
export async function syncActivityData() {
    try {

        // [1] Request permissions for activity
        await VitalHealth.askForResources([VitalResource.Activity])

        console.log('Requested permissions for resources');

        // [2] Manually initiate a sync of activity data
        VitalHealth.syncData([VitalResource.Activity])

        console.log('Completed activity data sync');

    } catch (error) {
        console.log(error);
    }
}

// VitalDevice example use case: Read BLE Glucose meter
export async function readBLEGlucoseMeter(
    deviceManager: VitalDevicesManager
) {
    let glucoseDeviceModel = VitalDevicesManager.supportedDevices
        .find((model) => model.kind == DeviceKind.GlucoseMeter && model.brand == Brand.AccuChek);

    if (glucoseDeviceModel == undefined) {
        throw Error("@@@ [readBLEGlucoseMeter] Cannot find the BLE device model.");
    }

    await checkBluetoothPermissions()

    console.log("@@@ Start scanning for glucose device: " + glucoseDeviceModel.name)

    var scanner: Cancellable | null
    scanner = deviceManager.scanForDevice(glucoseDeviceModel, {
        onDiscovered: (device) => {
            console.log("@@@ Discovered glucose meter: " + device.name + " (id = " + device.id + ")")
            scanner?.cancel()

            readScannedGlucoseMeter(device, deviceManager)
        },
        onError: (error) => console.log(error)
    })
}

async function readScannedGlucoseMeter(
    device: ScannedDevice,
    deviceManager: VitalDevicesManager
) {
    console.log("@@@ Start pairing device: " + device.name + " (id = " + device.id + ")")

    await deviceManager.pairDevice(device.id)

    console.log("@@@ Successfully paired device: " + device.name + " (id = " + device.id + ")")

    console.log("@@@ Start reading from device: " + device.name + " (id = " + device.id + ")")

    let samples = await deviceManager.readGlucoseMeter(device.id)

    console.log("@@@ Read " + samples.length + " samples from device: " + device.name + " (id = " + device.id + ")")
    console.log(samples)

    if (Platform.OS == "ios") {
        await VitalCore.postTimeSeriesData(
            { "type": "glucose", "samples": samples },
            ProviderSlug.AccuchekBLE
        )
    }

    return samples
}

// VitalDevice example use case: Read BLE Blood Pressure meter
export async function readBLEBloodPressureMeter(
    deviceManager: VitalDevicesManager
) {
    let bpDeviceModel = VitalDevicesManager.supportedDevices
        .find((model) => model.kind == DeviceKind.BloodPressure && model.brand == Brand.Omron);

    if (bpDeviceModel == undefined) {
        throw Error("@@@ [readBLEBloodPressureMeter] Cannot find the BLE device model.");
    }

    await checkBluetoothPermissions()

    console.log("@@@ Start scanning for blood pressure device: " + bpDeviceModel.name)

    var scanner: Cancellable | null
    scanner = deviceManager.scanForDevice(bpDeviceModel, {
        onDiscovered: (device) => {
            console.log("@@@ Discovered blood pressure meter: " + device.name + " (id = " + device.id + ")")
            scanner?.cancel()

            readScannedBloodPressureMeter(device, deviceManager)
        },
        onError: (error) => console.log(error)
    })
}

async function readScannedBloodPressureMeter(
    device: ScannedDevice,
    deviceManager: VitalDevicesManager
) {
    // IMPORTANT:
    //
    // For Blood Pressure meters specifically, it is recommended to call
    // `deviceManager.readBloodPressure` directly. Pairing will happen automatically
    // as part of the reading process, if it has not already been done so.
    //
    // Use `deviceManager.pair` only if the intent is to work with the Pairing mode
    // of the Blood Pressure meter.
    console.log("@@@ Start reading from device: " + device.name + " (id = " + device.id + ")")

    let samples = await deviceManager.readBloodPressure(device.id)

    console.log("@@@ Read " + samples.length + " samples from device: " + device.name + " (id = " + device.id + ")")
    console.log(samples)

    if (Platform.OS == "ios") {
        await VitalCore.postTimeSeriesData(
            { "type": "blood_pressure", "samples": samples },
            ProviderSlug.OmronBLE
        )
    }

    return samples
}

async function checkBluetoothPermissions() {
    let statuses = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
    ])

    if (
    (statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === 'granted' &&
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === 'granted') ||
    statuses[PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL] === 'granted'
    ) {
        console.log("@@@ BLE permission granted: " + statuses)
    } else {
        throw Error("@@@ BLE permission not all granted; granted status = " + statuses)
    }
}