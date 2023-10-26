import {View, Text, Button, TouchableOpacity} from 'react-native';
import styles from "./style";


export const SettingsScreen = (props) => {
    const onPress = () => {
        console.log('leave')
    }
    return (
        <>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>change Phone number</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>change Username</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Leave</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
