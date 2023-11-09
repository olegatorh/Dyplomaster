import React, {useContext, useEffect, useState} from "react";
import styles from "./style";
import {View} from "react-native";
import {SearchBar} from "./SearchBar";
import {RenderResult} from "./RenderResult";
import {get_places} from "../../apiRequests/places";
import {Context} from "../globalContext/globalContext";
import {useFocusEffect} from "@react-navigation/native";
import {get_bookings_all} from "../../apiRequests/profile";
import {calculate_available_seats_now} from "./calculate_available_seats";


export const HomeScreen = (props) => {
    const [results, setResults] = useState([])
    // const [bookings, setBookings] = useState([])
    const globalContext = useContext(Context);
    const {token} = globalContext;
    useFocusEffect(
        React.useCallback(() => {
            Promise.all([
                get_bookings_all(token),
                get_places(token)
            ]).then(([bookingsResponse, placesResponse]) => {
                setResults(calculate_available_seats_now(bookingsResponse.data, placesResponse.data));
            }).catch((error) => {
                console.log(error);
            });
        }, [])
    );


    return (
        <View style={styles.containerView}>
            <SearchBar setResults={setResults}/>
            <RenderResult results={results}/>
        </View>
    );
}

