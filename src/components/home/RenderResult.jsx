import {Button, Image, Text, View} from "react-native";
import styles from "./style";
import {useNavigation} from "@react-navigation/native";

export const RenderResult = ({results}) => {
    const navigation = useNavigation()
    return (
        <View>
            {results.map((place) => (
                <View key={place['id']} style={styles.container}>
                    <Button title={place['place_name']}
                            onPress={() => navigation.navigate('Details', {name: place['place_name'], props: place})}>
                        {/*<Image source={require(`./../../../../../djangoMobileAppBack/backend/media/${place['item_picture']}`)} />*/}
                    </Button>
                </View>
            ))}
        </View>
    )
}
