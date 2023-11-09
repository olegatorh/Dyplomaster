import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    orderContainer: {
        flexDirection: 'row', // Lay out the contents in a row
        alignItems: 'center', // Align vertically in the center
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    image: {
        width: 50,
        height: 50,
    },
    orderDetailsContainer: {
        flex: 1, // Expand to fill available space
        marginLeft: 16, // Add some left margin to separate the image from order details
    },
    orderText: {
        fontSize: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 4,
    },
    deleteButtonText: {
        color: 'white',
    },
    orderContainerNotActive: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    deleteButtonNotActive: {
        backgroundColor: 'gray', // Set the background color to gray
        padding: 8,
        borderRadius: 4,
    },
    alert: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});
