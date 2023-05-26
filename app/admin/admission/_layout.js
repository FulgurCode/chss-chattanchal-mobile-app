import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons, MaterialIcons , FontAwesome} from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        // swipeEnabled: true,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        // tabBarLabelStyle: { fontSize: 15, color: "white" },
        tabBarShowLabel: false,
        tabBarStyle: {
          // paddingBottom: 10,
          height: 50,
          backgroundColor: "#6A2C70",
        },
        tabBarActiveBackgroundColor: "#461d4a",
      }}
    >
      <Tabs.Screen
        name="student-details"
        options={{
          // tabBarLabel: "Student details",
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
          // tabBarLabel: "New admission",
          tabBarIcon: () => (
            <Ionicons name="person-add" size={30} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="verification"
        options={{
          // tabBarLabel: "New admission",
          tabBarIcon: () => (
            <MaterialIcons name="pending" size={30} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="confirmation"
        options={{
          // tabBarLabel: "New admission",
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
