import React, {useContext, useEffect, useState} from "react";
import {Button, Text, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import axios from "axios";
import {Context} from "../globalContext/globalContext";


export const DetailsScreen = () => {
    const route = useRoute();
    const globalContext = useContext(Context);
    const otherProp = route.params.props;
    const {token} = globalContext;
    const headers = {"Authorization": `Token ${token}`}

    console.log(otherProp)
    const onClickR = () => {
        axios.get(`http://192.168.88.209:8000/api/places/items/${otherProp['id']}`, {headers}).then(
            (response) => {
                console.log(response.data)
            }
        )
    }
    return (
        <View>
            <Text>{otherProp['item_picture']}</Text>
            <Text>{otherProp['tables']}</Text>
            <Text>{otherProp['additional_info']}</Text>
            <Text>MENU</Text>
            <Button onPress={() => onClickR()} title={'check menu'}> </Button>
            
        </View>
    );
}

