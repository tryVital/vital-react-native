import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import HomeScreen from './screens/Home';
import {action, createStore, StoreProvider} from 'easy-peasy';
import UserNavigationBar from './components/Appbar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VitalClient} from '@tryvital/vital-node';

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

const App = () => {
  return (
    <PaperProvider>
      <StoreProvider store={userStore}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: UserNavigationBar,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </PaperProvider>
  );
};

export default App;
