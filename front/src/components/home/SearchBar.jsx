import React, {useEffect, useState} from "react";
import styles from "./style";
import {View, Text, TextInput} from "react-native";
import {useContext} from 'react'
import {Context} from '../globalContext/globalContext';
import axios from "axios";


export const SearchBar = ({setResults, token}) => {
    const [searchInput, setSearchInput] = useState("");
    const headers = {"Authorization": `Token ${token}`}
    const fetchData = (value) => {
        // Send a GET request to your Django server with the search query
        axios.get(`http://192.168.88.254:8000/api/places/points/${value}`, {headers}).then((response) => {
            setResults(response.data)
        })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (value) => {
        setSearchInput(value);
        fetchData(value);
    };

    return (
        <View style={styles.container}>
            <View style={
                styles.searchBar__unclicked
            }>
                <TextInput style={styles.input}
                           placeholder="Type to search..."
                           value={searchInput}
                           onChangeText={text => handleChange(text)}
                />
            </View>
        </View>
    );
}

