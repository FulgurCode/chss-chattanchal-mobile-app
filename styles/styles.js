import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loginHeaderMain: {
    fontSize: 30,
    fontWeight: 700,
    alignSelf: "center",
    marginBottom: 30,
    paddingTop: 100,
  },
  input: {
    backgroundColor: "#FAFAFC",
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: "#dfdfdf",
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
  link: {
    fontSize: 12,
    paddingLeft: 5,
    color: "#cd57d8",
  },
  tile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 150,
    overflow: "hidden",
  },
  tileBackground: {
    position: "absolute",
    width: 150,
    height: 150,
  },
  tileImg: {
    width: 100,
    height: 100,
  },
  tileText: {
    fontWeight: 600,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginTop: 40,
    marginBottom: 20,
  },
  newAdmissionImg: {
    width: 60,
    height: 60,
  },
  newAdmissionHeading: {
    fontSize: 17,
    fontWeight: 600,
    marginBottom: 30,
    marginTop: 15,
  },
  newAdmissionText: {
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 5,
  },
  mandatory: {
    color: "red",
  },

  tableBox: {
    marginBottom: 50
  },
  table: {
    // borderWidth: 1,
    // borderColor: "red",
    borderRadius: 10,
    overflow: "hidden"

  },
  tableHeader:{
    flexDirection: "row",
    backgroundColor: "#6A2C70",

    padding: 10,
    minHeight: 45
  },
  tableBody:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderBottomWidth: 0
    
    // padding: 10
  },
  tableRow:{
    flexDirection: "row"
  },

  verificationImg:{
    width: 30,
    height: 30,
    margin: 15
  }

  
});

export default styles;
