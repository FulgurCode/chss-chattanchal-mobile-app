import React from "react";
import styles from "../../styles/styles";
import { useState } from "react";
import Axios from "../../stores/Axios";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import OTPInput from '../../components/common/OTPInput'
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Login() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Admin", value: "admin" },
    { label: "Teacher", value: "teacher" },
    { label: "Student", value: "student" },
  ]);

    const [otpValues, setOTPValues] = useState(Array(6).fill(''));


  const [error, setError] = useState("");

  const [inputColor, setInputColor] = useState("#dfdfdf");
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);
    Axios.get(`teacher/signup-otp?otp=${otpValues.join("")}`)
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
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        minHeight: 500,
        padding: 40,
        backgroundColor: "white",
        gap: 20,
      }}
    >
      <FontAwesome5
        name="lock"
        size={24}
        color="black"
        style={{ alignSelf: "center", top: 10 }}
      />
      <Text style={{ ...styles.loginHeaderMain, paddingTop: 0 }}>
        Enter OTP
      </Text>

        <OTPInput numInputs={6} value={otpValues} onChange={setOTPValues}/>
      
      <TouchableOpacity
        style={{ ...styles.btn, marginTop: 40 }}
        onPress={handleClick}
      >
        <Text style={styles.btnText}>VERIFY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{alignItems: "center"}} >
        <Text style={{ color: "grey", fontSize: 15, fontWeight: 500 }}>
          Resend OTP
        </Text>
      </TouchableOpacity>

      <Text style={styles.error}>{error}</Text>
      <ActivityIndicator size="small" animating={isLoading} color="#28B4AB" />

    </SafeAreaView>
  );
}
