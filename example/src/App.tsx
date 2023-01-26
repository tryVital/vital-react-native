import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Icon, IconButton, NativeBaseProvider} from 'native-base';
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
  VitalDevicesEvents,
  VitalDevicesManager,
  VitalDevicesNativeModule,
} from '@tryvital/vital-devices-react-native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {NativeEventEmitter} from 'react-native';
import {HealthConfig} from '@tryvital/vital-health-react-native/lib/health_config';

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

//To start getting events from the VitalDevicesManager you need to create an event emitter
const devicesEventEmitter = new NativeEventEmitter(VitalDevicesNativeModule);

const vitalDevicesManager = new VitalDevicesManager();

// This is an example of how to listen to scan event from the VitalDevicesManager.
// To start scanning for devices you need to call the startScan method on the VitalDevicesManager.
// The same device can be scanned multiple times.
devicesEventEmitter.addListener(VitalDevicesEvents.scanEvent, event => {
  console.log(VitalDevicesEvents.scanEvent, event);
  console.log('Scanned device', event.id);
  vitalDevicesManager
    .readBloodPressure(event.id)
    .then(() => {
      console.log('Started reading for ', event.id);
    })
    .catch((error: any) => {
      console.log(error);
    });
});

// This is an example of how to listen to reading event from blood pressure device.
// To start reading from a device you need to call the readingBloodPressure method on the VitalDevicesManager.
devicesEventEmitter.addListener(
  VitalDevicesEvents.bloodPressureReadEvent,
  (event: any) => {
    console.log(VitalDevicesEvents.bloodPressureReadEvent, event);
    event.samples.forEach((sample: any) => {
      console.log(sample.diastolic);
      console.log(sample.systolic);
      console.log(sample.pulse);
    });

    // After you are done reading from the device you need to call the scan method
    // on the VitalDevicesManager to continuously receive reads.
    vitalDevicesManager
      .scanForDevice(omronM7)
      .then(() => {
        console.log('repeat Scanning for device');
      })
      .catch((error: any) => {
        console.log(error);
      });
  },
);

let omronM7 = VitalDevicesManager.supportedDevices[1];
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
    // This is an example of how to start scanning for an Omron M7 device.
    vitalDevicesManager
      .scanForDevice(omronM7)
      .then(() => {
        console.log('Scanning for device');
      })
      .catch((error: any) => {
        console.log(error);
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
