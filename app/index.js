import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaView>
      <Text>index page</Text>
      <Link href="/login">/login</Link>
      <Link href="/admin">/admin</Link>
      <Link href="/admin/admission">/admin/admission</Link>
      <Link href="/admin/admission/student-details">
        /admin/admission/student-detail
      </Link>
      <Link href="/admin/admission/new-admission">
        /admin/admission/new-admission
      </Link>
    </SafeAreaView>
  );
}
