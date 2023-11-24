import React, {useContext, useEffect, useState} from "react";
import styles from "./style";
import {View} from "react-native";
import {SearchBar} from "./SearchBar";
import {RenderResult} from "./RenderResult";
import {get_places} from "../../apiRequests/places";
import {Context, getValueFor} from "../globalContext/globalContext";
import {useFocusEffect} from "@react-navigation/native";
import {get_bookings_all} from "../../apiRequests/profile";
import {calculate_available_seats_now} from "./calculate_available_seats";


export const HomeScreen = (props) => {
    const [results, setResults] = useState([])

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const token = await getValueFor('token');
                    const [bookingsResponse, placesResponse] = await Promise.all([
                        get_bookings_all(token),
                        get_places(token)
                    ]);
                    setResults(calculate_available_seats_now(bookingsResponse.data, placesResponse.data));
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData(); // Call the async function immediately

            // No cleanup is needed for this effect, so no need to return anything
        }, [])
    );


    return (
        <View style={styles.containerView}>
            <SearchBar setResults={setResults}/>
            <RenderResult results={results}/>
        </View>
    );
}

