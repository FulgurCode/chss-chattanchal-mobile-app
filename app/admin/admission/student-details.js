import React from "react";
import studentDetailsImg from "../../../imgs/adminImages/item2.png";
import Hero from "../../../components/common/Hero";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import DropDownPickerComponent from "../../../components/common/DropDown";
import Axois from "../../../stores/Axios";
import Item from "../../../components/admin/admission/Item";
import { useRouter } from "expo-router";

import { useState, useEffect, useContext } from "react";
import { Context } from "../../../stores/Context";

export default function StudentDetials() {
  const router = useRouter();
  const { styles, isAdminLoggedIn } = useContext(Context);

  if (!isAdminLoggedIn) {
    router.replace("/login");
  }

  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("name");
  const [search, setSearch] = React.useState("");

  const [data, setData] = React.useState([]);

  function body() {
    let searchValue;

    if (isNaN(parseInt(search))) {
      searchValue = search;
    } else {
      searchValue = parseInt(search);
    }

    if (value === "name") {
      return {};
    } else {
      return {
        [value]: searchValue,
      };
    }
  }

  function handleClick() {
    Axois.post(
      `admin/get-students?name=${value === "name" ? search : ""}`,
      body()
    )
      .then((res) => {
        setData(res.data);
        setError("");
      })

      .catch((err) => {
        if (err?.response?.status == 401) {
          setError("Not Logged In");
        } else if (err?.response?.status === undefined) {
          setError("Server connection error");
        } else if (err?.response?.status == 500) {
          setError(err.response.data);
        } else if (err?.response?.status == 404) {
          setError("404 Error");
        } else {
          setError(err.response.data);
        }
      });
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: styles.common.backgroundColor,
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <Hero text={"Student Details"} img={studentDetailsImg} />

        <View style={{ gap: 20 }}>
          <View style={{ zIndex: 999 }}>
            <DropDownPickerComponent
              open={open}
              value={value}
              items={[
                { label: "Admission No.", value: "admissionNo" },
                { label: "Application No.", value: "applicationNo" },
                { label: "Name", value: "name", selected: true },
              ]}
              setOpen={setOpen}
              placeholder="Search By"
              setValue={setValue}
            />
          </View>
          <TextInput
            style={styles.input}
            name="search"
            onChangeText={(text) => {
              setSearch(text);
            }}
            placeholder="Search here"
            value={search}
            placeholderTextColor={styles.components.textInput.placeHolder.color}
          />
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{ ...styles.btn, minWidth: 100 }}
              onPress={handleClick}
            >
              <Text style={styles.btnText}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 5 }}>
            <Text
              style={{
                color: "red",
                alignSelf: "center",
              }}
            >
              {error}
            </Text>
            <ActivityIndicator
              size="small"
              animating={isLoading}
              color="#28B4AB"
            />
          </View>
        </View>

        <View
          style={{
            borderColor: styles.common.borderColor,
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 10,
            overflow: "hidden",
            backgroundColor: styles.common.inputBackground,
            marginBottom: 50,
          }}
        >
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Item data={item} link={"/profile"} user="admin" />
            )}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={
              <View
                style={{
                  backgroundColor: styles.common.borderColor,
                  height: 1,
                }}
              />
            }
            ListEmptyComponent={
              <Text style={{ alignSelf: "center", color: "grey", padding: 30 }}>
                Empty
              </Text>
            }
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: styles.common.primaryColor,
                }}
              >
                <Text
                  style={{
                    padding: 10,
                    paddingTop: 15,
                    flex: 2,
                    borderTopLeftRadius: 8,
                    color: "white",
                  }}
                >
                  Name
                </Text>
                <Text
                  style={{
                    padding: 10,
                    paddingTop: 15,
                    flex: 1,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Adm No
                </Text>
                <Text
                  style={{
                    padding: 10,
                    paddingTop: 15,
                    flex: 1,
                    textAlign: "center",
                    borderTopRightRadius: 8,
                    color: "white",
                  }}
                >
                  Class
                </Text>
              </View>
            }
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </>
  );
}
