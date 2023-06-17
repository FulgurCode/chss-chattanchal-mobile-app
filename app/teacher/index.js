import React from "react";
import { View, SafeAreaView } from "react-native";
import { TileCard } from "../../components";
import { useRouter } from "expo-router";

import admissionImg from "../../imgs/adminImages/item1.png";

import {useState, useEffect} from "react"
import Loader from "../../components/common/Loader";
import {TeacherCheckLogin} from "../../stores/CheckLogin";

export default function Admin() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  useEffect(()=>{TeacherCheckLogin(setLoading, router.replace, link="/login")},[]);

  return (
    <>
    <Loader show={loading} />
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
            router.push("/teacher/admission");
          }}
        />
        {/* <TileCard source={admissionImg} text="Attendence" /> */}
      </View>
    </SafeAreaView>
    </>
  );
}
