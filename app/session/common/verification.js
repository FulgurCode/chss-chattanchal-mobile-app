import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import Axios from "../../../stores/Axios";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import verificationImg from "../../../imgs/adminImages/item3.png";

export default function Verification() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  function loadData() {
    setError("");
    Axios.get("teacher/students-to-verify")
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err.response == undefined) {
          setError("Server connection error");
        } else {
          setError(err.response.data);
        }
      });
  }

  function verifyStudent(id) {
    setError("");
    Axios.patch(`teacher/verify-student?studentId=${id}`)
      .then((res) => {
        Alert.alert("Verification", "Student verified successfully!")
        loadData();
      })
      .catch((err) => {
        if (err.response == undefined) {
          setError("Server connection error");
        } else {
          setError(err.response.data);
        }
      });
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredData = data.filter((item) => {
    const { name, admissionNo } = item;
    const searchFields = `${name}${admissionNo}`.toLowerCase();
    return searchFields.includes(searchQuery.toLowerCase());
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sortColumn) {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];

      if (typeof columnA === "string" && typeof columnB === "string") {
        if (isDate(columnA) && isDate(columnB)) {
          // Sort date strings
          const dateA = parseDate(columnA);
          const dateB = parseDate(columnB);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        } else if (!isNaN(parseFloat(columnA)) && !isNaN(parseFloat(columnB))) {
          // Sort number strings
          const numA = parseFloat(columnA);
          const numB = parseFloat(columnB);
          return sortOrder === "asc" ? numA - numB : numB - numA;
        } else {
          // Sort character strings
          if (columnA < columnB) {
            return sortOrder === "asc" ? -1 : 1;
          }
          if (columnA > columnB) {
            return sortOrder === "asc" ? 1 : -1;
          }
        }
      }
    }
    return 0;
  });

  function isDate(dateString) {
    // Check if a string represents a valid date
    const dateRegex = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
    return dateRegex.test(dateString);
  }

  function parseDate(dateString) {
    // Parse a date string in format "DD-MM-YYYY" or "DD/MM/YYYY" to a Date object
    const [day, month, year] = dateString.split(/[./-]/);
    return new Date(year, month - 1, day);
  }

  const getSortIndicator = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  useEffect(loadData, []);

  return (
    <SafeAreaView
      style={{
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: "white",
        flex: 1
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
          <Image source={verificationImg}  style={styles.verificationImg} />
          <Text
            style={{
              fontSize: 25,
              fontWeight: 500,
              borderColor: "#ccc",
              borderRightWidth: 2,
              paddingRight: 20,
            }}
          >
           Verification
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
          <Text style={{ fontWeight: 500 }}>Verification</Text>
        </Text>
      </View>

    
      <View>
        <View
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <Text
            style={{ textAlign: "center", color: "red", left: 0, minWidth: 0 , marginBottom: 15}}
          >
            {error}
          </Text>
          <TextInput
            style={{...styles.input, marginBottom: 20}}
            placeholder="Search Name/Adm No"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          
        </View>

        <View style={styles.tableBox}>
          {/* Replace the <table> and related elements with equivalent components */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <TouchableOpacity onPress={() => handleSort("name")} style={{flex: 1, alignItems: "center"}}>
                <Text style={{color: "white"}}>Name {getSortIndicator("name")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSort("class")} style={{flex: 1, alignItems: "center"}}>
                <Text style={{color: "white"}}>Class {getSortIndicator("class")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSort("admissionNo")} style={{flex: 1, alignItems: "center"}}>
                <Text style={{color: "white"}}>Adm No. {getSortIndicator("admissionNo")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSort("dob")} style={{flex: 1, alignItems: "center"}}>
                <Text style={{color: "white"}}>D.O.B {getSortIndicator("dob")}</Text>
              </TouchableOpacity>
              <TouchableOpacity  style={{width: 60}}>
                <Text></Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tableBody}>
              {sortedData.length === 0 ? (
                <Text style={{padding: 20, borderBottomWidth: 1, borderColor: "#ddd"}}>No data found</Text>
              ) : (
                sortedData.map((item) => (
                  <View key={item._id} style={{...styles.tableRow, borderBottomWidth: 1, borderColor: "#ddd"}}>
                    <View style={{flex: 1, backgroundColor: "#eee", justifyContent: "center"}}><Text style={{textAlign: "center"}}>{item.name}</Text></View>
                    <View style={{flex: 1,  justifyContent: "center"}}><Text style={{textAlign: "center"}}>{item.class}</Text></View>
                    <View style={{flex: 1, backgroundColor: "#eee",  justifyContent: "center"}}><Text style={{textAlign: "center"}}>{item.admissionNo}</Text></View>
                    <View style={{flex: 1, justifyContent: "center", padding: 10}}><Text style={{textAlign: "center"}}>{item.dob}</Text></View>
                    <View style={{minWidth: 50, justifyContent: "center", paddingRight: 5}}><TouchableOpacity
                      style={{flex: 1, backgroundColor: "rgb(46, 194, 24)", justifyContent: "center", borderRadius: 50, maxWidth: 50, maxHeight: 25}}
                      onPress={() => verifyStudent(item._id)}
                    >
                      <Text style={{ textAlign: "center", color: "white", fontSize: 13}}>Verify</Text>
                    </TouchableOpacity></View>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
