import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./style";
import {useNavigation} from "@react-navigation/native";
import {place_details, place_groups} from "../../apiRequests/places";
import {useContext} from "react";
import {Context, getValueFor} from "../globalContext/globalContext";
import {base_api_url} from "../../apiRequests/base";

export const RenderResult = ({results}) => {
    const navigation = useNavigation();
    const globalContext = useContext(Context);
    const {userObj} = globalContext;

    const onClickR = (item) => {
        const fetchTokenAndPlaceDetails = async () => {
            try {
                const storedToken = await getValueFor('token');

                // Use the token directly within this block
                const response = await place_details(item.id, storedToken);
                const place_groups_list = await place_groups(item.id, storedToken)
                navigation.navigate('Details', {
                    name: item.place_name,
                    props: {items: response.data, place: item, userObj: userObj, token: storedToken},
                    place_groups: place_groups_list.data
                });
            } catch (error) {
                console.error('Error fetching token or place details:', error);
            }
        };

        fetchTokenAndPlaceDetails();
    };

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
};


