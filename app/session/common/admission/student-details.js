import React from "react";
import studentDetailsImg from "../../../../imgs/adminImages/item2.png";
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styles from "../../../../styles/styles";
import DropDownPicker from "react-native-dropdown-picker";
import Axois from "../../../../stores/Axios";
import Item from "../../../../components/admin/admission/Item";

export default function StudentDetials() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("name");
  const [search, setSearch] = React.useState("");

  const [data, setData] = React.useState([]);

  function handleClick() {
    setIsLoading(true);
    Axois
      .get(
        `/admin/get-students?search=${value}&&value=${search}`
      )
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        setError("");
      })

      .catch((err) => {
        setIsLoading(false);

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
    <ScrollView
      style={{
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: "white",
      }}
    >

<View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 50,
          }}
        >
          <Image source={studentDetailsImg} style={styles.newAdmissionImg} />
          <Text
            style={{
              fontSize: 25,
              fontWeight: 500,
              borderColor: "#ccc",
              borderRightWidth: 2,
              paddingRight: 20,
            }}
          >
            Student Details
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: "#ccc",
            marginBottom: 10,
          }}
        />
        <Text style={{ color: "grey", fontSize: 17, paddingBottom: 50 }}>
          Home &gt; Admission &gt;{" "}
          <Text style={{ fontWeight: 500 }}>Student Details</Text>
        </Text>
      </View>
      

      <View style={{ gap: 20 }}>
        <View style={{ zIndex: 999 }}>
          <DropDownPicker
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
            listMode="SCROLLVIEW"
            style={{
              backgroundColor: "#FAFAFC",
              borderColor: "#dfdfdf",
              borderRadius: 10,
            }}
            selectedItemContainerStyle={{
              backgroundColor: "#f2f2f2",
            }}
            dropDownContainerStyle={{
              borderColor: "#dfdfdf",
            }}
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
          borderColor: "#ccc",
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 10,
          // padding: 10,
          backgroundColor: "#FAFAFC",
          marginBottom: 50,
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => <Item data={item} />}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={
            <View style={{ backgroundColor: "#ccc", height: 1 }} />
          }
          ListEmptyComponent={
            <Text style={{ alignSelf: "center", color: "grey", padding: 30 }}>
              Empty
            </Text>
          }
          ListHeaderComponent={
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  padding: 10,
                  paddingTop: 15,
                  flex: 2,
                  backgroundColor: "#ddd",
                  borderTopLeftRadius: 8,
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  padding: 10,
                  paddingTop: 15,
                  flex: 1,
                  backgroundColor: "#ccc",
                  textAlign: "center",
                }}
              >
                Adm No
              </Text>
              <Text
                style={{
                  padding: 10,
                  paddingTop: 15,
                  flex: 1,
                  backgroundColor: "#ddd",
                  textAlign: "center",
                  borderTopRightRadius: 8,
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
  );
}
