import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { TileCard } from "../../components";
import { useRouter } from "expo-router";

import admissionImg from "../../imgs/adminImages/item1.png";

import Loader from "../../components/common/Loader";
import { AdminCheckLogin } from "../../stores/CheckLogin";

import { useContext } from "react";
import { Context } from "../../stores/Context";

import TakePhoto from "./take-photo";

export default function Admin() {
  const router = useRouter();
  const { styles } = useContext(Context);

  const [showCamera, setShowCamera] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    AdminCheckLogin(setIsLoading, router.replace, (link = "/login"));
  }, []);

  if (showCamera) {
    StatusBar.setBackgroundColor("#000");
  } else {
    StatusBar.setBackgroundColor(styles.common.primaryColor);
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: styles.common.backgroundColor, flex: 1, padding: 40 }}
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
            router.push("/admin/admission");
          }}
        />
        <TileCard
          source={admissionImg}
          text="Camera"
          onPress={() => {
            setShowCamera(true);
          }}
        />
        <TileCard
          source={admissionImg}
          text="Admission"
          onPress={() => {
            router.push("/admin/admission");
          }}
        />
        {/* <TileCard source={admissionImg} text="Attendence" /> */}
      </View>

      <TakePhoto
        animationType="slide"
        visible={showCamera}
        setVisible={setShowCamera}
        onRequestClose={() => {
          setShowCamera(false);
        }}
      />

      <Loader show={isLoading} />
    </SafeAreaView>
  );
}
