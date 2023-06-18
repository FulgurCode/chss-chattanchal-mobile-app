import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons, MaterialIcons , FontAwesome} from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: "#6A2C70",
          borderTopWidth: 0
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
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-add" size={30} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="verification"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="pending" size={30} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="confirmation"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="verified" size={30} color="white" />
          ),
        }}
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
    </Tabs>
  );
}
