import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, FlatList, SafeAreaView, Image, Alert} from 'react-native'; // Use FlatList for rendering the list
import {Context, getValueFor} from "../globalContext/globalContext";
import {get_bookings, delete_booking} from "../../apiRequests/profile";
import {styles} from "./style";
import {base_api_url} from "../../apiRequests/base";
import {useFocusEffect} from "@react-navigation/native";


export const OrdersScreen = () => {
    const globalContext = useContext(Context);
    const [bookingData, setBookingData] = useState([]);
    const { userObj } = globalContext;
    const [token, setToken] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const storedToken = await getValueFor('token');
                    console.log('stored token on OrdersScreen', storedToken);
                    setToken(storedToken);

                    const response = await get_bookings(userObj["id"], storedToken);
                    setBookingData(response.data);
                } catch (error) {
                    console.error('Error fetching token or bookings:', error);
                }
            };

            fetchData();
        }, [userObj])
    );

    const createTwoButtonAlert = (item) =>
        Alert.alert(`${item.place_name}`, `do you want to disable booking at ${new Date(item.booking_time_start).toLocaleTimeString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })}-${new Date(item.booking_time_end).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })}? for ${item.people_number}`, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel booking disabling'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => handleDelete(item.id) },
        ]);

    const handleDelete = (bookingId) => {
        delete_booking(bookingId, token)
            .then(() => {
                get_bookings(userObj["id"], token)
                    .then((response) => {
                        setBookingData(response.data);
                    })
                    .catch((error) => {
                        console.log('error');
                    });
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ alignSelf: 'center' }}>Your Orders</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={bookingData
                    .sort((a, b) => {
                        const timeDifferenceA = a.active && a.booking_time_end ? new Date(a.booking_time) - new Date() : Number.MAX_SAFE_INTEGER;
                        const timeDifferenceB = b.active && b.booking_time_end ? new Date(b.booking_time) - new Date() : Number.MAX_SAFE_INTEGER;

                        if (a.active !== b.active) {
                            // Sort active bookings above inactive ones
                            return a.active ? -1 : 1;
                        }

                        // Sort inactive bookings from oldest to newest
                        return timeDifferenceA - timeDifferenceB;
                    })
                }
                keyExtractor={(item) => item.id.toString()}
           renderItem={({item}) => (
                    item.active ? (
                            <View style={styles.orderContainer}>
                                <Image source={{uri: `http://${base_api_url}/media/${item.place_picture}`}}
                                       style={styles.image}/>
                                <View style={styles.orderDetailsContainer}>
                                    <Text style={styles.orderText}>{item.place_name}</Text>
                                    <Text style={styles.orderText}>people count: {item.people_number}</Text>
                                    <Text style={styles.orderText}>{new Date(item.booking_time_start).toLocaleTimeString([], {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}-{new Date(item.booking_time_end).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}</Text>
                                    <Text style={styles.orderText}>additional info: {item.additional_info}</Text>
                                </View>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => createTwoButtonAlert(item)}>
                                    <Text style={styles.deleteButtonText}>cancel a reservation</Text>
                                </TouchableOpacity>
                            </View>) :
                        <View style={styles.orderContainer}>
                            <Image source={{uri: `http://${base_api_url}/media/${item.place_picture}`}}
                                   style={styles.image}/>
                            <View style={styles.orderDetailsContainer}>
                                <Text style={styles.orderText}>{item.place_name}</Text>
                                <Text style={styles.orderText}>people count: {item.people_number}</Text>
                                <Text style={styles.orderText}>time start: {item.booking_time_start}</Text>
                                <Text style={styles.orderText}>time end: {item.booking_time_end}</Text>
                                <Text style={styles.orderText}>additional info: {item.additional_info}</Text>
                            </View>
                            <TouchableOpacity style={styles.deleteButtonNotActive}>
                                <Text style={styles.deleteButtonText}>reservation expired</Text>
                            </TouchableOpacity>
                        </View>
                )}
            />

        </SafeAreaView>
    );
};