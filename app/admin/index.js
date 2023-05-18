import React, { useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import { TileCard } from "../../components";
import { useRouter } from "expo-router";

import admissionImg from "../../imgs/adminImages/item1.png";

import Loader from "../../components/common/Loader";
import Axios from "../../stores/Axios";

import {AdminCheckLogin} from "../../stores/CheckLogin"


export default function Admin() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{AdminCheckLogin(setIsLoading, router.replace, link="/login")},[]);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1, padding: 40 }}>
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
        {/* <TileCard source={admissionImg} text="Attendence" /> */}
      </View>
      <Loader show={isLoading} />
    </SafeAreaView>
  );
}
