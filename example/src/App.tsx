/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';

import {VitalCore} from 'vital-core-react-native';
import {VitalHealth, VitalResource} from 'vital-health-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import HomeScreen from './screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VitalClient} from '@tryvital/vital-node';
import {ConnectSource} from './screens/ConnectScreen';
import {IconButton} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();

export const vitalClient = new VitalClient({
  environment: 'sandbox',
  api_key: 'sk_eu_S5LdXTS_CAtdFrkX9OYsiVq_jGHaIXtZyBPbBtPkzhA',
  region: 'eu',
});

VitalCore.configure(
  'sk_us_WUg9-SYEgl7Un20ppSpLTYi5hru_GPXurFlY7lHUfwA',
  'sandbox',
  'us',
  true,
).then(() => {
  VitalCore.setUserId('db5f35cd-e328-41e4-b545-ec97386468e2').then(() => {
    VitalHealth.configure(true, 30, true).then(() => {
      console.log('VitalHealth configured');
      VitalHealth.hasAskedForPermission(VitalResource.Steps)
        .then(() => {
          console.log('VitalHealth asked for resources');
        })
        .catch(error => {
          console.log(error);
        });
    });
  });
});

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
