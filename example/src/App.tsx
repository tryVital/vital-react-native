import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import HomeScreen from './screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VitalClient} from '@tryvital/vital-node';
import {ConnectSource} from './screens/ConnectSource';
import {IconButton} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();

export const vitalClient = new VitalClient({
  environment: 'sandbox',
  api_key: 'sk_eu_S5LdXTS_CAtdFrkX9OYsiVq_jGHaIXtZyBPbBtPkzhA',
  region: 'eu',
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
