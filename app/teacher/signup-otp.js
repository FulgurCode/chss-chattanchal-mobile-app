import React from "react";
import { useContext } from "react";
import { Context } from "../../stores/Context";
import { useState } from "react";
import Axios from "../../stores/Axios";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";

export default function Login() {
  const router = useRouter();

  const {styles} = useContext(Context)

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Admin", value: "admin" },
    { label: "Teacher", value: "teacher" },
    { label: "Student", value: "student" },
  ]);

  const [otpValue, setOTPValue] = useState("");

  const [error, setError] = useState("");

  const [inputColor, setInputColor] = useState("#dfdfdf");
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    if (otpValue.length == 6){
    setError("")
    setIsLoading(true);
    Axios.get(`teacher/signup-otp?otp=${otpValue}`)
      .then((res) => {
        router.push("/login");
        setIsLoading(false);
        setError("");
        setInputColor("#eee");
      })
      .catch((err) => {
        setIsLoading(false);

        if (err?.response?.status == 401) {
          setInputColor("red");
          setError(err.response.data);
        } else if (err?.response?.status === undefined) {
          setError("Server connection error");
        } else {
          setError(err.response.data);
        }
      });
    }else{setError("field is not filled")}
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: styles.common.backgroundColor,
        flex: 1,
        justifyContent: "center",
        minHeight: 500,
        padding: 40,
        gap: 20,
      }}
    >
      <FontAwesome5
        name="lock"
        size={24}
        color={styles.common.color}
        style={{ alignSelf: "center", top: 10 }}
      />
      <Text style={{ ...styles.loginHeaderMain, paddingTop: 0 }}>
        Enter OTP
      </Text>

      <TextInput
        style={{...styles.input, fontSize: 20, paddingLeft: "0%", textAlign: "center"}}
        value={otpValue}
        onChangeText={
          (text)=> setOTPValue( text.replace(/[^0-9]/g, ''))
      }
        maxLength={6}
      />

      <TouchableOpacity
        style={{ ...styles.btn, marginTop: 40 }}
        onPress={handleClick}
      >
        <Text style={styles.btnText}>VERIFY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ alignItems: "center" }}>
        <Text style={{ color: "grey", fontSize: 15, fontWeight: 500 }}>
          Resend OTP
        </Text>
      </TouchableOpacity>

      <Text style={styles.error}>{error}</Text>
      <ActivityIndicator size="small" animating={isLoading} color="#28B4AB" />
    </SafeAreaView>
  );
}
