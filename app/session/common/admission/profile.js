import { View, Text, ScrollView, Image } from "react-native";
import { useSearchParams } from "expo-router";
import styles from "../../../../styles/styles";
import { useEffect, useState } from "react";
import Axios from "../../../../stores/Axios";
import profileImg from "../../../../imgs/profile.png";

export default function Profile() {
  const [img, setImg] = useState(profileImg);

  const data = useSearchParams();

  function getImg() {
    Axios.get(`teacher/get-student-photo?studentId=${data._id}`)
      .then((res) => {
        setImg("data:img/jpeg;base64," + res.data);
      })
      .catch((err) => {
        if (err.respose == undefined){}
        else{
          // console.log(err.response.data);
          setImg(profileImg);
        }
        });
  }

  useEffect(getImg, [data]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#FAFAFC",
          flex: 1,
          width: 350,
          gap: 15,
          marginTop: 50,
          marginBottom: 50,

          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 10,
          padding: 20,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={typeof img == "number" ? img : { uri: img, scale: 1 }}
            style={{ height: 160, width: 160 }}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1, fontWeight: 800 }}>Name:</Text>
          <Text style={{ flex: 1, fontWeight: 800 }}> {data.name}</Text>
        </View>
        {data.class == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Class:</Text>
            <Text style={{ flex: 1 }}> {data.class}</Text>
          </View>
        )}
        {data.aadhaarNo == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Aadhaar No:</Text>
            <Text style={{ flex: 1 }}> {data.aadhaarNo}</Text>
          </View>
        )}
        {data.admissionDate == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Admission Date:</Text>
            <Text style={{ flex: 1 }}> {data.admissionDate}</Text>
          </View>
        )}
        {data.admissionNo == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Admission No:</Text>
            <Text style={{ flex: 1 }}> {data.admissionNo}</Text>
          </View>
        )}
        {data.applicationNo == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Application No:</Text>
            <Text style={{ flex: 1 }}> {data.applicationNo}</Text>
          </View>
        )}
        {data.caste == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Caste:</Text>
            <Text style={{ flex: 1 }}> {data.caste}</Text>
          </View>
        )}
        {data.category == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Category:</Text>
            <Text style={{ flex: 1 }}> {data.category}</Text>
          </View>
        )}
        {data.course == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Course:</Text>
            <Text style={{ flex: 1 }}> {data.course}</Text>
          </View>
        )}
        {data.dob == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Dob:</Text>
            <Text style={{ flex: 1 }}> {data.dob}</Text>
          </View>
        )}
        {data.gender == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Gender:</Text>
            <Text style={{ flex: 1 }}> {data.gender}</Text>
          </View>
        )}
        {data.nameOfParent == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Name of Parent:</Text>
            <Text style={{ flex: 1 }}> {data.nameOfParent}</Text>
          </View>
        )}
        {data.occupationOfParent == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Occupation of parent:</Text>
            <Text style={{ flex: 1 }}> {data.occupationOfParent}</Text>
          </View>
        )}
        {data.phone == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Phone:</Text>
            <Text style={{ flex: 1 }}> {data.phone}</Text>
          </View>
        )}
        {data.linguisticMinority == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Linguistic Minority:</Text>
            <Text style={{ flex: 1 }}> {data.linguisticMinority}</Text>
          </View>
        )}
        {data.obc == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>OBC:</Text>
            <Text style={{ flex: 1 }}> {data.obc}</Text>
          </View>
        )}
        {data.relationshipWithGuardian == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Relationship with guardian:</Text>
            <Text style={{ flex: 1 }}> {data.relationshipWithGuardian}</Text>
          </View>
        )}
        {data.religion == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Religion:</Text>
            <Text style={{ flex: 1 }}> {data.religion}</Text>
          </View>
        )}
        {data.secondLanguage == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Second language:</Text>
            <Text style={{ flex: 1 }}> {data.secondLanguage}</Text>
          </View>
        )}
        {data.status == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Status:</Text>
            <Text style={{ flex: 1 }}> {data.status}</Text>
          </View>
        )}
        {data.number == undefined &&
        data.date == undefined &&
        data.school == undefined ? (
          ""
        ) : (
          <Text style={{ ...styles.newAdmissionHeading, alignSelf: "center" }}>
            Details of Transfer certificate produced on Admission
          </Text>
        )}

        {data.number == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Number:</Text>
            <Text style={{ flex: 1 }}> {data.number}</Text>
          </View>
        )}
        {data.date == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Date:</Text>
            <Text style={{ flex: 1 }}> {data.date}</Text>
          </View>
        )}
        {data.school == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>School:</Text>
            <Text style={{ flex: 1 }}> {data.school}</Text>
          </View>
        )}
        {data.nameOfBoard == undefined &&
        data.passingTime == undefined &&
        data.registerNo == undefined ? (
          ""
        ) : (
          <Text style={{ ...styles.newAdmissionHeading, alignSelf: "center" }}>
            Details of Qualifiying Examination
          </Text>
        )}
        {data.nameOfBoard == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Name of board:</Text>
            <Text style={{ flex: 1 }}> {data.nameOfBoard}</Text>
          </View>
        )}
        {data.passingTime == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Passing time:</Text>
            <Text style={{ flex: 1 }}> {data.passingTime}</Text>
          </View>
        )}
        {data.registerNo == undefined ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ flex: 1 }}>Register No:</Text>
            <Text style={{ flex: 1 }}> {data.registerNo}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
