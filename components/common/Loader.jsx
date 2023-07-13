import { View, Dimensions, StatusBar, ActivityIndicator, Text } from "react-native";
import { StyleSheet } from "react-native";

import { useContext } from "react";
import { Context } from "../../stores/Context";

let Screen = Dimensions.get("window");
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;

export default function Loader(props) {
  const { styles } = useContext(Context);

  return (
    <>
      {props.show ? (
        <View style={{...stl.container, backgroundColor: styles.common.backgroundColor}}>
          <ActivityIndicator
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }], opacity: 1 }}
            size={"large"}
            color={"#971AA3"}
          />
          <Text style={{top: 25, color: styles.common.color}}>Connecting to server...</Text>
        </View>
      ) : (
        ""
      )}
    </>
  );
}

const stl = StyleSheet.create({
  container: {
    position: "absolute",
    width: Screen.width,
    height: Screen.height - STATUS_BAR_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999999,

    flex:1
  },
});
