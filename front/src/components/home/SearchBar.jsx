import React, {useContext, useState} from "react";
import styles from "./style";
import {View, TextInput} from "react-native";
import {search_places} from "../../api_req/places";
import {Context} from "../globalContext/globalContext";


export const SearchBar = ({setResults}) => {
    const [searchInput, setSearchInput] = useState("");
    const globalContext = useContext(Context);
    const {token} = globalContext;
    const fetchData = (value) => {
        // Send a GET request to your Django server with the search query
        search_places(value, token).then((response) => {
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

