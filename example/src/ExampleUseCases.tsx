import { Brand, Cancellable, DeviceKind, DeviceModel, VitalDevicesManager } from "@tryvital/vital-devices-react-native";
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

    let bleSimulator: DeviceModel = {
        id: (Platform.OS == "ios" ? '$vital_ble_simulator$' : '_vital_ble_simulator_'),
        name: 'Vital BLE Simulator',
        brand: Brand.AccuChek,
        kind: DeviceKind.GlucoseMeter,
    };
    
    let statuses = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
    ])

    console.log(statuses);

    if (
    (statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === 'granted' &&
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === 'granted') ||
    statuses[PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL] === 'granted'
    ) {
        console.log("@@@ Start scanning for device type: " + bleSimulator.name)
    } else {
        console.log("@@@ BLE permission not granted.")
    }
    
    var scanner: Cancellable | null
    scanner = deviceManager.scanForDevice(
        bleSimulator,
        {
        onDiscovered: (device) => {
            console.log("@@@ Discovered device: " + device.name + " (id = " + device.id + ")")
            scanner?.cancel()

            console.log("@@@ Start pairing device: " + device.name + " (id = " + device.id + ")")
            deviceManager.pairDevice(device.id)
            .then(() => {
                console.log("@@@ Successfully paired device: " + device.name + " (id = " + device.id + ")")
                console.log("@@@ Start reading from device: " + device.name + " (id = " + device.id + ")")

                return deviceManager.readGlucoseMeter(device.id)
            })
            .then((samples) => {
                console.log("@@@ Read " + samples.length + " samples from device: " + device.name + " (id = " + device.id + ")")
                console.log(samples)
            })
            .catch((error) => console.log(error))
        },
        onError: (error) => console.log(error)
        }
    )
}