import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Axios from "../../../stores/Axios";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../../stores/Context";

export default function Layout() {
  const [verification, setVerification] = useState(false);
  const [details, setDetails] = useState(false);

  const {styles} = useContext(Context)

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
          backgroundColor: styles.common.primaryColor,
          borderTopWidth: 0,
        },
        tabBarActiveBackgroundColor: styles.common.primaryDarkColor,
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
        name="profile"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
