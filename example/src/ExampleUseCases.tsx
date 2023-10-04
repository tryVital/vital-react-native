import { ManualProviderSlug, VitalCore } from "@tryvital/vital-core-react-native";
import { Brand, Cancellable, DeviceKind, ScannedDevice, VitalDevicesManager } from "@tryvital/vital-devices-react-native";
import { VitalHealth, VitalResource } from "@tryvital/vital-health-react-native";
import { Platform } from "react-native";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";

// VitalCore example use case: Inspect user connected sources
export async function inspectUserConnectedSources() {
    await VitalCore.createConnectedSourceIfNotExist(ManualProviderSlug.LibreBLE)

    var sources = await VitalCore.userConnectedSources()
    console.log("sources =", sources)

    console.log(
        "hasConnectedTo[freestyle_libre_ble] =",
        await VitalCore.hasUserConnectedTo(ManualProviderSlug.LibreBLE)
    )
    console.log(
        "hasConnectedTo[omron_ble] =",
        await VitalCore.hasUserConnectedTo(ManualProviderSlug.OmronBLE)
    )
    console.log(
        "hasConnectedTo[apple_health_kit] =",
        await VitalCore.hasUserConnectedTo(ManualProviderSlug.AppleHealthKit)
    )
    console.log(
        "hasConnectedTo[health_connect] =",
        await VitalCore.hasUserConnectedTo(ManualProviderSlug.HealthConnect)
    )
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

    await VitalCore.createConnectedSourceIfNotExist(ManualProviderSlug.AccuchekBLE)
    await VitalCore.postTimeSeriesData(
        { "type": "glucose", "samples": samples },
        ManualProviderSlug.AccuchekBLE
    )

    return samples
}

// VitalDevice example use case: Read BLE Glucose meter
export async function readLibre1(
    deviceManager: VitalDevicesManager
) {
    // NOTE: Your Android app manifest should have requested NFC permissions:
    // <uses-permission android:name="android.permission.NFC" />

    console.log("@@@ Start scanning for Libre1")

    let result = await deviceManager.readLibre1("reading", "errored", "completed")
    console.log(`@@@ Did read Libre1: ${JSON.stringify(result, null, 2)}`)

    await VitalCore.createConnectedSourceIfNotExist(ManualProviderSlug.LibreBLE)
    await VitalCore.postTimeSeriesData(
        { "type": "glucose", "samples": result.samples },
        ManualProviderSlug.LibreBLE
    )

    console.log("@@@ Did post Libre1 timeseries data")
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

    await VitalCore.createConnectedSourceIfNotExist(ManualProviderSlug.OmronBLE)
    await VitalCore.postTimeSeriesData(
        { "type": "blood_pressure", "samples": samples },
        ManualProviderSlug.OmronBLE
    )

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
