import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VitalClient} from '@tryvital/vital-node';
import HomeScreen from './screens/HomeScreen';
import {ConnectSource} from './screens/ConnectScreen';
import {
  VitalHealth,
  VitalHealthEvents,
  VitalHealthReactNativeModule,
  VitalResource,
} from '@tryvital/vital-health-react-native';
import {
  Brand,
  Cancellable,
  DeviceKind,
  DeviceModel,
  VitalDevicesManager,
} from '@tryvital/vital-devices-react-native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
import {HealthConfig} from '@tryvital/vital-health-react-native';
import {VITAL_API_KEY, VITAL_ENVIRONMENT, VITAL_REGION, VITAL_USER_ID} from './Environment';

import styles from './Styles';

const { VitalDevicesReactNative } = NativeModules;

// Configuring Vital client SDK for making API calls on client side
// Recommended way is to do this on the backend but for the sake of an example
// You can do it on the client side
export const vitalNodeClient = new VitalClient({
  environment: VITAL_ENVIRONMENT,
  api_key: VITAL_API_KEY,
  region: VITAL_REGION,
});

// Configuring Vital health SDK you can do this at any point in your app
// You can then set the user_id and data will start pushing up to the servers.
VitalHealth.configureClient(
  VITAL_API_KEY,
  VITAL_ENVIRONMENT,
  VITAL_REGION,
  true,
).then(() => {
  console.log('VitalHealth configured client');
  VitalHealth.configure(new HealthConfig()).then(() => {
    console.log('VitalHealth configured');
    VitalHealth.setUserId(VITAL_USER_ID)
      .then(() => {
        console.log('VitalHealth setUserId');
        VitalHealth.askForResources([VitalResource.Steps])
          .then(() => {
            console.log('VitalHealth asked for resources');
            VitalHealth.syncData([VitalResource.Steps])
              .then(() => {
                console.log('VitalHealth synced data');
              })
              .catch((error: any) => {
                console.log(error);
              });
          })
          .catch((error: any) => {
            console.log(error);
          });
      })
      .catch((error: any) => {
        console.log(error);
      });
  });
});

const healthEventEmitter = new NativeEventEmitter(VitalHealthReactNativeModule);

healthEventEmitter.addListener(VitalHealthEvents.statusEvent, (event: any) => {
  console.log(VitalHealthEvents.statusEvent, event);
});

const vitalDevicesManager = new VitalDevicesManager((module) => new NativeEventEmitter(module));

let bleSimulator: DeviceModel = {
  id: (Platform.OS == "ios" ? '$vital_ble_simulator$' : '_vital_ble_simulator_'),
  name: 'Vital BLE Simulator',
  brand: Brand.AccuChek,
  kind: DeviceKind.GlucoseMeter,
};

requestMultiple([
  PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
  PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
]).then(statuses => {
  console.log(statuses);
  if (
    (statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === 'granted' &&
      statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === 'granted') ||
    statuses[PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL] === 'granted'
  ) {
    console.log("@@@ Start scanning for device type: " + bleSimulator.name)

    var scanner: Cancellable | null
    scanner = vitalDevicesManager.scanForDevice(
      bleSimulator,
      {
        onDiscovered: (device) => {
          console.log("@@@ Discovered device: " + device.name + " (id = " + device.id + ")")
          scanner?.cancel()

          console.log("@@@ Start pairing device: " + device.name + " (id = " + device.id + ")")
          vitalDevicesManager.pairDevice(device.id)
            .then(() => {
              console.log("@@@ Successfully paired device: " + device.name + " (id = " + device.id + ")")
              console.log("@@@ Start reading from device: " + device.name + " (id = " + device.id + ")")

              return vitalDevicesManager.readGlucoseMeter(device.id)
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
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={() => ({
                title: 'Users'
              })}
            />
          </Stack.Group>

          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name="ConnectSource"
              component={ConnectSource}
              options={{headerShown: false}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
