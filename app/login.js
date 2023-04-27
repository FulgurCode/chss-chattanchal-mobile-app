import React from "react";
import styles from "../constants/styles";
import { useState } from "react";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
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

  const [userType, setUserType] = useState("admin");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [inputColor, setInputColor] = useState("transparent");
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);
    if (userType == "admin") {
      axios
        .post("http://192.168.201.41:9000/api/admin/login", {
          username: userName,
          password: password,
        })
        .then((res) => {
          if (res.data == "Login Successful") {
            router.push("/admin");
          }
        })
        .catch((err) => {
          setIsLoading(false);

          if (err?.response?.status == 401) {
            setInputColor("red");
            setError(err.response.data);
          } else if (err?.response?.status === undefined) {
            setError("Server connection error");
            console.log(err);
          } else {
            setError(err.response.data);
          }
        });
    } else {
      setError("students or teachers login fuctionality is not added yet");
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        minHeight: 500,
        padding: 25,
        backgroundColor: "white",
        gap: 20,
      }}
    >
      <Text style={styles.loginHeaderMain}>CHSS Chattanchal</Text>
      <Text style={styles.loginHeader}>Start Login</Text>
      <View style={{ zIndex: 999 }}>
        <DropDownPicker
          open={open}
          value={userType}
          items={items}
          setOpen={setOpen}
          setValue={setUserType}
          setItems={setItems}
          placeholder="Select user type"
          onChangeValue={(value) => {
            console.log(value);
          }}
          style={{
            backgroundColor: "#FAFAFC",
            borderColor: "transparent",
            borderRadius: 10,
          }}
          selectedItemContainerStyle={{
            backgroundColor: "#f2f2f2",
          }}
          dropDownContainerStyle={{
            borderColor: "#dfdfdf",
          }}
        />
      </View>
      <TextInput
        style={{ ...styles.input, borderColor: inputColor }}
        placeholder="Username"
        value={userName}
        onChangeText={(text) => {
          setUserName(text);
          setError();
          setInputColor("transparent");
        }}
      />
      <TextInput
        style={{ ...styles.input, borderColor: inputColor }}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError();
          setInputColor("transparent");
        }}
      />
      <TouchableOpacity style={styles.btn} onPress={handleClick}>
        <Text style={styles.btnText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
      <ActivityIndicator size="small" animating={isLoading} />
    </SafeAreaView>
  );
}
