import React, { useContext } from "react";
import { View, Text } from "react-native";
import AuthContext from "../context/auth/Context";

export default function Home() {
  const test = useContext(AuthContext);
  console.log(test);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
