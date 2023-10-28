import React, {useContext, useState} from 'react';
import styles from "./style";
import {useNavigation} from '@react-navigation/native';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {Button, SocialIcon} from "react-native-elements";
import axios from 'axios';
import {Application} from 'expo';
import {Context} from '../globalContext/globalContext';


export const LoginScreen = ({props}) => {

    const navigation = useNavigation()
    const globalContext = useContext(Context);
    const {setIsLoggedIn, userObj, setUserObj, setToken} = globalContext;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (email, password) => {
        axios
            .post('http://192.168.88.209:8000/api/users/login/', {email, password})
            .then((response) => {
                setUserObj(response.data['user_info'])
                setToken(response.data['token'])
                setIsLoggedIn(true)
            })
            .catch((error) => {
                alert('wrong credentials');
                console.log(error.response.data);
            });
    };


    const onLoginPress = () => {
        login(email, password);
    }

    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Text style={styles.logoText}>Welcome again</Text>
                        <TextInput
                            placeholder="Email or phone number"
                            placeholderColor="#c4c3cb"
                            onChangeText={text => setEmail(text)}
                            value={email}
                            style={styles.loginFormTextInput}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderColor="#c4c3cb"
                            onChangeText={text => setPassword(text)}
                            style={styles.loginFormTextInput}
                            secureTextEntry={true}
                        />
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={() => onLoginPress()}
                            title="Login"
                        />
                        <Button
                            titleStyle={{color: '#000000'}}
                            buttonStyle={styles.RegisterButton}
                            onPress={() => navigation.navigate('Registration')}
                            title="Create your account ->"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}