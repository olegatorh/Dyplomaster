import React, {useContext, useEffect, useState} from "react";
import styles from "./style";
import {View} from "react-native";
import {SearchBar} from "./SearchBar";
import {RenderResult} from "./RenderResult";
import {get_places} from "../../api_req/places";
import {Context} from "../globalContext/globalContext";


export const HomeScreen = (props) => {
    const [results, setResults] = useState([])
    const globalContext = useContext(Context);
    const {token} = globalContext;
    useEffect(() => {
        get_places(token).then((response) => {
            setResults(response.data)
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <View style={styles.containerView}>
            <SearchBar setResults={setResults}/>
            <RenderResult results={results}/>
        </View>
    );
}

