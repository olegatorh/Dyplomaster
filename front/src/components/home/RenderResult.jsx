import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./style";
import {useNavigation} from "@react-navigation/native";
import {place_details} from "../../apiRequests/places";
import {base_api_url} from "../../apiRequests/base";
import {useContext} from "react";
import {Context} from "../globalContext/globalContext";

export const RenderResult = ({results}) => {
    const navigation = useNavigation()
    const globalContext = useContext(Context);
    const {token, userObj} = globalContext;
    const onClickR = (item) => {
        place_details(item.id, token).then(
            (response) => {
                navigation.navigate('Details', {
                    name: item.place_name,
                    props: {items: response.data, place: item, userObj: userObj, token:token}
                })
            }
        )
    }
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => onClickR(item)}>
                    <View style={styles.RenderContainer}>
                        <Image
                            style={styles.RenderImage}
                            source={{uri: `http://${base_api_url}${item.place_picture}`}}
                        />
                        <View style={styles.RenderDetailsContainer}>
                            <View style={styles.RenderLeftContent}>
                                <Text style={styles.text}>{item.place_name}</Text>
                            </View>
                            <View style={styles.RenderRightContent}>
                                <Text style={styles.RenderText}>🪑{item.seats}</Text>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
            )}
        />
    );
}


