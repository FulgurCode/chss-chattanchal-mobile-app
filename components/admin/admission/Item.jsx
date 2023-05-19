import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Item(props) {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          //   padding: 10,
          gap: 5,
        }}
        onPress={() => {
          router.push({
            pathname: props.link,
            params: {
              ...props.data,
              ...props.data.qualifyingExamDetails,
              ...props.data.tcDetailsOnAdmission,
            },
          });
        }}
      >
        <Text style={{ flex: 2, padding: 10, paddingTop: 15 }}>
          {props.data.name}
        </Text>
        <Text
          style={{
            flex: 1,
            padding: 10,
            paddingTop: 15,
            backgroundColor: "#efefef",
            textAlign: "center",
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
          }}
        >
          {props.data.class}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
