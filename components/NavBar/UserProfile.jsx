import {
  Modal,
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import Axios from "../../stores/Axios";
import { useContext } from "react";
import { Context } from "../../stores/Context";

import { usePathname, useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

export default function UserProfile({ show, setShow }) {
  const { styles, setIsAdminLoggedIn, setIsTeacherLoggedIn } = useContext(Context);
  const navigation = useNavigation();
  const pathname = usePathname().split("/")[1];

  function Logout() {
    Axios.delete(`${pathname}/logout`)
      .then((res) => {
        if(pathname=="admin"){
          setIsAdminLoggedIn(false)
        }else if (pathname=="teacher"){
          setIsTeacherLoggedIn(false)
        }
        setShow(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "login" }],
          })
        );
      })
      .catch((err) => {});
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
      <SafeAreaView style={stl.modal}>
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
        <View
          style={{
            ...stl.container,
            backgroundColor: styles.common.popUpBackground,
          }}
        >
          <View
            style={{
              paddingVertical: 30,
              gap: 20,
            }}
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
                borderColor: "#ccc",
              }}
            >
              <View
                style={{
                  gap: 5,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  top: 40,
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
                color: styles.common.color,
              }}
              numberOfLines={1}
            >
              Logged in as: {pathname.toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-around",
              minWidth: "100%",
            }}
          >
            <TouchableHighlight
              underlayColor={styles.common.borderColor}
              style={{ ...stl.button, borderColor: styles.common.borderColorLight }}
              onPress={async () => {
                let result = await WebBrowser.openBrowserAsync(
                  "https://chattanchalhss.com/login"
                );
                setShow(false);
              }}
            >
              <Text style={{ alignSelf: "center", color: styles.common.color }}>
                Change Password
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={styles.common.borderColor}
              style={{ ...stl.button, borderColor: styles.common.borderColorLight }}
              onPress={Logout}
            >
              <Text style={{ alignSelf: "center", color: styles.common.color }}>
                Logout
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={styles.common.borderColor}
              style={{
                ...stl.button,
                borderColor: styles.common.borderColorLight,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              onPress={() => {
                setShow(false);
              }}
            >
              <Text style={{ alignSelf: "center", color: styles.common.color }}>
                Close
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const stl = StyleSheet.create({
  container: {
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
  },
});
