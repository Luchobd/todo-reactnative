import React, { useContext } from "react";
import { View, Text } from "react-native";
import AuthContext from "../context/auth/Context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const test = useContext(AuthContext);
  // console.log("ESTOY AQUI",test);
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
}
