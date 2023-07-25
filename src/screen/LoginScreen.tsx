import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { FormInput } from "../components/FormInput";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useForm, Controller } from "react-hook-form";
import { useSeePassword } from "../hooks/useSeePassword";
import AuthContext from "../context/auth/Context";

type FormData = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const navigation: any = useNavigation();

  const { signin, auth, tokenLogin } = useContext(AuthContext);

  const { seePasswordIconLogin, seePasswordLogin, textPasswordLogin } =
    useSeePassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    typeof auth === "object" && navigation.navigate("HomeScreen");
  }, [auth]);

  const onSubimit = async (data: FormData) => {
    await signin(data);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#1e1e1e" }}>
      <View style={styles.container}>
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
          <View style={{ marginBottom: 40 }}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Enter an email address.",
                pattern: {
                  message: "Please enter a valid email address.",
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                },
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  title="Email"
                  placeholder="Email"
                  keyboardType={"email-address"}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email?.message && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
          <View style={{ marginBottom: 40 }}>
            <Ionicons
              name={seePasswordIconLogin}
              size={24}
              color="#A448FF"
              style={{ position: "absolute", right: 10, top: 50, zIndex: 9 }}
              onPress={textPasswordLogin}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Enter a password.",
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  title="Password"
                  placeholder="Password"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={seePasswordLogin}
                />
              )}
            />
            {errors.password?.message && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        </View>
        <View style={styles.redirectButtons}>
          <TouchableOpacity
            style={styles.redirectButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.textButton}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.redirectButton}
            activeOpacity={0.8}
            onPress={handleSubmit(onSubimit)}
          >
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            marginHorizontal: 32,
          }}
        >
          {/* <Text style={{...styles.textButton, fontSize: 12}}>have you forgotten your password?</Text> */}
          <TouchableOpacity style={{ marginLeft: 4, width: "100%" }}>
            <Text
              style={{
                ...styles.textButton,
                color: "#A448FF",
                fontSize: 14,
                textAlign: "right",
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerImage: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    position: "relative",
    bottom: 0,
    // height: "40%",
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
  redirectButtons: {
    width: "100%",
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  redirectButton: {
    width: "45%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#A448FF",
    borderRadius: 10,
  },
  textButton: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    marginTop: 5,
    color: "#ff0000",
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
  },
});
