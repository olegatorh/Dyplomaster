import React, { useContext, useState } from 'react';
import styles from "./style";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, SocialIcon } from "react-native-elements";


export const RegistrationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone_number, setPhoneNum] = useState('');

  const navigation = useNavigation()

  const registration = (email, password, username, phone_number) => {
    axios.post('http://192.168.88.254:8000/api/users/register/', { email, password, username, phone_number }).then((response) => {
                                            alert('registration success!!');
                                            navigation.navigate('Login')
                                  })
                                  .catch((error) => {
//                                     alert('wrong credentials');
                                    alert(JSON.stringify(error.response.data));
                                    console.log('error');
                                  });
                              };

  const onRegPress = () => {
    registration(email, password, username, phone_number)
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Registration Form</Text>
            <TextInput
              placeholder="Phone number"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
                            onChangeText={text => setPhoneNum(text)}
                                    value={phone_number}
            />
            <TextInput
              placeholder="Email"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
                            onChangeText={text => setEmail(text)}
                                    value={email}
            />
            <TextInput
              placeholder="Username"
              placeholderColor="#c4c3cb"
                            onChangeText={text => setUsername(text)}
                                    value={username}
              style={styles.loginFormTextInput}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
                            onChangeText={text => setPassword(text)}
                                    value={password}
              secureTextEntry={true}
            />
            <Button
              buttonStyle={styles.RegButton}
              onPress={() => onRegPress()}
              title="Register"
            />
                                  <Button
                                      titleStyle={{ color: '#000000' }}
                                              buttonStyle={styles.LoginButton}
                                              onPress={() => navigation.navigate('Login')}
                                              title="Already has account? ->"
                                  />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
