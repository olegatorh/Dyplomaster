import React, {useContext, useEffect, useState} from "react";
import {Button, FlatList, Image, Text, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import axios from "axios";
import {Context} from "../globalContext/globalContext";
import styles from "./style";


export const DetailsScreen = () => {
    const route = useRoute();
    const {place, items} = route.params.props;
    console.log(items)
    return (
        <View>
            <Image
                style={styles.detail_image}
                source={{uri: `http://192.168.88.254:8000${place['item_picture']}`}} // Replace with your image URL
            />
            <View style={styles.name_tables}>
                <Text style={styles.place_name}>{place['place_name']}</Text>
                <Text style={styles.tables}>available tables:{place['tables']}</Text>
            </View>

            <Text style={styles.additional_info}>{place['additional_info']}</Text>
            <Button style={styles.order_button} title={'Order Table'}/>
            <View style={{marginTop: 40}}>
                <Text style={{fontSize: 20, textAlign: 'center', alignItems: 'center'}}>Menu</Text>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View>
                            <Text>{item.item_name}</Text>
                            <Text>{item.additional_info}</Text>
                            <Image
                                source={{uri: `http://192.168.88.254:8000${item.item_picture}`}} // Replace with your image URL
                            />
                            <Text>{item.item_price}</Text>
                        </View>
                    )}
                />

            </View>
        </View>
    );
}

