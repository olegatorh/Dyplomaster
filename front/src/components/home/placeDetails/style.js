const React = require("react-native");

const {StyleSheet} = React;

const styles = StyleSheet.create({
        containerView: {
            marginTop: '10%',
            flex: 1,
            alignItems: "center"
        },
        home: {
            marginTop: '10%'
        },
        container: {
            margin: 15,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            width: "90%",
        },
        searchBar__unclicked: {
            padding: 10,
            flexDirection: "row",
            width: "100%",
            backgroundColor: "#d9dbda",
            borderRadius: 15,
            alignItems: "center",
        },
        searchBar__clicked: {
            padding: 10,
            flexDirection: "row",
            width: "80%",
            backgroundColor: "#d9dbda",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "space-evenly",
        },
        input: {
            fontSize: 20,
            marginLeft: 10,
            width: "90%",
        },

        itemContainer: {
            backgroundColor: 'white',
            borderColor: 'black',
            borderRadius: 10,
            borderWidth: 2,
            padding: 1,
            alignItems: 'center',
        },
        image: {
            width: 300, // Adjust the width as needed
            height: 170 // Adjust the height as needed
        },
        text: {
            color: 'black',
            marginBottom: 25,
            alignItems: 'center',
        },
        detail_image: {
            width: '100%',
            height: 150
        },
        name_tables: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10, // Adjust as needed
            alignItems: 'center',
            marginBottom: 10, // Adjust as needed
            backgroundColor: '#ffffff', // Background color for the container
            borderWidth: 1, // Add border properties as needed
            borderColor: '#ccc',
            borderRadius: 5, // Add border radius as needed
            padding: 10, // Add padding as needed
        },
        place_name: {
            fontSize: 21, // Adjust the font size
            fontWeight: 'bold', // Adjust font weight as needed
        },
        tables: {
            fontSize: 20, // Adjust the font size
        },
        order_button: {
            color: 'black',
            backgroundColor: 'black'
        },
        additional_info: {
            height: 100
        },
        itemMenuContainer: {
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },
        itemMenuName: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        additionalMenuInfo: {
            fontSize: 14,
        },
        itemMenuImage: {
            width: 200,
            height: 200,
            resizeMode: 'cover',
        },
        itemMenuPrice: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        makeBcontainer: {
            backgroundColor: '#fff',
            padding: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
        },
        modal: {
            margin: 0,
            justifyContent: 'flex-end',
        },
        dialogInput: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,

        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        numberInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          },
          numberInputLabel: {
            marginRight: 10,
            fontSize: 16,
          },
          numberInputButtons: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          numberInputValue: {
            marginHorizontal: 10,
            fontSize: 16,
          },
        buttonPadding:{
            paddingHorizontal: 10,
        },

    })
;

export default styles;
