import { StyleSheet } from "react-native";
import dark from "./dark.json";
import light from "./light.json";

const styles = (scheme) => {
  let theme;

  if (scheme == "dark") {
    theme = dark;
  } else if (scheme == "light") {
    theme = light;
  } else {
    return null;
  }

  return StyleSheet.create({
    version: theme.version,
    common: {
      color: theme.color,
      primaryColor: theme.primaryColor,
      primaryDarkColor: theme.primaryDarkColor,
      secondaryColor: theme.secondaryColor,
      backgroundColor: theme.backgroundColor,

      dividerColor: theme.dividerColor,
      borderColor: theme.E3,
      borderColorLight: theme.E2,
      popUpBackground: theme.popUpBackground,
      inputBackground: theme.E1,
    },

    components: {
      textInput: {
        placeHolder: {
          color: theme.color,
        },
      },
      dropDown: {
        basicStyle: {
          backgroundColor: theme.E1,
          borderColor: theme.E3,
          borderRadius: 10,
        },
        selectedItemContainerStyle: {
          backgroundColor: theme.E3,
        },
        dropDownContainerStyle: {
          borderColor: theme.E3,
          backgroundColor: theme.E2,
          color: theme.color,
        },
        textStyle: {
          color: theme.color,
        },
      },
    }, // Custom Components

    loginHeaderMain: {
      fontSize: 30,
      fontWeight: 700,
      alignSelf: "center",
      marginBottom: 30,
      paddingTop: 100,
      color: theme.color,
    },
    input: {
      backgroundColor: theme.E1,
      height: 50,
      borderRadius: 10,
      paddingLeft: 15,
      borderWidth: 1,
      borderColor: theme.E3,
      color: theme.color
    },
    btn: {
      backgroundColor: theme.secondaryColor,
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
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: 120,
      width: "100%",
      overflow: "hidden",
      backgroundColor: theme.E2,
      borderRadius: 15,

      paddingRight: 20,
    },
    tileBackground: {
      position: "absolute",
      width: 150,
      height: 150,
    },
    tileImg: {
      width: 70,
      height: 70,
    },
    tileText: {
      fontWeight: 600,
      fontSize: 18,
      color: theme.color,
    },
    divider: {
      borderBottomWidth: 1,
      borderColor: theme.dividerColor,
      marginTop: 40,
      marginBottom: 20,
    },
    newAdmissionImg: {
      width: 40,
      height: 40,
      margin: 10
    },
    newAdmissionHeading: {
      fontSize: 17,
      fontWeight: 600,
      marginBottom: 30,
      marginTop: 15,
      color: theme.color,
    },
    newAdmissionText: {
      marginBottom: 10,
      marginTop: 10,
      paddingLeft: 5,
      color: theme.color,
    },
    mandatory: {
      color: "red",
    },

    tableBox: {
      marginBottom: 50,
    },
    table: {
      borderRadius: 10,
      overflow: "hidden",
      borderColor: theme.E3,
      borderWidth: 1,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: theme.primaryColor,

      padding: 7,
      minHeight: 45,

      alignContent: "center",
    },
    tableRow: {
      flexDirection: "row",
    },

    verificationImg: {
      width: 30,
      height: 30,
      margin: 15,
    },
  });
};

export default styles;
