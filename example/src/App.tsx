import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import HomeScreen from './screens/Home';
import UserNavigationBar from './components/Appbar';
import {action, createStore, StoreProvider} from 'easy-peasy';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VitalClient} from '@tryvital/vital-node';
import {ConnectSource} from './screens/ConnectSource';
import {Text} from 'native-base';
import {HStack, IconButton, Box} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

const AddIcon = () => (
  <IconButton icon={<Icon name={'plus-circle'} size={16} />} />
);

const Stack = createNativeStackNavigator();

export const vitalClient = new VitalClient({
  environment: 'sandbox',
  api_key: 'sk_eu_S5LdXTS_CAtdFrkX9OYsiVq_jGHaIXtZyBPbBtPkzhA',
  region: 'eu',
});

const userStore = createStore({
  users: [],
  isCreatingUser: false,
  addUsers: action((state, payload) => {
    // @ts-ignore
    state.users.push(payload);
  }),
  setIsCreatingUser: action((state, payload) => {
    // @ts-ignore
    state.isCreatingUser = payload;
  }),
});

const HomeTitle = props => {
  return <Text>Users</Text>;
};

const App = () => {
  return (
    <NativeBaseProvider>
      <StoreProvider store={userStore}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({navigation, route}) => ({
                  title: 'Users',
                  // Add a placeholder button without the `onPress` to avoid flicker
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
      </StoreProvider>
    </NativeBaseProvider>
  );
};

export default App;
