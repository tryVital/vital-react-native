import React from 'react';

import {VitalCore} from 'vital-core-react-native';
import {VitalHealth, VitalResource} from 'vital-health-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {IconButton, NativeBaseProvider} from 'native-base';
import HomeScreen from './screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VitalClient} from '@tryvital/vital-node';
import {ConnectSource} from './screens/ConnectScreen';
import Icon from 'react-native-vector-icons/Feather';
import {scanForDevice} from 'vital-devices-react-native/lib';
import {NativeEventEmitter, NativeModules} from 'react-native';

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
// VitalCore.configure(VITAL_ENVIRONMENT, VITAL_API_KEY, VITAL_REGION, true).then(
//   () => {
//     VitalCore.setUserId(VITAL_USER_ID).then(() => {
//       VitalHealth.configure(true, 30, true).then(() => {
//         VitalHealth.hasAskedForPermission(VitalResource.Steps)
//           .then(() => {
//             console.log('VitalHealth asked for resources');
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       });
//     });
//   },
// );

new NativeEventEmitter(NativeModules.VitalDevicesReactNative).addListener(
  'ScanEvent',
  (event: any) => {
    console.log('happy in example', event);
  },
);

console.log('vitalDevicesManager');
scanForDevice(
  {
    id: '1',
    name: 'Vital',
    brand: 'omron',
    kind: 'bloodPressure',
  },
  error => {
    console.log('happy', error);
  },
);

console.log('done');

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
