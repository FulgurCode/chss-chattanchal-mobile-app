import {
  View,
  // Text,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";

let Screen = Dimensions.get("window");
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;

export default function Loader(props) {
  return (
    <>
      {props.show ? (
        <View style={styles.container}>
          <ActivityIndicator
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] , opacity: 1}}
            size={"large"}
            color={"#971AA3"}
          />
          {/* <Text style={{top: 25}}>Connecting to server...</Text> */}
        </View>
      ) : (
        ""
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "absolute",
    width: Screen.width,
    height: Screen.height - STATUS_BAR_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999999,
  },
});
