import {useContext} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../home/home'
import {LoginScreen} from '../login/login';
import {RegistrationScreen} from '../registration/registration';
import {SettingsScreen} from '../settings/settings';
import {Context} from '../globalContext/globalContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {OrdersScreen} from "../orders/orders";
import {DetailsScreen} from "../home/DetailsScreeen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Navigation = (props) => {

    const globalContext = useContext(Context)
    const {isLoggedIn, userObj} = globalContext;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({ route }) => ({ title: route.params.name })}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ title: 'Registration' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};



const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Places"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor }) => (
            <Icon name="fast-food" color={tintColor} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor }) => (
            <Icon name="receipt" color={tintColor} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor }) => (
            <Icon name="person" color={tintColor} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};