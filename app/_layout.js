import { Stack } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#6A2C70" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitle: "CHSS Chattanchal",
        headerTitleStyle: { fontSize: 15, fontWeight: "200" },
        headerRight: () => (
          <View>
            <TouchableOpacity onPress={() => alert("This is profile button")}>
              <Ionicons name="person-circle-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.push("/")}
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
    </Stack>
  );
}
