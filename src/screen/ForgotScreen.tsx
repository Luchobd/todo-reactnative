import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { stylesGlobal } from "../theme/global";
import { useNavigation } from "@react-navigation/native";
import { FormInput } from "../components/FormInput";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../context/auth/Context";
import { useSeePassword } from "../hooks/useSeePassword";
import { User } from "../interfaces/user.interface";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  validationKey: string;
};

export const ForgotScreen = () => {
  const navigation: any = useNavigation();

  const {
    textPassword,
    seePassword,
    textPassword2,
    seePassword2,
    seePasswordIcon,
    seePasswordIcon2,
  } = useSeePassword();

  const { sendEmail, changePassword } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubimit = async (data: FormData) => {
    if (sendEmail?.email !== data.email)
      return Alert.alert("🔑⁉ Warning 🔑⁉", "you must enter your email ");

    changePassword({
      email: data.email,
      password: data.password,
      validationKey: data.validationKey,
    });

    return Alert.alert(
      "✅ Congratulations",
      "Your user has been registered correctly",
      [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
    );
  };
  return (
    <SafeAreaView style={stylesGlobal.globalBackground}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
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
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Image source={require("../assets/Logo-padlock-closed.png")} />
          </View>
          <View>
            <Text style={styles.title}>Change password</Text>
            <Text style={styles.subtitle}>
              Fill in the form with the new password and submit it.
            </Text>
          </View>
          <View style={styles.inputContent}>
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
                  placeholder="Enter password"
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
              name="confirmPassword"
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
                  title="Confirm Password"
                  placeholder="Enter confirm password"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={seePassword2}
                />
              )}
            />
            {errors.confirmPassword?.message && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
          <View style={styles.inputContent}>
            <Controller
              control={control}
              name="validationKey"
              rules={{
                required: "First Name is required",
                pattern: {
                  message: "User Name must be only letters",
                  value: /^[a-zA-Z0-9_]{4,16}$/,
                },
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  title="Validation Key"
                  placeholder="Enter key"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.validationKey?.message && (
              <Text style={styles.errorText}>
                {errors.validationKey.message}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            activeOpacity={0.8}
            onPress={handleSubmit(onSubimit)}
          >
            <Text style={styles.buttomSend}>Send</Text>
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
  container: {
    marginTop: 50,
    paddingHorizontal: 32,
    paddingVertical: 32,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 20,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  buttomSend: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#A448FF",
    borderRadius: 8,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    marginTop: 5,
    color: "#ff0000",
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
  },
  emailText: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
