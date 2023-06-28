import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Context } from "../../../stores/Context";

export default function Item(props) {
  const router = useRouter();
  const { styles } = useContext(Context);
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
        onPress={() => {
          router.push({
            pathname: props.link,
            params: {
              ...props.data,
            },
          });
        }}
      >
        <Text
          style={{
            flex: 2,
            padding: 10,
            paddingTop: 15,
            color: styles.common.color,
          }}
        >
          {props.data.name}
        </Text>
        <Text
          style={{
            flex: 1,
            padding: 10,
            paddingTop: 15,
            backgroundColor: styles.common.inputBackground,
            textAlign: "center",
            color: styles.common.color,
          }}
        >
          {props.data.admissionNo}
        </Text>
        <Text
          style={{
            flex: 1,
            padding: 10,
            paddingTop: 15,
            textAlign: "center",
            color: styles.common.color,
          }}
        >
          {props.data.class}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
