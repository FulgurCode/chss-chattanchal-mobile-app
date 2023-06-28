import { View, Image, Text } from "react-native";
import { useContext } from "react";
import { Context } from "../../stores/Context";
import { usePathname } from "expo-router";

export default function Hero(props) {
  const { styles } = useContext(Context);
  const path = usePathname().split("/");

  function capitalizeFirstLetter(string) {
    if (string != undefined) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return "Dummy-Data";
    }
  }
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 50,
        }}
      >
        <Image source={props.img} style={styles.newAdmissionImg} />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 500,
            borderColor: styles.common.dividerColor,
            borderRightWidth: 2,
            paddingRight: 20,
            color: styles.common.color,
          }}
        >
          {capitalizeFirstLetter(path[3]).replace("-", " ")}
        </Text>
      </View>
      <View
        style={{
          borderColor: styles.common.dividerColor,
          marginBottom: 10,
          borderBottomWidth: 2,
        }}
      />
      <Text style={{ color: "grey", fontSize: 17, paddingBottom: 50 }}>
        Home &gt; {capitalizeFirstLetter(path[2])} &gt;{" "}
        <Text style={{ fontWeight: 500 }}>
          {capitalizeFirstLetter(path[3]).replace("-", " ")}
        </Text>
      </Text>
    </View>
  );
}
