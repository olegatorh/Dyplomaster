const React = require("react-native");

const { StyleSheet } = React;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#fdf6ee',
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 100,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    justifyContent: 'center',
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center"
  },
RegisterButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
}
});
export default styles;
