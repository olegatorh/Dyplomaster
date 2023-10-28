import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./style";
import {useNavigation} from "@react-navigation/native";
import {place_details} from "../../api_req/places";
import {base_api_url} from "../../api_req/base";
import {useContext} from "react";
import {Context} from "../globalContext/globalContext";

export const RenderResult = ({results}) => {
    const navigation = useNavigation()
    const globalContext = useContext(Context);
    const {token} = globalContext;
    const onClickR = (item) => {
        place_details(item.id, token).then(
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
                                source={{uri: `http://${base_api_url}${item.item_picture}`}} // Replace with your image URL
                            />
                        </View>
                        <Text style={styles.text}>{item.place_name}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
}


