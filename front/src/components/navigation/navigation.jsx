import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../home/SearchPage';
import { LoginScreen } from '../login/login';
import { RegistrationScreen } from '../registration/registration';
import { SettingsScreen } from '../settings/settings';
import { Context, getValueFor, saveInfo } from '../globalContext/globalContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { OrdersScreen } from "../orders/orders";
import { DetailsScreen } from "../home/placeDetails/DetailsScreeen";
import { get_user_info } from "../../apiRequests/profile";
import { refresh_token } from "../../apiRequests/auth";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Navigation = (props) => {
    const globalContext = useContext(Context);
    const { setUserObj } = globalContext;
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // New state for loading

    const updateLoginStatus = async () => {
        const isLoggedInValue = await getValueFor('isLoggedIn');
        setIsLoggedIn(isLoggedInValue === 'true');
        setIsLoading(false); // Set loading to false once login status is determined
    };

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = await getValueFor('token');

            if (storedToken) {
                try {
                    const response = await get_user_info(storedToken);
                    setUserObj(response.data['user_info']);
                    await updateLoginStatus();
                } catch (error) {
                    console.error('Token is invalid. Refreshing...');
                    try {
                        const response = await refresh_token(storedToken);
                        console.log('refresh response', response);
                        saveInfo('token', response.data['token']);
                        await updateLoginStatus();
                    } catch (refreshError) {
                        console.error('Unable to refresh token. User needs to log in again.');
                        setIsLoggedIn(false);
                        setIsLoading(false); // Set loading to false if there's an error
                    }
                }
            } else {
                setIsLoading(false); // Set loading to false if there's no stored token
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

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
                        options={{ title: 'Login', headerShown: false }}
                        
                    />
                    <Stack.Screen
                        name="Registration"
                        component={RegistrationScreen}
                        options={{ title: 'Реєстрація', headerShown: false }}
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
                name="Заклади"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="fast-food" color={tintColor} size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Замовлення"
                component={OrdersScreen}
                options={{
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="receipt" color={tintColor} size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Профіль"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="person" color={tintColor} size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
