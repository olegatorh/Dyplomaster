import {Button, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./style";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {Context} from "../globalContext/globalContext";
import {useContext} from "react";

export const RenderResult = ({results}) => {
    const navigation = useNavigation()
    const globalContext = useContext(Context);
    const {token} = globalContext;
    const headers = {"Authorization": `Token ${token}`}

    const onClickR = (item) => {
        axios.get(`http://192.168.88.254:8000/api/places/items/${item.id}`, {headers}).then(
            (response) => {
                navigation.navigate('Details', {name: item.place_name, props: {items: response.data, place: item}})
            }
        )
    }
    return (
        <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => onClickR(item)}>
                    <View>
                        <View style={styles.itemContainer}>
                            <Image
                                style={styles.image}
                                source={{uri: `http://192.168.88.254:8000${item.item_picture}`}} // Replace with your image URL
                            />
                        </View>
                        <Text style={styles.text}>{item.place_name}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
}


