import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";

import AuthContext from "../context/auth/Context";
import { FormInput } from "../components/FormInput";
import { stylesGlobal } from "../theme/global";
import { useSeePassword } from "../hooks/useSeePassword";

import Ionicons from "@expo/vector-icons/Ionicons";

type FormData = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const RegisterScreen = () => {
  const {
    textPassword,
    seePassword,
    textPassword2,
    seePassword2,
    seePasswordIcon,
    seePasswordIcon2,
  } = useSeePassword();

  const navigation: any = useNavigation();
  const { signup, isAuthenticated } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubimit = (data: FormData) => {
    if (data.password !== data.repeatPassword) return;

    signup({
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (isAuthenticated) {
      return Alert.alert(
        "✅ Congratulations",
        "Your user has been registered correctly",
        [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
      );
    }
  };

  return (
    <SafeAreaView style={stylesGlobal.globalBackground}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={{ top: 20, width: 50, height: 50 }}
      >
        <Ionicons
          name="arrow-undo"
          size={40}
          color="#A448FF"
          style={{ position: "relative" }}
        />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 50,
          }}
        >
          <Text style={styles.title}>Register</Text>
          <View style={{ width: "100%" }}>
            <View style={styles.inputContent}>
              <Controller
                control={control}
                name="firstname"
                rules={{
                  required: "First Name is required",
                  pattern: {
                    message: "First Name must be only letters",
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{4,16}$/,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    title="First Name"
                    placeholder="Enter First Name"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.firstname?.message && (
                <Text style={styles.errorText}>{errors.firstname.message}</Text>
              )}
            </View>
            <View style={styles.inputContent}>
              <Controller
                control={control}
                name="lastname"
                rules={{
                  required: "Last Name is required",
                  pattern: {
                    message: "Last Name must be only letters",
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{4,16}$/,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    title="Last Name"
                    placeholder="Enter Last Name"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.lastname?.message && (
                <Text style={styles.errorText}>{errors.lastname.message}</Text>
              )}
            </View>
            <View style={styles.inputContent}>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: "User Name is required",
                  pattern: {
                    message: "User Name must be only letters",
                    value: /^[a-zA-Z0-9_]{4,16}$/,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    title="User Name"
                    placeholder="Enter User Name"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.username?.message && (
                <Text style={styles.errorText}>{errors.username.message}</Text>
              )}
            </View>
            <View style={styles.inputContent}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    message: "Email must be valid",
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    title="Email"
                    placeholder="Enter Email"
                    onChangeText={onChange}
                    value={value}
                    keyboardType={"email-address"}
                  />
                )}
              />
              {errors.email?.message && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>
            <View style={styles.inputContent}>
              <Ionicons
                name={seePasswordIcon}
                size={24}
                color="#A448FF"
                style={{ position: "absolute", right: 10, top: 50, zIndex: 9 }}
                onPress={textPassword}
              />
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "password is required",
                  pattern: {
                    message:
                      "Password must have a minimum of 8 characters, at least one letter (uppercase or lowercase), at least one digit, and one special character.",
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    title="Password"
                    placeholder="Enter Password"
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={seePassword}
                  />
                )}
              />
              {errors.password?.message && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
            <View style={styles.inputContent}>
              <Ionicons
                name={seePasswordIcon2}
                size={24}
                color="#A448FF"
                style={{ position: "absolute", right: 10, top: 50, zIndex: 9 }}
                onPress={textPassword2}
              />
              <Controller
                control={control}
                name="repeatPassword"
                rules={{
                  required: "Repeat Password is required",
                  minLength: {
                    message: "Eight character minimum",
                    value: 8,
                  },
                  validate: (value) =>
                    value === control._fields.password?._f.value ||
                    "Incorrect password",
                }}
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    title="Repeat Password"
                    placeholder="Enter Repeat Password"
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={seePassword2}
                  />
                )}
              />
              {errors.repeatPassword?.message && (
                <Text style={styles.errorText}>
                  {errors.repeatPassword.message}
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ width: "100%" }}
            onPress={handleSubmit(onSubimit)}
          >
            <Text style={styles.buttomRegister}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContent: {
    marginBottom: 30,
  },
  title: {
    marginTop: 10,
    fontFamily: "Roboto",
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  buttomRegister: {
    marginBottom: 40,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#A448FF",
    borderRadius: 10,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
  },
  errorText: {
    marginTop: 5,
    color: "#ff0000",
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
  },
});
