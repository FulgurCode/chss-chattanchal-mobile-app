import React from "react";
import styles from "../../styles/styles";
import { useState } from "react";
import Axios from "../../stores/Axios"
import { useRouter } from "expo-router";
import {
  Text,
  SafeAreaView,
  TextInput,
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [inputColor, setInputColor] = useState("#dfdfdf");
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);
      Axios
        .post("teacher/signup", {
          email: email,
          password: password,
        })
        .then((res) => {
            router.push("/teacher/signup-otp");
            setIsLoading(false);
            setError("")
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
      <Text style={styles.loginHeaderMain}>CHSS Chattanchal</Text>
      <TextInput

        style={{ ...styles.input, borderColor: inputColor }}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError();
          setInputColor("#dfdfdf");
        }}
      />
      <TextInput
        style={{ ...styles.input, borderColor: inputColor }}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
          setError();
          setInputColor("#dfdfdf");
        }}
      />
      <TouchableOpacity
        style={{ ...styles.btn, marginTop: 40 }}
        onPress={handleClick}
      >
        <Text style={styles.btnText}>SIGN UP</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
      <ActivityIndicator size="small" animating={isLoading} color="#28B4AB" />
    </SafeAreaView>
  );
}
