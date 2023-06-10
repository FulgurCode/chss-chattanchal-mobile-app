import {
  Modal,
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import Axios from "../../stores/Axios";

import { usePathname, useNavigation } from "expo-router";

export default function UserProfile({ show, setShow }) {
  const navigation = useNavigation();
  const pathname = usePathname().split("/")[1];

  function Logout() {
    Axios.delete(`${pathname}/logout`)
      .then((res) => {
        setShow(false);
        navigation.popToTop();
      })
      .catch((err) => {
      });
  }
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={show}
      onRequestClose={() => {
        setShow(false);
      }}
      style={{
        paddingTop: 100,
      }}
    >
      <SafeAreaView style={styles.modal}>
        <TouchableOpacity
          onPress={() => {
            setShow(false);
          }}
          style={{
            flex: 1,
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <View style={styles.container}>
          <View
            style={{ paddingVertical: 30, paddingHorizontal: 100, gap: 20 }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: "grey",
                borderRadius: 1000,
                alignSelf: "center",

                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#ccc"
              }}
            >
              <View
                style={{
                  gap: 5,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  top: 40
                }}
              >
                <View
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: "#ddd",
                    borderRadius: 1000,
                  }}
                />
                <View
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "#ddd",
                    borderRadius: 1000,
                  }}
                />
              </View>
            </View>
            <Text
              style={{
                fontWeight: 500,
                minWidth: 125,
              }}
              numberOfLines={1}
            >
              Logged in as: {pathname.toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              //   flexDirection: "coloum",
              justifyContent: "space-around",
              //   borderTopColor: "#eee",
              //   borderTopWidth: 1,
              minWidth: "100%",
            }}
          >
            <TouchableHighlight
              underlayColor="#eee"
              style={styles.button}
              onPress={Logout}
            >
              <Text style={{ alignSelf: "center" }}>Logout</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#eee"
              style={{
                ...styles.button,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              onPress={() => {
                setShow(false);
              }}
            >
              <Text style={{ alignSelf: "center" }}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 100,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 300,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});
