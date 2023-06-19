import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Axios from "../../../stores/Axios";
import { useState, useEffect } from "react";

export default function Layout() {
  const [verification, setVerification] = useState(false);
  const [details, setDetails] = useState(false);

  function CheckDuty() {
    Axios.get(`/teacher/get-all-duty`)
      .then((response) => {
        response.data.map((object) => {
          if (object.duty == "add-details") {
            setDetails(true);
          }
          if (object.duty == "verification") {
            setVerification(true);
          }
        });
      })
      .catch((error) => {});
  }
  useEffect(() => CheckDuty(), []);

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: "#6A2C70",
          borderTopWidth: 0,
        },
        tabBarActiveBackgroundColor: "#461d4a",
      }}
    >
      <Tabs.Screen
        name="student-details"
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-details"
              size={41}
              color="white"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="new-admission"
        options={
          details
            ? {
                tabBarIcon: () => (
                  <Ionicons name="person-add" size={30} color="white" />
                ),
              }
            : { href: null }
        }
      />
      <Tabs.Screen
        name="verification"
        options={
          verification
            ? {
                tabBarIcon: () => (
                  <MaterialIcons name="pending" size={30} color="white" />
                ),
              }
            : { href: null }
        }
      />
      <Tabs.Screen
        name="take-photo"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="camera" size={27} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="edit-students"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
