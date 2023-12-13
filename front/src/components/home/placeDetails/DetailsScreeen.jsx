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

    const openDialog = () => {
        setDialogVisible(true);
    };

    const closeDialog = () => {
        setDialogVisible(false);
    };

    const saveParameters = (parameters) => {
        parameters = {
            place: place.id,
            people_number: parameters.peopleNumber,
            additional_info: parameters.additionalInfo,
            booking_time_start: parameters.bookingTimeStart,
            booking_time_end: parameters.bookingTimeEnd,
            user: otherProp.userObj.id,
            token: otherProp.token,
        };
        create_booking(parameters);
        closeDialog();
    };

    const {place, items} = route.params.props;
    const groups = route.params.place_groups;


    const groupedMenuItems = {};
    items.forEach((item) => {
        const categoryName = groups.find((group) => group.id === item.item_group)?.group_name;
        if (categoryName) {
            if (!groupedMenuItems[categoryName]) {
                groupedMenuItems[categoryName] = [];
            }
            groupedMenuItems[categoryName].push({key: item.id.toString(), item: item});
        }
    });
    const menuItems = Object.entries(groupedMenuItems).flatMap(([category, items]) => [
        {key: category, isCategory: true},
        ...items,
    ]);
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
                        <Button style={styles.order_button} onPress={openDialog} title={'Резервувати столик'}/>
                    </View>
                    <View style={styles.map_button_container}>
                        <Button style={styles.map_button} onPress={() => Linking.openURL(place['map_url'])}
                                title={'Переглянути локацію'}/>
                    </View>
                    <ShiftTimingScreen
                        isVisible={isDialogVisible}
                        onClose={closeDialog}
                        onSave={saveParameters}
                        token={otherProp.token}
                        place_id={place.id}
                        seats={place.seats}
                    />
                    <View style={{marginTop: 40}}>
                        <Text style={{fontSize: 20, textAlign: 'center', alignItems: 'center'}}>Меню закладу</Text>
                    </View>
                </View>
            }
            keyExtractor={(item) => item.key}
            renderItem={({item}) => (item.isCategory ? <CategoryItem category={item.key}/> :
                <Item item={item.item}/>)}
        />
    );
}

const CategoryItem = ({category}) => (
    <View style={{marginTop: 20, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#ccc"}}>
        <Text style={{fontSize: 18, fontWeight: "bold", textAlign: "center"}}>{category}</Text>
    </View>
);

const Item = ({item}) => (
    <View style={styles.itemMenuContainer}>
        <View style={styles.itemMenuInfoContainer}>
            <Text style={styles.itemMenuName}>{item.item_name}</Text>
            <Text style={styles.additionalMenuInfo}>{item.additional_info}</Text>
            <Text style={styles.itemMenuPrice}>Ціна: {item.item_price} грн</Text>
        </View>
        <View style={styles.itemMenuImageContainer}>
            <Image
                source={{uri: `http://${base_api_url}${item.item_picture}`}}
                style={styles.itemMenuImage}
            />
        </View>
    </View>
);
