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
import styles from "../../../../styles/styles";
import admissionImg from "../../../../imgs/adminImages/item1.png";
import DropDownPicker from "react-native-dropdown-picker";
import Axois from "../../../../stores/Axios";

const TextInputComponent = ({ value, onChangeText, name, ...props }) => (
  <TextInput
    value={value}
    onChangeText={(value) => onChangeText(name, value)} //... Bind the name here
    {...props}
  />
);

export default function NewAdmission() {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
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
    class: "",
    course: "",
    secondLanguage: "",
    status: "",
    qualifyingExamDetails: {
      nameOfBoard: "",
      registerNo: "",
      passingTime: "",
    },
    tcDetailsOnAdmission: {
      number: "",
      date: "",
      school: "",
    },
  });

  function handleClick() {
    const regddmmyyyy =
      /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    const regmonthyyyy =
      /^(january|jan|01|february|feb|02|march|mar|03|april|apr|04|may|05|june|jun|06|july|jul|07|august|aug|08|september|sep|09|october|oct|10|november|nov|11|december|dec|12)-(\d{4})$/i;

    if (data.linguisticMinority === "") {
      delete data.linguisticMinority;
    }

    if (
      regddmmyyyy.test(data.admissionDate) &&
      regddmmyyyy.test(data.dob) &&
      regddmmyyyy.test(data.tcDetailsOnAdmission.date)
    ) {
      if (regmonthyyyy.test(data.qualifyingExamDetails.passingTime)) {
        if (!isEmpty()) {
          setError("");
          setIsLoading(true);
          setDisabled(true);

          Axois
            .post("/admin/new-admission", data)
            .then(() => {
              Alert.alert("Status", "new admission sucssesfull");
              setIsLoading(false);
              makeEmpty();
              setDisabled(false);
            })
            .catch((err) => {
              setIsLoading(false);
              setDisabled(false);

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
      } else {
        setError("Check Date field of Month and year of passing");
      }
    } else {
      setError("Check Date field of Admission date, Dob , or Date");
    }
  }

  function isEmpty() {
    for (const key in data) {
      if (key === "linguisticMinority") {
        continue;
      } else if (data[key] === "") {
        return true;
      }
    }
    for (const key in data.tcDetailsOnAdmission) {
      if (data.tcDetailsOnAdmission[key] === "") {
        return true;
      }
    }
    for (const key in data.qualifyingExamDetails) {
      if (data.qualifyingExamDetails[key] === "") {
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
      class: "",
      course: "",
      secondLanguage: "",
      status: "",
      qualifyingExamDetails: {
        nameOfBoard: "",
        registerNo: "",
        passingTime: "",
      },
      tcDetailsOnAdmission: {
        number: "",
        date: "",
        school: "",
      },
    });
  }

  function handleChange(name, value) {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleChangeQualifyingExamDetails(name, value) {
    setData((prevData) => ({
      ...prevData,
      qualifyingExamDetails: {
        ...prevData.qualifyingExamDetails,
        [name]: value,
      },
    }));
  }

  function handleChangeTcDetailsOnAdmission(name, value) {
    setData((prevData) => ({
      ...prevData,
      tcDetailsOnAdmission: {
        ...prevData.tcDetailsOnAdmission,
        [name]: value,
      },
    }));
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
            New Admission
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
          <Text style={{ fontWeight: 500 }}>New Admission</Text>
        </Text>
      </View>

      <Text style={styles.newAdmissionHeading}>
        Field marked with <Text style={styles.mandatory}>*</Text> are mandatory.
      </Text>

      <View>
        <Text style={styles.newAdmissionText}>
          Admission Date<Text style={styles.mandatory}>*</Text>
        </Text>
        <TextInputComponent
          style={styles.input}
          name="admissionDate"
          onChangeText={handleChange}
          placeholder="dd-mm-yyyy"
          maxLength={10}
          value={data.admissionDate}
        />
        {/* <DateField /> */}
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
          value={data.applicationNo.toString()}
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
          style={styles.input}
          name="aadhaarNo"
          onChangeText={handleChange}
          maxLength={14}
          value={data.aadhaarNo}
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
          value={data.phone.toString()}
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
      <View>
        <Text style={styles.newAdmissionText}>
          Category<Text style={styles.mandatory}>*</Text>
        </Text>
        <TextInputComponent
          style={styles.input}
          name="category"
          onChangeText={handleChange}
          value={data.category}
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
          Does the student belongs to OBC<Text style={styles.mandatory}>*</Text>
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
          }}
        />
      </View>
      <View>
        <Text style={styles.newAdmissionText}>
          DOB<Text style={styles.mandatory}>*</Text>
        </Text>
        <TextInputComponent
          style={styles.input}
          name="dob"
          onChangeText={handleChange}
          placeholder="dd-mm-yyyy"
          maxLength={10}
          value={data.dob}
        />
      </View>

      <View style={styles.divider} />
      <View>
        <Text style={styles.newAdmissionText}>
          Class<Text style={styles.mandatory}>*</Text>
        </Text>
        <TextInputComponent
          keyboardType="numeric"
          style={styles.input}
          name="class"
          onChangeText={(name, value) => {
            handleChange(name, parseInt(value.replace(/[^0-9]/g, "")));
          }}
          maxLength={2}
          value={data.class.toString()}
        />
      </View>
      <View>
        <Text style={styles.newAdmissionText}>
          Course<Text style={styles.mandatory}>*</Text>
        </Text>
        <TextInputComponent
          style={styles.input}
          name="course"
          onChangeText={handleChange}
          value={data.course}
        />
      </View>
      <View>
        <Text style={styles.newAdmissionText}>
          Second language<Text style={styles.mandatory}>*</Text>
        </Text>
        <TextInputComponent
          style={styles.input}
          name="secondLanguage"
          onChangeText={handleChange}
          value={data.secondLanguage}
        />
      </View>
      <View style={{ zIndex: 999 }}>
        <Text style={styles.newAdmissionText}>
          Student Status<Text style={styles.mandatory}>*</Text>
        </Text>
        <DropDownPicker
          open={open3}
          value={data.status}
          items={[
            { label: "Permanent", value: "permanent", selected: true },
            { label: "Temporary", value: "temporary" },
          ]}
          setOpen={setOpen3}
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
          name="nameOfBoard"
          onChangeText={handleChangeQualifyingExamDetails}
          value={data.qualifyingExamDetails.nameOfBoard}
        />
      </View>
      <View>
        <Text style={styles.newAdmissionText}>
          Register No.<Text style={styles.mandatory}>*</Text>
        </Text>
        <TextInputComponent
          keyboardType="numeric"
          style={styles.input}
          name="registerNo"
          onChangeText={(name, value) => {
            handleChangeQualifyingExamDetails(
              name,
              parseInt(value.replace(/[^0-9]/g, ""))
            );
          }}
          value={data.qualifyingExamDetails.registerNo.toString()}
        />
      </View>
      <View>
        <Text style={styles.newAdmissionText}>
          Month & Year of passing<Text style={styles.mandatory}>*</Text>
        </Text>
        <TextInputComponent
          style={styles.input}
          name="passingTime"
          onChangeText={handleChangeQualifyingExamDetails}
          placeholder="mm-yyyy / month-yyyy"
          value={data.qualifyingExamDetails.passingTime}
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
          style={styles.input}
          name="number"
          onChangeText={handleChangeTcDetailsOnAdmission}
          value={data.tcDetailsOnAdmission.number}
        />
      </View>
      <View>
        <Text style={styles.newAdmissionText}>
          Date<Text style={styles.mandatory}>*</Text>
        </Text>
        <TextInputComponent
          style={styles.input}
          name="date"
          onChangeText={handleChangeTcDetailsOnAdmission}
          placeholder="dd-mm-yyyy"
          maxLength={10}
          value={data.tcDetailsOnAdmission.date}
        />
      </View>
      <View>
        <Text style={styles.newAdmissionText}>
          Issued School/Institution<Text style={styles.mandatory}>*</Text>
        </Text>
        <TextInputComponent
          style={styles.input}
          name="school"
          onChangeText={handleChangeTcDetailsOnAdmission}
          value={data.tcDetailsOnAdmission.school}
        />
      </View>
      <View style={styles.divider} />

      <TouchableOpacity
        onPress={disabled ? null : handleClick}
        style={{
          ...styles.btn,
          backgroundColor: disabled ? "grey" : "#28B4AB",
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
  );
}
