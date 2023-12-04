import React, {useState} from "react";
import {Button, FlatList, Image, Linking, Text, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import styles from "../style";
import {base_api_url} from "../../../apiRequests/base";
import {create_booking} from '../../../apiRequests/profile'
import ShiftTimingScreen from "./makeBooking";

export const DetailsScreen = () => {
    const route = useRoute();
    const otherProp = route.params.props;
    const [isDialogVisible, setDialogVisible] = useState(false);
    console.log('detail screen token',otherProp.token)
    const openDialog = () => {
        setDialogVisible(true);
    };

    const closeDialog = () => {
        setDialogVisible(false);
    };

    const saveParameters = (parameters) => {
        // Handle the parameters here, e.g., send them to an API or update your state.
        parameters = {
            'place': place.id,
            'people_number': parameters.peopleNumber,
            'additional_info': parameters.additionalInfo,
            'booking_time_start': parameters.bookingTimeStart,
            'booking_time_end': parameters.bookingTimeEnd,
            'user': otherProp.userObj.id,
            'token': otherProp.token
        }
        console.log(parameters)
        create_booking(parameters)
        closeDialog();
    };

    const {place, items} = route.params.props;
    const menuItems = items.map(item => ({key: item.id.toString(), item: item})); // Converting items to key-based list

    return (
        <FlatList
            data={menuItems}
            ListHeaderComponent={
                <View>
                    <Image
                        style={styles.detail_image}
                        source={{uri: `http://${base_api_url}${place['place_picture']}`}} // Replace with your image URL
                    />
                    <Text style={styles.additional_info}>{place['additional_info']}</Text>
                    <View style={styles.order_button_container}>
                        <Button style={styles.order_button} onPress={openDialog} title={'Order Table'}/>
                    </View>
                    <Button onPress={() => Linking.openURL(place['map_url'])} style={{color: 'black'}} title={'Google map'}/>
                    <ShiftTimingScreen
                        isVisible={isDialogVisible}
                        onClose={closeDialog}
                        onSave={saveParameters}
                        token={otherProp.token}
                        place_id={place.id}
                        seats={place.seats}
                    />
                    <View style={{marginTop: 40}}>
                        <Text style={{fontSize: 20, textAlign: 'center', alignItems: 'center'}}>Menu</Text>
                    </View>
                </View>
            }
            keyExtractor={(item) => item.key}
            renderItem={({item}) => <Item item={item.item}/>}
        />
    );
}

const Item = ({item}) => (
    <View style={styles.itemMenuContainer}>
        <Text style={styles.itemMenuName}>{item.item_name}</Text>
        <Text style={styles.additionalMenuInfo}>{item.additional_info}</Text>
        <Image
            source={{uri: `http://${base_api_url}${item.item_picture}`}}
            style={styles.itemMenuImage}
        />
        <Text style={styles.itemMenuPrice}>{item.item_price}</Text>
    </View>
);
