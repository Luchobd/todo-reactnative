import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { stylesGlobal } from "../theme/global";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeScreen = () => {
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={stylesGlobal.globalBackground}>
      <Text>HomeScreen</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate("LoginScreen")}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate("RegisterScreen")}
      />
    </SafeAreaView>
  );
};
