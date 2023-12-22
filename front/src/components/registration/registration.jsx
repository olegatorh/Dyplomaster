import React, {useState} from 'react';
import styles from "./style";
import {useNavigation} from '@react-navigation/native';
import {
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {Button} from "react-native-elements";
import {registration} from "../../apiRequests/auth";


export const RegistrationScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone_number, setPhoneNum] = useState('');

    const navigation = useNavigation()


    const onRegPress = () => {
        registration(email, password, username, phone_number).then((response) => {
            alert('Реєстрація успішна');
            navigation.navigate('Login')
        })
            .catch((error) => {
//                                     alert('wrong credentials');
                alert(JSON.stringify(error.response.data));
                console.log('error');
            });
    };

    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                    <Text style={styles.logoText}>Реєстрація</Text>
                        <TextInput
                            placeholder="Номер телефону"
                            placeholderColor="#c4c3cb"
                            keyboardType='phone-pad'
                            style={styles.loginFormTextInput}
                            onChangeText={text => setPhoneNum(text)}
                            value={phone_number}
                        />
                        <TextInput
                            placeholder="E-mail"
                            placeholderColor="#c4c3cb"
                            keyboardType='email-address'
                            style={styles.loginFormTextInput}
                            onChangeText={text => setEmail(text)}
                            value={email}
                        />
                        <TextInput
                            placeholder="Ім'я користувача"
                            placeholderColor="#c4c3cb"
                            onChangeText={text => setUsername(text)}
                            value={username}
                            style={styles.loginFormTextInput}
                        />
                        <TextInput
                            placeholder="Пароль"
                            placeholderColor="#c4c3cb"
                            style={styles.loginFormTextInput}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                        />
                        <Button
                            buttonStyle={styles.RegButton}
                            onPress={() => onRegPress()}
                            title="Зареєструватись"
                        />
                        <Button
                            titleStyle={{color: '#3897f1'}}
                            buttonStyle={styles.LoginButton}
                            onPress={() => navigation.navigate('Login')}
                            title="Вже маєте обліковий запис? Увійти"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

