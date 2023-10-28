import React, {useEffect, useState} from "react";
import styles from "./style";
import {View, Text} from "react-native";
import {useContext} from 'react'
import {Context} from '../globalContext/globalContext';
import {SearchBar} from "./SearchBar";
import {RenderResult} from "./RenderResult";
import axios from "axios";


export const HomeScreen = (props) => {
    const [results, setResults] = useState([])
    const globalContext = useContext(Context);
    const {userObj} = globalContext;
    const {token} = globalContext;
    const headers = {"Authorization": `Token ${token}`}

    useEffect(() => {
        axios.get(`http://192.168.88.209:8000/api/places/points/`, {headers}).then((response) => {
            setResults(response.data)
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <View style={styles.containerView}>
            <SearchBar token={token} setResults={setResults}/>
            <RenderResult results={results}/>
        </View>
    );
}

