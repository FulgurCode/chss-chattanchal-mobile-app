import { Link, useRouter, useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  Text,
  StatusBar,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Axios from "../stores/Axios";
import { useSearchParams } from "expo-router";

import Loader from "../components/common/Loader";

import { useContext } from "react";
import { Context } from "../stores/Context";

export default function Home() {
  const {
    styles,
    isAdminLoggedIn,
    isTeacherLoggedIn,
    setIsAdminLoggedIn,
    setIsTeacherLoggedIn,
    webSocketURL,
    setWebsocketURL,
  } = useContext(Context);

  const router = useRouter();
  const data = useSearchParams();
  const [serverUrl, setServerUrl] = useState(Axios.defaults.baseURL);

  const [focus, setFocus] = useState();

  const [redirect, setRedirect] = useState(
    data.redirect != undefined
      ? data.redirect == "false"
        ? false
        : true
      : true
  );
  // const [redirect, setRedirect] = useState(false);
  // Change this to see the home screen

  if (!redirect) {
    StatusBar.setBackgroundColor("red");
  }

  function CheckLogin() {
    Axios.get("admin/checklogin")
      .then((res) => {
        if (res.data == true) {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
        }
      })
      .catch((err) => {
        if (err.response == undefined) {
          setTimeout(() => CheckLogin(), 2000);
        }
      });

    Axios.get("teacher/checklogin")
      .then((res) => {
        if (res.data == true) {
          setIsTeacherLoggedIn(true);
        } else {
          setIsTeacherLoggedIn(false);
        }
      })
      .catch((err) => {
        if (err.response == undefined) {
          setTimeout(() => CheckLogin(), 2000);
        }
      });
  }
  CheckLogin();

  useFocusEffect(
    React.useCallback(() => {
      setFocus(true);
      return () => {
        setFocus(false);
      };
    }, [])
  );

  useEffect(() => {
    // console.log(isAdminLoggedIn)
    if (redirect && focus) {
      if (isAdminLoggedIn) {
        router.replace("/admin");
      } else if (isTeacherLoggedIn) {
        router.replace("/teacher");
      } else if (!isAdminLoggedIn && !isTeacherLoggedIn) {
        if (isAdminLoggedIn != undefined && isTeacherLoggedIn != undefined) {
          router.replace("/login");
        }
      }
    }
  }, [focus, isAdminLoggedIn, isTeacherLoggedIn, redirect]);

  function Logout() {
    Axios.delete("admin/logout")
      .then((res) => {
        Alert.alert("logout ", res.data);
      })
      .catch((err) => {
        if (err.res.data) {
          Alert.alert("err: ", err.res.data);
        }
      });

    Axios.delete("teacher/logout")
      .then((res) => {
        Alert.alert("logout ", res.data);
      })
      .catch((err) => {
        if (err.res.data) {
          Alert.alert("err: ", err.res.data);
        }
      });
  }

  return (
    <>
      {redirect ? (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
          <Loader show={true} />
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{
            backgroundColor: styles.common.backgroundColor,
            flex: 1,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              gap: 10,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                padding: 10,
                color: styles.common.color,
              }}
            >
              index page
            </Text>

            <Link
              href="/login"
              style={{
                color: styles.common.color,
              }}
            >
              /login
            </Link>
            <Link
              href="/admin"
              style={{
                color: styles.common.color,
              }}
            >
              /admin
            </Link>
            <Link
              href="admin/admission"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>    </Text>/admin/admission/
            </Link>

            <Link
              href="admin/admission/student-details"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>        </Text>/admin/admission/student-details
            </Link>
            <Link
              href="admin/admission/new-admission"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>        </Text>/admin/admission/new-admission
            </Link>
            <Link
              href="admin/admission/profile"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>        </Text>/admin/admission/profile
            </Link>
            <Link
              href="admin/admission/verification"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>        </Text>/admin/admission/verification
            </Link>
            <Link
              href="admin/admission/confirmation"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>        </Text>/admin/admission/confirmation
            </Link>
            <Link
              href="admin/admission/take-photo"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>        </Text>/admin/admission/take-photo
            </Link>

            <Link
              href="/teacher"
              style={{
                color: styles.common.color,
              }}
            >
              /teacher
            </Link>
            <Link
              href="/teacher/signup"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>    </Text>/teacher/signup
            </Link>
            <Link
              href="/teacher/signup-otp"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>    </Text>/teacher/signup-otp
            </Link>
            <Link
              href="teacher/admission/"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>    </Text>/teacher/admission/
            </Link>
            <Link
              href="teacher/admission/student-details"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>        </Text>/teacher/admission/student-details
            </Link>
            <Link
              href="teacher/admission/new-admission"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>        </Text>/teacher/admission/new-admission
            </Link>
            <Link
              href="teacher/admission/profile"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>        </Text>/teacher/admission/profile
            </Link>
            <Link
              href="teacher/admission/verification"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>        </Text>/teacher/admission/verification
            </Link>
            <Link
              href="teacher/admission/take-photo"
              style={{
                color: styles.common.color,
              }}
            >
              <Text>        </Text>/admin/admission/take-photo
            </Link>

            <Text style={{ fontWeight: 500, color: styles.common.color }}>
              Logged users:
            </Text>
            <Text
              style={{
                color: styles.common.color,
              }}
            >
              {" "}
              <Text>    </Text>Admin: {isAdminLoggedIn ? "false" : "true"}
            </Text>
            <Text
              style={{
                color: styles.common.color,
              }}
            >
              {" "}
              <Text>    </Text>Teacher: {isTeacherLoggedIn ? "false" : "true"}
            </Text>

            <Text style={{ color: styles.common.color, fontWeight: 500 }}>
              Server:
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TextInput
                style={{ ...styles.input, flex: 1 }}
                value={serverUrl}
                onChangeText={setServerUrl}
              />
              <TouchableOpacity
                style={{ ...styles.btn, padding: 10, height: 50 }}
                onPress={() => {
                  Axios.defaults.baseURL = serverUrl;
                }}
              >
                <Text style={styles.btnText}>SET</Text>
              </TouchableOpacity>
            </View>

            <Text style={{ color: styles.common.color, fontWeight: 500 }}>
              Websocket:
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TextInput
                style={{ ...styles.input, flex: 1 }}
                value={webSocketURL}
                onChangeText={setWebsocketURL}
              />
              <TouchableOpacity
                style={{ ...styles.btn, padding: 10, height: 50 }}
                onPress={() => {
                  Axios.defaults.baseURL = serverUrl;
                }}
              >
                <Text style={styles.btnText}>SET</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setRedirect(true);
              }}
            >
              <Text style={styles.btnText}>REDIRECT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={Logout}>
              <Text style={styles.btnText}>LOGOUT</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}
