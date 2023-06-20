import React from "react";
import {
  Text,
  Image,
  Alert,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "../../../styles/styles";
import admissionImg from "../../../imgs/adminImages/item1.png";
import DropDownPicker from "react-native-dropdown-picker";
import Axois from "../../../stores/Axios";
import Loader from "../../../components/common/Loader";
import { AdminCheckLogin } from "../../../stores/CheckLogin";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useFocusEffect } from "@react-navigation/native"
import { useSearchParams } from "expo-router";
import {useNavigation} from "expo-router"

import Camera from "../../../components/admin/admission/Camera";

const TextInputComponent = ({ value, onChangeText, name, ...props }) => (
  <TextInput
    value={value}
    onChangeText={(value) => onChangeText(name, value)}
    {...props}
  />
);

export default function EditStudents() {
  router = useRouter();
  navigation = useNavigation();

  const params = useSearchParams();

  const [imageUri, setImageUri] = useState();

  const [camera, setCamera] = React.useState(false);
  const [focus, setFocus] = React.useState(false);

  // For drop down
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);

  const [disabled, setDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState({
    admissionDate: "",
    applicationNo: "",
    name: "",
    aadhaarNo: "",
    phone: "",
    gender: "",
    nameOfParent: "",
    occupationOfParent: "",
    relationshipWithGuardian: "",
    addressOfGuardian: "",
    religion: "",
    caste: "",
    category: "",
    linguisticMinority: "",
    obc: false,
    dob: "",
    class: 11,
    course: "",
    secondLanguage: "",
    status: "",

    rank: NaN,
    wgpa: NaN,
    admissionCategory: "",

    sslcNameOfBoard: "",
    sslcRegisterNo: "",
    sslcPassingTime: "",

    tcNumber: "",
    tcDate: "",
    tcSchool: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      setFocus(true);
      return () => {
        setFocus(false);
      };
    }, [])
  );

  function getData() {
    Axois.get(`admin/get-student?studentId=${params._id}`)
      .then((res) => {

        var data = res.data

        delete data._id;
        data.status = "permanent"

        setData(data);
      })
      .catch((err) => {
        setError(err.res.data)
      });

    Axois.get(`admin/get-student-photo?studentId=${params._id}`)
      .then((response) => {
        setImageUri("data:image/jpeg;base64," + response.data);
      })

      .catch((err) => {});
  }

  function handleClick() {
    if (data.linguisticMinority === "") {
      delete data.linguisticMinority;
    }


        if (!isEmpty()) {
          setError("");
          setIsLoading(true);
          setDisabled(true);

          Axois.put(`admin/edit-student?studentId=${params._id}`, data)
          
            .then((response) => {
              const formData = new FormData();
              formData.append("file", {
                uri: imageUri,
                type: "image/png",
                name: "file.png",
              });

              Axois.post(
                `admin/upload-student-photo?studentId=${params._id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
              ).catch((err) => {
                if (err?.response?.status == 401) {
                  Alert.alert("Status", err.response.data);
                } else if (err?.response?.status == 500) {
                  Alert.alert(
                    "Status",
                    err.response.data,
                    "Internal server error"
                  );
                } else if (err?.response?.status === undefined) {
                  Alert.alert("Status", "Server connection error");
                } else {
                  Alert.alert("Status", err.response.data);
                }
              });
              

              Alert.alert("Status", "new admission sucssesfull");
              setIsLoading(false);
              makeEmpty();
              setDisabled(false);
            })
            .catch((err) => {
              setIsLoading(false);
              setDisabled(false);

              console.log(`admin/edit-student?studentId=${params._id}`)

              if (err?.response?.status == 401) {
                Alert.alert("Status", err.response.data);
              } else if (err?.response?.status == 500) {
                Alert.alert(
                  "Status",
                  err.response.data,
                  "Internal server error"
                );
              } else if (err?.response?.status === undefined) {
                Alert.alert("Status", "Server connection error");
              } else {
                Alert.alert("Status", err.response.data);
              }
            });
        } else {
          setError("Check all field for empty data");
        }
  }

  function isEmpty() {
    for (const key in data) {
      if (key === "linguisticMinority" || key === "wgpa" || key === "rank") {
        continue;
      } else if (data[key] === "") {
        return true;
      }
    }
    return false;
  }

  function makeEmpty() {
    setData({
      admissionDate: "",
      applicationNo: "",
      name: "",
      aadhaarNo: "",
      phone: "",
      gender: "",
      nameOfParent: "",
      occupationOfParent: "",
      relationshipWithGuardian: "",
      addressOfGuardian: "",
      religion: "",
      caste: "",
      category: "",
      linguisticMinority: "",
      obc: false,
      dob: "",
      class: 11,
      course: "",
      secondLanguage: "",
      status: "",

      rank: NaN,
      wgpa: NaN,
      admissionCategory: "",

      sslcNameOfBoard: "",
      sslcRegisterNo: "",
      sslcPassingTime: "",

      tcNumber: "",
      tcDate: "",
      tcSchool: "",
    });
    setImageUri();
  }

  function handleChange(name, value) {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AdminCheckLogin(setLoading, router.replace, (link = "/login"));

    getData();
  }, []);

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      cropImage(result.assets[0]);
    }
  };

  async function cropImage(imageData) {
    const { uri } = await ImageManipulator.manipulateAsync(
      imageData.uri,
      [
        {
          crop: {
            originX: 0,
            originY: 0,
            width: imageData.width,
            height: imageData.width,
          },
        },
        { resize: { width: 320 } },
      ],
      { compress: 1, format: "png" }
    );

    setImageUri(uri);
  }

  return (
    <>
    {focus && getData()}
      <Loader show={loading} />

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
            <Image source={admissionImg} style={styles.newAdmissionImg} />
            <Text
              style={{
                fontSize: 25,
                fontWeight: 500,
                borderColor: "#ccc",
                borderRightWidth: 2,
                paddingRight: 20,
              }}
            >
              Edit Students
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
            <Text style={{ fontWeight: 500 }}>Edit Students</Text>
          </Text>
        </View>

        <Text style={styles.newAdmissionHeading}>
          Field marked with <Text style={styles.mandatory}>*</Text> are
          mandatory.
        </Text>

        <View>
          <Text style={styles.newAdmissionText}>
            Admission Date<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            keyboardType="numeric"
            style={styles.input}
            name="admissionDate"
            onChangeText={handleChange}
            placeholder="dd-mm-yyyy"
            maxLength={10}
            value={data.admissionDate}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Application No.<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            keyboardType="numeric"
            style={styles.input}
            name="applicationNo"
            onChangeText={(name, value) => {
              handleChange(name, parseInt(value.replace(/[^0-9]/g, "")));
            }}
            value={data.applicationNo?.toString()}
          />
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.newAdmissionText}>
            Name of Student<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            style={styles.input}
            name="name"
            onChangeText={handleChange}
            value={data.name}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Aadhaar No.<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            keyboardType="numeric"
            style={styles.input}
            name="aadhaarNo"
            onChangeText={(name, value) => {
              handleChange(name, parseInt(value.replace(/[^0-9]/g, "")));
            }}
            maxLength={14}
            value={data.aadhaarNo?.toString()}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Phone No.<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            keyboardType="numeric"
            style={styles.input}
            name="phone"
            onChangeText={(name, value) => {
              handleChange(name, parseInt(value.replace(/[^0-9]/g, "")));
            }}
            maxLength={10}
            value={data.phone?.toString()}
          />
        </View>
        <View style={{ zIndex: 999 }}>
          <Text style={styles.newAdmissionText}>
            Gender<Text style={styles.mandatory}>*</Text>
          </Text>
          <DropDownPicker
            open={open1}
            value={data.gender}
            items={[
              { label: "Female", value: "female" },
              { label: "Male", value: "male" },
              { label: "Other", value: "other" },
            ]}
            setOpen={setOpen1}
            placeholder="Select gender"
            setValue={(value) => {
              handleChange("gender", value());
            }}
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
              elevation: 4,
            }}
          />
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.newAdmissionText}>
            Name of Parent/Guardian<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            style={styles.input}
            name="nameOfParent"
            onChangeText={handleChange}
            value={data.nameOfParent}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Occupation of Parent/Guardian<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            style={styles.input}
            name="occupationOfParent"
            onChangeText={handleChange}
            value={data.occupationOfParent}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Relationship of the student to the guardian
            <Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            style={styles.input}
            name="relationshipWithGuardian"
            onChangeText={handleChange}
            value={data.relationshipWithGuardian}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Address of Guardian<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            style={styles.input}
            name="addressOfGuardian"
            onChangeText={handleChange}
            value={data.addressOfGuardian}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Religion<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            style={styles.input}
            name="religion"
            onChangeText={handleChange}
            value={data.religion}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Caste<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            style={styles.input}
            name="caste"
            onChangeText={handleChange}
            value={data.caste}
          />
        </View>
        <View style={{zIndex: open8 ? 1000 : 1}}>
          <Text style={styles.newAdmissionText}>
            Category<Text style={styles.mandatory}>*</Text>
          </Text>
          <DropDownPicker
            open={open8}
            value={data.category}
            placeholder="Select a category"
            items={[
              { label: "general", value: "general",},
              { label: "HinOBC", value: "HinOBC" },
              { label: "ChristOBC", value: "ChristOBC" },
              { label: "OEC", value: "OEC" },
              { label: "muslim", value: "muslim" },
              { label: "SC", value: "SC" },
              { label: "ST", value: "ST" },
            ]}
            setOpen={setOpen8}
            setValue={(value) => {
              handleChange("category", value());
            }}
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
              elevation: 4,
            }}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            If the student belongs to linguistic minority specify the language.
          </Text>
          <TextInputComponent
            style={styles.input}
            name="linguisticMinority"
            onChangeText={handleChange}
            value={data.linguisticMinority}
          />
        </View>
        <View style={{ zIndex: 999 }}>
          <Text style={styles.newAdmissionText}>
            Does the student belongs to OBC
            <Text style={styles.mandatory}>*</Text>
          </Text>
          <DropDownPicker
            open={open2}
            value={data.obc}
            items={[
              { label: "No", value: false, selected: true },
              { label: "Yes", value: true },
            ]}
            setOpen={setOpen2}
            setValue={(value) => {
              handleChange("obc", value());
            }}
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
              elevation: 4,
            }}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            DOB<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            keyboardType="numeric"
            style={styles.input}
            name="dob"
            onChangeText={handleChange}
            placeholder="dd-mm-yyyy"
            maxLength={10}
            value={data.dob}
          />
        </View>

        <View style={styles.divider} />
        <View style={{ zIndex: open3 ? 1000 : 1 }}>
          <Text style={styles.newAdmissionText}>
            Class<Text style={styles.mandatory}>*</Text>
          </Text>
          <DropDownPicker
            open={open3}
            value={data.class}
            items={[
              { label: "8", value: 8 },
              { label: "9", value: 9 },
              { label: "10", value: 10 },
              { label: "11", value: 11 },
              { label: "12", value: 12 },
            ]}
            setOpen={setOpen3}
            placeholder="Select class"
            setValue={(value) => {
              handleChange("class", value());
            }}
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
              elevation: 4,
            }}
          />
        </View>
        <View style={{ zIndex: open4 ? 1000 : 1 }}>
          <Text style={styles.newAdmissionText}>
            Course<Text style={styles.mandatory}>*</Text>
          </Text>
          <DropDownPicker
            open={open4}
            value={data.course}
            items={[
              {
                label: "PCMB - Physics, Chemistry, Maths, Biology",
                value: "PCMB",
              },
              {
                label: "PCMC - Physics, Chemistry, Maths, Computer Science",
                value: "PCMC",
              },
              {
                label:
                  "COMMERCE - Bussiness, Computer Applications, Economics, Accountancy",
                value: "COMMERCE",
              },
            ]}
            setOpen={setOpen4}
            placeholder="Select course"
            setValue={(value) => {
              handleChange("course", value());
            }}
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
              elevation: 4,
            }}
          />
        </View>
        <View style={{ zIndex: open5 ? 1000 : 1 }}>
          <Text style={styles.newAdmissionText}>
            Second language<Text style={styles.mandatory}>*</Text>
          </Text>
          <DropDownPicker
            open={open5}
            value={data.secondLanguage}
            items={[
              { label: "Malayalam", value: "Malayalam" },
              { label: "Arabic", value: "Arabic" },
              { label: "Hindi", value: "Hindi" },
            ]}
            setOpen={setOpen5}
            placeholder="Select second language"
            setValue={(value) => {
              handleChange("secondLanguage", value());
            }}
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
              elevation: 4,
            }}
          />
        </View>
        <View style={{ zIndex: open6 ? 1000 : 1 }}>
          <Text style={styles.newAdmissionText}>
            Student Status<Text style={styles.mandatory}>*</Text>
          </Text>
          <DropDownPicker
            open={open6}
            value={data.status}
            items={[
              { label: "Permanent", value: "permanent", selected: true },
              { label: "Temporary", value: "temporary" },
            ]}
            setOpen={setOpen6}
            placeholder="Select status"
            setValue={(value) => {
              handleChange("status", value());
            }}
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
              elevation: 4,
            }}
          />
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.newAdmissionText}>
            WGPA
          </Text>
          <TextInputComponent
            keyboardType="numeric"
            style={styles.input}
            name="wgpa"
            onChangeText={(name, value) => {
              handleChange(name, parseInt(value.replace(/[^0-9]/g, "")));
            }}
            value={ isNaN(data.wgpa) ? "" : data.wgpa?.toString()}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Rank
          </Text>
          <TextInputComponent
            keyboardType="numeric"
            style={styles.input}
            name="rank"
            onChangeText={(name, value) => {
              handleChange(name, parseInt(value.replace(/[^0-9]/g, "")));
            }}
            value={isNaN(data.rank) ? "" :data.rank?.toString()}
          />
        </View>
        <View style={{ zIndex: open7 ? 1000 : 1 }}>
          <Text style={styles.newAdmissionText}>
            Admission category<Text style={styles.mandatory}>*</Text>
          </Text>
          <DropDownPicker
            open={open7}
            value={data.admissionCategory}
            items={[
              { label: "Merit", value: "Merit" },
              { label: "Sports", value: "Sports" },
              { label: "IED", value: "IED" },
              { label: "Management", value: "Management" },
            ]}
            setOpen={setOpen7}
            placeholder="Select category"
            setValue={(value) => {
              handleChange("admissionCategory", value());
            }}
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
              elevation: 4,
            }}
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.newAdmissionHeading}>
          Details of Qualifiying Examination
        </Text>
        <View>
          <Text style={styles.newAdmissionText}>
            Name of Board<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            style={styles.input}
            name="sslcNameOfBoard"
            onChangeText={handleChange}
            value={data.sslcNameOfBoard}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Register No.<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            keyboardType="numeric"
            style={styles.input}
            name="sslcRegisterNo"
            onChangeText={(name, value) => {
              handleChange(name, parseInt(value.replace(/[^0-9]/g, "")));
            }}
            value={data.sslcRegisterNo?.toString()}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Month & Year of passing<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            maxLength={7}
            keyboardType="numeric"
            style={styles.input}
            name="sslcPassingTime"
            onChangeText={handleChange}
            placeholder="mm-yyyy / month-yyyy"
            value={data.sslcPassingTime?.toString()}
          />
        </View>

        <View style={styles.divider} />
        <Text style={styles.newAdmissionHeading}>
          Details of Transfer certificate produced on Admission
        </Text>

        <View>
          <Text style={styles.newAdmissionText}>
            Number<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            keyboardType="numeric"
            style={styles.input}
            name="tcNumber"
            // onChangeText={(name, value) => {
            //   handleChange(name, parseInt(value.replace(/[^0-9]/g, "")));
            // }}
            onChangeText={handleChange}
            value={data.tcNumber}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Date<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            keyboardType="numeric"
            style={styles.input}
            name="tcDate"
            onChangeText={handleChange}
            placeholder="dd-mm-yyyy"
            maxLength={10}
            value={data.tcDate}
          />
        </View>
        <View>
          <Text style={styles.newAdmissionText}>
            Issued School/Institution<Text style={styles.mandatory}>*</Text>
          </Text>
          <TextInputComponent
            style={styles.input}
            name="tcSchool"
            onChangeText={handleChange}
            value={data.tcSchool}
          />
        </View>
        <View style={styles.divider} />
        <View style={{ alignItems: "center" }}>
          {imageUri && (
            <Image
              style={{ margin: 20 }}
              source={{ uri: imageUri }}
              width={320}
              height={320}
            />
          )}
          {/* {base64 && (
            <Image
              style={{ margin: 20 }}
              source={{ uri: imageUri }}
              width={320}
              height={320}
            />
          )} */}
        </View>
        <View style={{ gap: 10, paddingVertical: 10 }}>
          <TouchableOpacity
            onPress={showImagePicker}
            style={{
              ...styles.btn,
            }}
          >
            <Text style={styles.btnText}>Choose Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setCamera(true);
            }}
            style={{
              ...styles.btn,
            }}
          >
            <Text style={styles.btnText}>Take Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          onPress={disabled ? null : handleClick}
          style={{
            ...styles.btn,
            backgroundColor: disabled ? "grey" : "#28B4AB",
            marginTop: 30,
          }}
        >
          <Text style={styles.btnText}>SUBMIT</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "red",
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {error}
        </Text>

        <ActivityIndicator
          animating={isLoading}
          size="large"
          color="#28B4AB"
          style={{ marginTop: 20, marginBottom: 40 }}
        />
      </ScrollView>
      {camera && focus && (
        <Camera
          imageUri={imageUri}
          setImageUri={setImageUri}
          setCamera={setCamera}
        />
      )}
    </>
  );
}
