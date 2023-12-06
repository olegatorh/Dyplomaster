import React, {useContext, useEffect, useState} from "react";
import styles from "./style";
import {View, TextInput} from "react-native";
import {search_places} from "../../apiRequests/places";
import {Context, getValueFor} from "../globalContext/globalContext";


export const SearchBar = ({setResults}) => {
    const [searchInput, setSearchInput] = useState("");
    const globalContext = useContext(Context);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await getValueFor('token');
            setToken(storedToken);
        };

        fetchToken();
    }, []);

    const handleChange = (value) => {
        setSearchInput(value);
        search_places(value, token).then((response) => {
            setResults(response.data)
        })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={
                styles.searchBar__unclicked
            }>
                <TextInput style={styles.input}
                           placeholder="Пошук"
                           value={searchInput}
                           onChangeText={text => handleChange(text)}
                />
            </View>
        </View>
    );
}

