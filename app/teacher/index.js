import React from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { TileCard } from "../../components";
import { useRouter } from "expo-router";

import admissionImg from "../../imgs/adminImages/item1.png";

import { useState, useContext } from "react";

import { Context } from "../../stores/Context";

import TakePhoto from "../admin/take-photo";

export default function Admin() {
  const router = useRouter();
  const { styles } = useContext(Context);

  const [showCamera, setShowCamera] = useState(false);

  if (showCamera) {
    StatusBar.setBackgroundColor("#000");
  } else {
    StatusBar.setBackgroundColor(styles.common.primaryColor);
  }

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: styles.common.backgroundColor,
          flex: 1,
          padding: 40,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            gap: 20,
            paddingTop: 30,
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

          <TileCard
            source={admissionImg}
            text="Camera"
            onPress={() => {
              setShowCamera(true);
            }}
          />

          <TakePhoto
            animationType="slide"
            visible={showCamera}
            setVisible={setShowCamera}
            onRequestClose={() => {
              setShowCamera(false);
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
