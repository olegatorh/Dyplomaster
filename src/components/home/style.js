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
            width: "95%",
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
    });

export default styles;