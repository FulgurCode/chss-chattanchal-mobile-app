import { View, Text, ScrollView } from "react-native";
import { useSearchParams } from "expo-router";
import styles from "../../../styles/styles";

export default function Profile() {
  const data = useSearchParams();
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
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Class:</Text>
          <Text style={{ flex: 1 }}> {data.class}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Name:</Text>
          <Text style={{ flex: 1 }}> {data.name}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Aadhaar No:</Text>
          <Text style={{ flex: 1 }}> {data.aadhaarNo}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Admission Date:</Text>
          <Text style={{ flex: 1 }}> {data.admissionDate}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Admission No:</Text>
          <Text style={{ flex: 1 }}> {data.admissionNo}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Application No:</Text>
          <Text style={{ flex: 1 }}> {data.applicationNo}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Caste:</Text>
          <Text style={{ flex: 1 }}> {data.caste}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Category:</Text>
          <Text style={{ flex: 1 }}> {data.category}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Course:</Text>
          <Text style={{ flex: 1 }}> {data.course}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Dob:</Text>
          <Text style={{ flex: 1 }}> {data.dob}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Gender:</Text>
          <Text style={{ flex: 1 }}> {data.gender}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Name of Parent:</Text>
          <Text style={{ flex: 1 }}> {data.nameOfParent}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Occupation of parent:</Text>
          <Text style={{ flex: 1 }}> {data.occupationOfParent}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Phone:</Text>
          <Text style={{ flex: 1 }}> {data.phone}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Linguistic Minority:</Text>
          <Text style={{ flex: 1 }}> {data.linguisticMinority}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>OBC:</Text>
          <Text style={{ flex: 1 }}> {data.obc}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Relationship with guardian:</Text>
          <Text style={{ flex: 1 }}> {data.relationshipWithGuardian}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Religion:</Text>
          <Text style={{ flex: 1 }}> {data.religion}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Second language:</Text>
          <Text style={{ flex: 1 }}> {data.secondLanguage}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Status:</Text>
          <Text style={{ flex: 1 }}> {data.status}</Text>
        </View>

        <Text style={{ ...styles.newAdmissionHeading, alignSelf: "center" }}>
          Details of Transfer certificate produced on Admission
        </Text>

        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Number:</Text>
          <Text style={{ flex: 1 }}> {data.number}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Date:</Text>
          <Text style={{ flex: 1 }}> {data.date}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>School:</Text>
          <Text style={{ flex: 1 }}> {data.school}</Text>
        </View>

        <Text style={{ ...styles.newAdmissionHeading, alignSelf: "center" }}>
          Details of Qualifiying Examination
        </Text>

        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Name of board:</Text>
          <Text style={{ flex: 1 }}> {data.nameOfBoard}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Passing time:</Text>
          <Text style={{ flex: 1 }}> {data.passingTime}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ flex: 1 }}>Register No:</Text>
          <Text style={{ flex: 1 }}> {data.registerNo}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
