import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VitalClient} from '@tryvital/vital-node';
import HomeScreen from './screens/HomeScreen';
import {ConnectSource} from './screens/ConnectScreen';
import {
  VitalHealth,
  VitalHealthEvents,
  VitalHealthReactNativeModule,
} from '@tryvital/vital-health-react-native';
import {
  VitalDevicesManager,
} from '@tryvital/vital-devices-react-native';
import {NativeEventEmitter} from 'react-native';
import {VITAL_API_KEY, VITAL_ENVIRONMENT, VITAL_REGION} from './Environment';
import {syncActivityData, readBLEGlucoseMeter, readBLEBloodPressureMeter, inspectUserConnectedSources} from './ExampleUseCases';
import { initializeVitalSDK } from './Initialization';

// Configuring Vital client SDK for making API calls on client side
// Recommended way is to do this on the backend but for the sake of an example
// You can do it on the client side
export const vitalNodeClient = new VitalClient({
  environment: VITAL_ENVIRONMENT,
  api_key: VITAL_API_KEY,
  region: VITAL_REGION,
});


const healthEventEmitter = new NativeEventEmitter(VitalHealthReactNativeModule);

healthEventEmitter.addListener(VitalHealthEvents.statusEvent, (event: any) => {
  console.log(VitalHealthEvents.statusEvent, event);
});

const vitalDevicesManager = new VitalDevicesManager((module) => new NativeEventEmitter(module));

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const initialize = async () => {
      console.log("Starting to initialize App")

      await initializeVitalSDK()

      // Example: Inspect user connected sources
      await inspectUserConnectedSources()

      // Example: Sync Activity Data
      await syncActivityData()

      // Example: Read BLE Glucose Meter
      await readBLEGlucoseMeter(vitalDevicesManager)

      // Example: Read BLE Blood Pressure
      // await readBLEBloodPressureMeter(vitalDevicesManager)
    }

    initialize()

    return () => {
      VitalHealth.cleanUp().then(() =>  {
        console.log("VitalHealth SDK cleanup")
      })
    }
  })

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
