import { Stack } from "expo-router";
import { TouchableOpacity, View, Text, StatusBar } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter, usePathname, useNavigation } from "expo-router";
import UserProfile from "../components/NavBar/UserProfile";
import { useState, useContext } from "react";

import { ContextProvider, Context } from "../stores/Context";
import { CommonActions } from "@react-navigation/native";

export default function App() {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  );
}

export function Layout() {
  const router = useRouter();
  const pathname = usePathname().split("/");
  const navigation = useNavigation();

  const [show, setShow] = useState(false);

  const { styles } = useContext(Context);

  if (
    pathname[1] == "login" ||
    pathname[2] == "signup" ||
    pathname[2] == "signup-otp"
  ) {
    StatusBar.setBackgroundColor(styles.common.backgroundColor);
    if (styles.version.mode == "dark") {
      StatusBar.setBarStyle("light-content");
    } else if (styles.version.mode == "light") {
      StatusBar.setBarStyle("dark-content");
    }
  } else {
    StatusBar.setBarStyle("light-content");
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: styles.common.primaryColor },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitle: "CHSS Chattanchal",
        headerTitleStyle: { fontSize: 15, fontWeight: "200" },
        headerRight: () => (
          <View>
            <UserProfile show={show} setShow={setShow} />
            <TouchableOpacity onPress={() => setShow(true)}>
              <Ionicons name="person-circle-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              if (pathname[1] == "admin") {
                router.push("/admin");
              } else if (pathname[1] == "teacher") {
                router.push("/teacher");
              }
            }}
            onLongPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "index" }],
                })
              );
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <AntDesign name="appstore1" size={25} color="white" />
            <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
              Home
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="teacher/signup" options={{ headerShown: false }} />
      <Stack.Screen
        name="teacher/signup-otp"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
