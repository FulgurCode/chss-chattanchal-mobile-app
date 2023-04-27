import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loginHeaderMain: {
    fontSize: 30,
    fontWeight: 700,
    alignSelf: "center",
    marginBottom: 30,
    paddingTop: 40,
  },
  loginHeader: { fontSize: 30, fontWeight: 500 },
  input: {
    backgroundColor: "#FAFAFC",
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    borderWidth: 1,
  },
  btn: {
    backgroundColor: "#28B4AB",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: 500,
  },
  error: {
    color: "red",
    alignSelf: "center",
    paddingTop: 50,
  },
});

export default styles;
