import { Link, useRouter, useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, SafeAreaView, Text, StyleSheet } from "react-native";
import Axios from "../stores/Axios";

import Loader from "../components/common/Loader";

export default function Home() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState();
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState();

  const router = useRouter();

  const [focus, setFocus] = useState();

  const [redirect, setRedirect] = useState(false);
  // Change this to see the home screen

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
        <SafeAreaView style={{backgroundColor: "white", flex: 1}}>
          <Loader show={true} />
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{
            padding: 10,
            gap: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", padding: 10 }}>index page</Text>
          <Link href="/login">/login</Link>
          <Link href="/admin">/admin</Link>
          <Link href="admin/admission">
            <Text> </Text>/admin/admission/
          </Link>

          <Link href="admin/admission/student-details">
            <Text> </Text>/admin/admission/student-details
          </Link>
          <Link href="admin/admission/new-admission">
            <Text> </Text>/admin/admission/new-admission
          </Link>
          <Link href="admin/admission/profile">
            <Text> </Text>/admin/admission/profile
          </Link>
          <Link href="admin/admission/verification">
            <Text> </Text>/admin/admission/verification
          </Link>
          <Link href="admin/admission/confirmation">
            <Text> </Text>/admin/admission/confirmation
          </Link>
          <Link href="admin/admission/take-photo">
            <Text> </Text>/admin/admission/take-photo
          </Link>
          <Link href="admin/admission/edit-students">
            <Text> </Text>/admin/admission/edit-students
          </Link>

          <Link href="/teacher">/teacher</Link>
          <Link href="/teacher/signup">
            <Text> </Text>/teacher/signup
          </Link>
          <Link href="/teacher/signup-otp">
            <Text> </Text>/teacher/signup-otp
          </Link>
          <Link href="teacher/admission/">
            <Text> </Text>/teacher/admission/
          </Link>
          <Link href="teacher/admission/student-details">
            <Text> </Text>/teacher/admission/student-details
          </Link>
          <Link href="teacher/admission/new-admission">
            <Text> </Text>/teacher/admission/new-admission
          </Link>
          <Link href="teacher/admission/profile">
            <Text> </Text>/teacher/admission/profile
          </Link>
          <Link href="teacher/admission/verification">
            <Text> </Text>/teacher/admission/verification
          </Link>
          <Link href="teacher/admission/take-photo">
            <Text> </Text>/teacher/admission/take-photo
          </Link>

          <Button title="Logout" onPress={Logout} />

          <Text style={{ fontWeight: 500 }}>Logged users:</Text>
          <Text> Admin: {isAdminLoggedIn ? "false" : "true"}</Text>
          <Text> Teacher: {isTeacherLoggedIn ? "false" : "true"}</Text>

          <Button
            title="Redirect"
            onPress={() => {
              setRedirect(true);
            }}
          />
        </SafeAreaView>
      )}
    </>
  );
}
