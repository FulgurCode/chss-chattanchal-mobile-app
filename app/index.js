import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={{ padding: 10, gap: 10 }}>
      <Text style={{ fontWeight: "bold", padding: 10 }}>index page</Text>
      <Link href="/login">/login</Link>
      <Link href="/admin">/admin</Link>
      <Link href="admin/admission">
        <Text>    </Text>/admin/admission/
      </Link><Link href="admin/admission/student-details">
        <Text>        </Text>/admin/admission/student-details
      </Link><Link href="admin/admission/new-admission">
        <Text>        </Text>/admin/admission/new-admission
      </Link><Link href="admin/admission/profile">
        <Text>        </Text>/admin/admission/profile
      </Link><Link href="admin/admission/verification">
        <Text>        </Text>/admin/admission/verification
      </Link><Link href="admin/admission/confirmation">
        <Text>        </Text>/admin/admission/confirmation
      </Link>
      
      <Link href="/teacher">/teacher</Link>
      <Link href="/teacher/signup">
        <Text>    </Text>/teacher/signup
      </Link>
      <Link href="/teacher/signup-otp">
        <Text>    </Text>/teacher/signup-otp
      </Link>
      <Link href="teacher/admission/">
        <Text>    </Text>/teacher/admission/
      </Link>
      <Link href="teacher/admission/student-details">
        <Text>        </Text>/teacher/admission/student-details
      </Link><Link href="teacher/admission/new-admission">
        <Text>        </Text>/teacher/admission/new-admission
      </Link><Link href="teacher/admission/profile">
        <Text>        </Text>/teacher/admission/profile
      </Link><Link href="teacher/admission/verification">
        <Text>        </Text>/teacher/admission/verification
      </Link>
      
    </SafeAreaView>
  );
}
