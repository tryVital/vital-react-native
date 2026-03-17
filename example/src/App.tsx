import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VitalClient, VitalEnvironment } from '@tryvital/vital-node';
import HomeScreen from './screens/HomeScreen';
import { ConnectSource } from './screens/ConnectScreen';
import { UserScreen } from './screens/UserScreen';
import { VitalHealth } from '@tryvital/vital-health-react-native';
// import { VitalDevicesManager } from '@tryvital/vital-devices-react-native';
import { VITAL_API_KEY, VITAL_ENVIRONMENT, VITAL_REGION } from './Environment';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import {
//   readBLEGlucoseMeter,
//   readBLEBloodPressureMeter,
//   inspectUserConnectedSources,
//   readLibre1,
// } from './ExampleUseCases';

// Configuring Vital client SDK for making API calls on client side
// Recommended way is to do this on the backend but for the sake of an example
// You can do it on the client side
export const vitalNodeClient = new VitalClient({
  environment: (function () {
    switch (VITAL_ENVIRONMENT) {
      case 'dev':
        return VITAL_REGION === 'us'
          ? 'https://api.dev.tryvital.io'
          : 'https://api.dev.eu.tryvital.io';
      case 'sandbox':
        return (
          VITAL_REGION === 'us'
            ? 'https://api.sandbox.tryvital.io'
            : 'https://api.sandbox.eu.tryvital.io'
        ) satisfies VitalEnvironment;
      case 'production':
        return (
          VITAL_REGION === 'us'
            ? 'https://api.tryvital.io'
            : 'https://api.sandbox.eu.tryvital.io'
        ) satisfies VitalEnvironment;
    }
  })(),
  apiKey: VITAL_API_KEY,
});

// const vitalDevicesManager = new VitalDevicesManager();

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
            title: 'Users',
          })}
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={() => ({ title: 'User' })}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="ConnectSource"
          component={ConnectSource}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    const initialize = async () => {
      console.log('Starting to initialize App');

      const isHealthSDKAvailable = await VitalHealth.isAvailable();
      console.log(`HealthKit/HealthConnect available: ${isHealthSDKAvailable}`);

      // Example: Read BLE Glucose Meter
      // await readBLEGlucoseMeter(vitalDevicesManager)

      // Example: Read Freestyle Libre 1 via NFC
      // await readLibre1(vitalDevicesManager)

      // Example: Read BLE Blood Pressure
      // await readBLEBloodPressureMeter(vitalDevicesManager)
    };

    initialize();

    return () => {};
  });

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <AppStack />
        </SafeAreaProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
