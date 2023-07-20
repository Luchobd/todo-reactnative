import React from "react";
import { View, Text, StyleSheet, TextInput, Image, Button } from "react-native";
import { FormInput } from "../components/FormInput";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        title="Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
      <View style={styles.containerImage}>
        <Image
          source={require("../assets/Login-Header.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.contentText}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleNormal}>Login with your account</Text>
          <Text style={styles.subTitleBold}>Take Note</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <FormInput title="Email" placeholder="Email" />
        <FormInput title="Password" placeholder="Password" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
  containerImage: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentText: {
    width: "100%",
    paddingHorizontal: 32,
    paddingTop: 10,
  },
  title: {
    marginBottom: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
    fontFamily: "Roboto",
  },
  subTitle: {
    flexDirection: "row",
  },
  subTitleNormal: {
    marginRight: 4,
    fontFamily: "Roboto",
    fontWeight: "normal",
    fontSize: 14,
    color: "#fff",
  },
  subTitleBold: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 32,
    marginTop: 40,
  },
  inputEmailandPassword: {
    marginBottom: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
  },
  inputTitle: {
    marginBottom: 10,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
  },
});
