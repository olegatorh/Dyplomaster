import React, {useContext, useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './style';
import {Context, getValueFor} from '../globalContext/globalContext';
import {useNavigation} from '@react-navigation/native';
import {update_user_info} from '../../apiRequests/profile';
import * as SecureStore from "expo-secure-store";
import {DevSettings} from 'react-native';

export const SettingsScreen = (props) => {
    const globalContext = useContext(Context);
    const {userObj, setUserObj} = globalContext;
    const navigation = useNavigation();

    // State to track the edited values
    const [editedValues, setEditedValues] = useState({
        phoneNumber: userObj?.phone_number || '',
        username: userObj?.username || '',
        email: userObj?.email || '',
    });

    const [token, setToken] = useState(null);
    const isMounted = useRef(true);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await getValueFor('token');
                setToken(storedToken);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchToken();

        // Cleanup function to set isMounted to false when the component is unmounted
        return () => {
            isMounted.current = false;
        };
    }, []);

    const onPressLeave = async () => {
        setUserObj(null);
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('isLoggedIn');
        DevSettings.reload();


    };

    const onSaveChanges = () => {
        update_user_info({...userObj, ...editedValues, token}).then((response) => {
            console.log('response', response.data);
            alert('User info changed');
            if (isMounted.current) {
                setUserObj(response.data);
            }
        });
    };

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            {/* Editable fields */}
            <View style={styles.fieldContainer}>
                <Text>Phone Number:</Text>
                <TextInput
                    style={styles.input}
                    value={editedValues.phoneNumber}
                    onChangeText={(text) => setEditedValues({...editedValues, phoneNumber: text})}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text>Username:</Text>
                <TextInput
                    style={styles.input}
                    value={editedValues.username}
                    onChangeText={(text) => setEditedValues({...editedValues, username: text})}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={editedValues.email}
                    onChangeText={(text) => setEditedValues({...editedValues, email: text})}
                />
            </View>

            {/* Save changes button */}
            <TouchableOpacity onPress={onSaveChanges} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Save Changes</Text>
            </TouchableOpacity>

            {/* Leave button */}
            <TouchableOpacity onPress={onPressLeave} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Leave</Text>
            </TouchableOpacity>
        </View>
    );
};
