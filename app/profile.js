import { View, Text, ScrollView, Image } from "react-native";
import { useSearchParams } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { Context } from "../stores/Context";
import Axios from "../stores/Axios";
import profileImg from "../imgs/profile.png";

import { useRouter } from "expo-router";

export default function Profile() {
  const [img, setImg] = useState(profileImg);

  const { styles } = useContext(Context);

  const data = useSearchParams();
  const router = useRouter();

  function getImg() {
    Axios.get(`${data.user}/get-student-photo?studentId=${data._id}`)
      .then((res) => {
        setImg("data:img/jpeg;base64," + res.data);
      })
      .catch((err) => {
        if (err.response == undefined) {
          setImg(profileImg);
        } else {
          setImg(profileImg);
        }
      });
  }

  useEffect(getImg, [data]);

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: styles.common.backgroundColor,
          flex: 1,
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: styles.common.inputBackground,
            flex: 1,
            width: 350,
            gap: 15,
            marginTop: 50,
            marginBottom: 50,

            borderColor: styles.common.borderColor,
            borderWidth: 1,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={typeof img == "number" ? img : { uri: img, scale: 1 }}
              style={{ height: 160, width: 160, borderRadius: 10 }}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text
              style={{ flex: 1, fontWeight: 800, color: styles.common.color }}
            >
              Name:
            </Text>
            <Text
              style={{ flex: 1, fontWeight: 800, color: styles.common.color }}
            >
              {" "}
              {data.name}
            </Text>
          </View>
          {data.class == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Class:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.class}
              </Text>
            </View>
          )}
          {data.aadhaarNo == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Aadhaar No:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.aadhaarNo}
              </Text>
            </View>
          )}
          {data.admissionDate == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Admission Date:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.admissionDate}
              </Text>
            </View>
          )}
          {data.admissionNo == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Admission No:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.admissionNo}
              </Text>
            </View>
          )}
          {data.applicationNo == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Application No:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.applicationNo}
              </Text>
            </View>
          )}
          {data.caste == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Caste:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.caste}
              </Text>
            </View>
          )}
          {data.category == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Category:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.category}
              </Text>
            </View>
          )}
          {data.course == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Course:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.course}
              </Text>
            </View>
          )}
          {data.dob == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>Dob:</Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.dob}
              </Text>
            </View>
          )}
          {data.gender == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Gender:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.gender}
              </Text>
            </View>
          )}
          {data.nameOfParent == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Name of Parent:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.nameOfParent}
              </Text>
            </View>
          )}
          {data.occupationOfParent == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Occupation of parent:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.occupationOfParent}
              </Text>
            </View>
          )}
          {data.phone == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Phone:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.phone}
              </Text>
            </View>
          )}
          {data.linguisticMinority == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Linguistic Minority:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.linguisticMinority}
              </Text>
            </View>
          )}
          {data.obc == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>OBC:</Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.obc}
              </Text>
            </View>
          )}
          {data.relationshipWithGuardian == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Relationship with guardian:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.relationshipWithGuardian}
              </Text>
            </View>
          )}
          {data.religion == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Religion:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.religion}
              </Text>
            </View>
          )}
          {data.secondLanguage == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Second language:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.secondLanguage}
              </Text>
            </View>
          )}
          {data.status == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Status:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.status}
              </Text>
            </View>
          )}

          {data.rank == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>Rank:</Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.rank}
              </Text>
            </View>
          )}
          {data.wgpa == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>WGPA:</Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.wgpa}
              </Text>
            </View>
          )}
          {data.admissionCategory == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Admission category:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.admissionCategory}
              </Text>
            </View>
          )}

          {data.tcNumber == undefined &&
          data.tcDate == undefined &&
          data.tcSchool == undefined ? (
            ""
          ) : (
            <Text
              style={{ ...styles.newAdmissionHeading, alignSelf: "center" }}
            >
              Details of Transfer certificate produced on Admission
            </Text>
          )}

          {data.tcNumber == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Number:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.tcNumber}
              </Text>
            </View>
          )}
          {data.tcDate == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>Date:</Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.tcDate}
              </Text>
            </View>
          )}
          {data.tcSchool == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                School:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.tcSchool}
              </Text>
            </View>
          )}
          {data.sslcNameOfBoard == undefined &&
          data.sslcPassingTime == undefined &&
          data.sslcRegisterNo == undefined ? (
            ""
          ) : (
            <Text
              style={{ ...styles.newAdmissionHeading, alignSelf: "center" }}
            >
              Details of Qualifiying Examination
            </Text>
          )}
          {data.sslcNameOfBoard == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Name of board:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.sslcNameOfBoard}
              </Text>
            </View>
          )}
          {data.sslcPassingTime == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Passing time:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.sslcPassingTime}
              </Text>
            </View>
          )}
          {data.sslcRegisterNo == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ flex: 1, color: styles.common.color }}>
                Register No:
              </Text>
              <Text style={{ flex: 1, color: styles.common.color }}>
                {" "}
                {data.sslcRegisterNo}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
