import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={{ padding: 10, gap: 10 }}>
      <Text style={{ fontWeight: "bold", padding: 10 }}>index page</Text>
      <Link href="/login">/login</Link>
      <Link href="/admin">/admin</Link>
      
      <Link href="/teacher">/teacher</Link>
      <Link href="/teacher/signup">
        <Text>    </Text>/teacher/signup
      </Link>
      <Link href="/teacher/signup-otp">
        <Text>    </Text>/teacher/signup-otp
      </Link>

      <Link href="/session/common/admission">/session/common/admission</Link>
      <Link href="/session/common/admission/student-details">
        <Text>    </Text>/session/common/admission/student-detail
      </Link>
      <Link href="/session/common/admission/new-admission">
        <Text>    </Text>/session/common/admission/new-admission
      </Link>
      <Link href="/session/common/admission/profile">
        <Text>    </Text>/session/common/admission/profile
      </Link>
      <Link href="/session/common/admission/verification">
        <Text>    </Text>/session/common/admission/verification
      </Link>
    </SafeAreaView>
  );
}
