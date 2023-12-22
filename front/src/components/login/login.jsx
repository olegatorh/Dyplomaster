import React, {useContext, useState} from 'react';
import styles from "./style";
import {useNavigation} from '@react-navigation/native';
import {
    DevSettings,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Image,
} from "react-native";
import {Button} from "react-native-elements";
import {Context, saveInfo} from '../globalContext/globalContext';
import {login} from "../../apiRequests/auth";


export const LoginScreen = () => {

    const navigation = useNavigation()
    const globalContext = useContext(Context);
    const {setUserObj} = globalContext;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onLoginPress = () => {
        login(email, password)
            .then((response) => {
                setUserObj(response.data['user_info']);
                saveInfo('token', response.data['token']);
                saveInfo('isLoggedIn', 'true');
                DevSettings.reload();
            })
            .catch((error) => {
                alert('Неправильний e-mail або пароль');
            });
    };


    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Image style = {styles.logoImage} source={require('../img/logo.jpg')}></Image>
                        <Text style={styles.logoText}>Ласкаво просимо</Text>
                        <TextInput
                            placeholder="Введіть e-mail"
                            keyboardType='email-address'
                            placeholderColor="#c4c3cb"
                            onChangeText={text => setEmail(text)}
                            value={email}
                            style={styles.loginFormTextInput}
                        />
                        <TextInput
                            placeholder="Введіть пароль"
                            placeholderColor="#c4c3cb"
                            onChangeText={text => setPassword(text)}
                            style={styles.loginFormTextInput}
                            secureTextEntry={true}
                        />
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={() => onLoginPress()}
                            title="Увійти"
                        />
                        <Button
                            titleStyle={{color: '#3897f1'}}
                            buttonStyle={styles.RegisterButton}
                            onPress={() => navigation.navigate('Registration')}
                            title="Створити новий обліковий запис"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}