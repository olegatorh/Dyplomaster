import {Text, View} from 'react-native';
import {useContext, useEffect, useState} from "react";
import {Context} from "../globalContext/globalContext";
import {get_bookings} from "../../api_req/profile";


export const OrdersScreen = (props) => {
    const [bookingData, setBookingData] = useState([]);

    const globalContext = useContext(Context);
    const {userObj, token} = globalContext;
    useEffect(() => {

        get_bookings(userObj["id"], token).then((response) => {
            setBookingData(response.data)
        })
            .catch((error) => {
                console.log('error');
            });
    }, [])

    return (
        <>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {bookingData.map((booking) => (
                    <View key={booking['id']}>
                        <Text> {booking['place']}</Text>
                        <Text> {booking['booking_time']}</Text>
                        <Text> {booking['additional_info']}</Text>
                    </View>
                ))}

            </View>
        </>
    );
}