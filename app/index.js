import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={{padding: 10, gap: 10}}>
      <Text style={{fontWeight: "bold", padding: 10}}>index page</Text>
      <Link href="/login">/login</Link>
      <Link href="/admin">/admin</Link>
      <Link href="/teacher">
        /teacher
      </Link>
      <Link href="/teacher/signup">
        /teacher/signup
      </Link><Link href="/teacher/signup-otp">
        /teacher/signup-otp
      </Link>
      <Link href="/session/common/admission">/session/common/admission</Link>
      <Link href="/session/common/admission/student-details">
      /session/common/admission/student-detail
      </Link>
      <Link href="/session/common/admission/new-admission">
      /session/common/admission/new-admission
      </Link>
      
    </SafeAreaView>
  );
}
