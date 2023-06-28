import React, { useEffect, useContext } from "react";
import { Context } from "../stores/Context";
import { useState } from "react";
import Axios from "../stores/Axios";
import DropDownPickerComponent from "../components/common/DropDown";
import { Link, useRouter, useSearchParams } from "expo-router";
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
  const { styles, setIsAdminLoggedIn, setIsTeacherLoggedIn } =
    useContext(Context);

  const data = useSearchParams();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Admin", value: "admin" },
    { label: "Teacher", value: "teacher" },
    { label: "Student", value: "student" },
  ]);

  const [userType, setUserType] = useState(data.user || "admin");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [inputColor, setInputColor] = useState(styles.common.borderColor);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInputColor(styles.common.borderColor);
  }, [styles]);

  function handleClick() {
    setIsLoading(true);
    if (userType == "admin") {
      Axios.post("admin/login", {
        username: userName,
        password: password,
      })
        .then((res) => {
          setIsAdminLoggedIn(true)
          Logout("teacher");
          router.replace("/admin");
          setIsLoading(false);
          setError("");
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
    } else if (userType == "teacher") {
      Axios.post("teacher/login", {
        email: userName,
        password: password,
      })
        .then((res) => {
          setIsTeacherLoggedIn(true)
          Logout("admin");
          router.replace("/teacher");
          setIsLoading(false);
          setError("");
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
    } else {
      setError("students login fuctionality is not added yet");
    }
  }
  function Logout(user) {
    Axios.delete(`${user}/logout`)
      .then((res) => {
        if (user == "teacher") {
          setIsTeacherLoggedIn(false);
        } else if (user == "admin") {
          setIsAdminLoggedIn(false);
        }
      })
      .catch((err) => {});
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
      <Text style={styles.loginHeaderMain}>CHSS CHATTANCHAL</Text>
      {/* <Text style={styles.loginHeader}>Start Login</Text> */}
      <View style={{ zIndex: 999 }}>
        <DropDownPickerComponent
          open={open}
          value={userType}
          items={items}
          setOpen={setOpen}
          setValue={setUserType}
          setItems={setItems}
          placeholder="Select user type"
        />
      </View>
      <TextInput
        style={{ ...styles.input, borderColor: inputColor }}
        placeholder={userType == "admin" ? "Username" : "Email"}
        placeholderTextColor={styles.components.textInput.placeHolder.color}
        value={userName}
        onChangeText={(text) => {
          setUserName(text.trim());
          setError();
          setInputColor(styles.common.borderColor);
        }}
      />
      <TextInput
        style={{ ...styles.input, borderColor: inputColor }}
        placeholder="Password"
        placeholderTextColor={styles.components.textInput.placeHolder.color}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text.trim());
          setError();
          setInputColor(styles.common.borderColor);
        }}
      />
      <Link href="/login" style={styles.link}>
        {/* <Link href="#" style={styles.link}> Replace with this when needed*/}
        Forget password?
      </Link>
      <TouchableOpacity
        style={{ ...styles.btn, marginTop: 40 }}
        onPress={handleClick}
      >
        <Text style={styles.btnText}>LOGIN</Text>
      </TouchableOpacity>

      {userType == "teacher" ? (
        <TouchableOpacity
          style={{ alignItems: "center", position: "relative" }}
          onPress={() => router.push("teacher/signup")}
        >
          <Text style={{ color: "grey", fontSize: 15, fontWeight: 500 }}>
            SIGNUP
          </Text>
        </TouchableOpacity>
      ) : (
        ""
      )}

      <Text style={styles.error}>{error}</Text>
      <ActivityIndicator size="small" animating={isLoading} color="#28B4AB" />
    </SafeAreaView>
  );
}
