import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {IconButton, NativeBaseProvider} from 'native-base';
import HomeScreen from './screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VitalClient} from '@tryvital/vital-node';
import {ConnectSource} from './screens/ConnectScreen';
import Icon from 'react-native-vector-icons/Feather';
import {
  VitalDevicesEvents,
  VitalDevicesManager,
} from 'vital-devices-react-native/lib';
import {NativeEventEmitter} from 'react-native';
import {VitalDevicesNativeModule} from 'vital-devices-react-native';
import {VitalCore} from 'vital-core-react-native';
import {VitalHealth, VitalResource} from 'vital-health-react-native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';

export const VITAL_API_KEY = 'YOUR API KEY HERE';
export const VITAL_ENVIRONMENT = 'sandbox';
export const VITAL_REGION = 'us';
export const VITAL_USER_ID = 'db5f35cd-e328-41e4-b545-ec97386468e2';

// Configuring Vital client SDK for making API calls on client side
// Recommended way is to do this on the backend but for the sake of an example
// You can do it on the client side
export const vitalNodeClient = new VitalClient({
  environment: VITAL_ENVIRONMENT,
  api_key: VITAL_API_KEY,
  region: VITAL_REGION,
});

// Configuring Vital healthkit core SDK you can do this at any point in your app
// You can then set the user_id and data will start pushing up to the servers.
VitalCore.configure(VITAL_ENVIRONMENT, VITAL_API_KEY, VITAL_REGION, true).then(
  () => {
    VitalCore.setUserId(VITAL_USER_ID).then(() => {
      VitalHealth.configure(true, 30, true).then(() => {
        VitalHealth.hasAskedForPermission(VitalResource.Steps)
          .then(() => {
            console.log('VitalHealth asked for resources');
          })
          .catch(error => {
            console.log(error);
          });
      });
    });
  },
);

//To start getting events from the VitalDevicesManager you need to create an event emitter
const eventEmitter = new NativeEventEmitter(VitalDevicesNativeModule);

const vitalDevicesManager = new VitalDevicesManager();

// This is an example of how to listen to scan event from the VitalDevicesManager.
// To start scanning for devices you need to call the startScan method on the VitalDevicesManager.
// The same device can be scanned multiple times.
eventEmitter.addListener(VitalDevicesEvents.scanEvent, event => {
  console.log(VitalDevicesEvents.scanEvent, event);
  vitalDevicesManager.readingBloodPressure(event.id).then(() => {
    console.log('Started reading for ', event.id);
  });
});

// This is an example of how to listen to reading event from blood pressure device.
// To start reading from a device you need to call the readingBloodPressure method on the VitalDevicesManager.
eventEmitter.addListener(VitalDevicesEvents.bloodPressureReadEvent, event => {
  console.log(VitalDevicesEvents.bloodPressureReadEvent, event);
  event.samples.forEach(sample => {
    console.log(sample.diastolic);
    console.log(sample.systolic);
    console.log(sample.pulse);
  });

  // After you are done reading from the device you need to call the scan method
  // on the VitalDevicesManager to continuously receive reads.
  vitalDevicesManager.scanForDevice(omronM7).then(() => {
    console.log('repeat Scanning for device');
  });
});

let omronM7 = VitalDevicesManager.supportedDevices[1];
requestMultiple([
  PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
  PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
]).then(statuses => {
  if (
    statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === 'granted' &&
    statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === 'granted'
  ) {
    // This is an example of how to start scanning for an Omron M7 device.
    vitalDevicesManager.scanForDevice(omronM7).then(() => {
      console.log('Scanning for device');
    });
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
                title: 'Users',
                headerRight: () => (
                  <IconButton
                    p={0}
                    variant="ghost"
                    onPress={console.log}
                    icon={
                      <Icon
                        size={20}
                        name="plus-circle"
                        color="rgb(64,64,64)"
                      />
                    }
                  />
                ),
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
