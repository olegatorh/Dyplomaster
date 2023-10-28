import {Text, View} from 'react-native';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Context} from "../globalContext/globalContext";
import * as SecureStore from 'expo-secure-store';


export const OrdersScreen = (props) => {
    const [bookingData, setBookingData] = useState([]);

    const globalContext = useContext(Context);
    const {userObj} = globalContext;
    const {token} = globalContext;
    const headers = {"Authorization": `Token ${token}`}
    useEffect(() => {

        axios.get(`http://192.168.88.209:8000/api/places/bookings/${userObj['id']}`, {headers}).then((response) => {
            setBookingData(response.data)
        })
            .catch((error) => {
                console.log('error');
            });
    }, [])

    return (
        <>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {bookingData .map((booking) => (
                <View key={booking['booking_time']}>
                    <Text> {booking['place']}</Text>
                    <Text> {booking['booking_time']}</Text>
                    <Text> {booking['additional_info']}</Text>
                </View>
            ))}

            </View>
        </>
    );
}