import React from "react";
import { View, SafeAreaView } from "react-native";
import { TileCard } from "../../components";
import { useRouter } from "expo-router";

import admissionImg from "../../imgs/adminImages/item1.png";

export default function Admin() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1, padding: 40 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          gap: 20,
          paddingTop: 30,
          // justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <TileCard
          source={admissionImg}
          text="Admission"
          onPress={() => {
            router.push("/teacher/admission");
          }}
        />
        {/* <TileCard source={admissionImg} text="Attendence" /> */}
      </View>
    </SafeAreaView>
  );
}
