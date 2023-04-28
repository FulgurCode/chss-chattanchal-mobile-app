import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../styles/styles";
import tileImg from "../../imgs/tile/inset.png";
import { TouchableNativeFeedback } from "react-native";

export default function Tile(props) {
  return (
    <TouchableOpacity style={styles.tile} onPress={props.onPress}>
      <Image source={tileImg} style={styles.tileBackground} />
      <Image source={props.source} style={styles.tileImg} />
      <Text style={styles.tileText}>{props.text}</Text>
    </TouchableOpacity>
  );
}
