import React, {useState} from "react";
import {Button, FlatList, Image, Text, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import styles from "./style";
import ParameterDialog from "../orders/make_booking";
import {base_api_url} from "../../api_req/base";
import {place_details} from "../../api_req/places";


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
    // Handle the parameters here, e.g., send them to an API or update your state.
    closeDialog();
  };
    const {place, items} = route.params.props;
    console.log(items)
    return (
        <View>
            <Image
                style={styles.detail_image}
                source={{uri: `http://${base_api_url}${place['item_picture']}`}} // Replace with your image URL
            />
            <View style={styles.name_tables}>
                <Text style={styles.place_name}>{place['place_name']}</Text>
                <Text style={styles.tables}>available tables:{place['tables']}</Text>
            </View>

            <Text style={styles.additional_info}>{place['additional_info']}</Text>
            <Button style={styles.order_button} onPress={openDialog} title={'Order Table'}/>
                  <ParameterDialog
        isVisible={isDialogVisible}
        onClose={closeDialog}
        onSave={saveParameters}
      />
            <View style={{marginTop: 40}}>
                <Text style={{fontSize: 20, textAlign: 'center', alignItems: 'center'}}>Menu</Text>
                  <FlatList
    data={items}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <Item item={item} />}
  />

            </View>
        </View>
    );
}




const Item = ({ item }) => (
  <View style={styles.itemMenuContainer}>
    <Text style={styles.itemMenuName}>{item.item_name}</Text>
    <Text style={styles.additionalMenuInfo}>{item.additional_info}</Text>
    <Image
      source={{ uri: `http://${base_api_url}${item.item_picture}` }}
      style={styles.itemMenuImage}
    />
    <Text style={styles.itemMenuPrice}>{item.item_price}</Text>
  </View>
);
