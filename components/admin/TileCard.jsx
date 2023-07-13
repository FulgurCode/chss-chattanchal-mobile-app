import { Image, Text, TouchableHighlight, View } from "react-native";
import { useContext } from "react";
import { Context } from "../../stores/Context";
import { MaterialIcons } from "@expo/vector-icons";

export default function Tile(props) {
  const { styles } = useContext(Context);
  return (
    <TouchableHighlight style={{ width: "100%", borderRadius: 15 }} onPress={props.onPress}>
      <View style={styles.tile}>
        <Image source={props.source} style={styles.tileImg} />
        <Text style={styles.tileText}>{props.text}</Text>
        <MaterialIcons name="keyboard-arrow-right" size={40} color={styles.common.color} />
      </View>
    </TouchableHighlight>
  );
}
