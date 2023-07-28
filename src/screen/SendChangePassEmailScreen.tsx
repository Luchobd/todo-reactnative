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

type FormData = {
  email: string;
};

export const SendChangePassEmailScreen = () => {
  const navigation: any = useNavigation();

  const { sendChangePassEmail } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubimit = async (data: FormData) => {
    sendChangePassEmail(data);

    return Alert.alert(
      "📩 EMAIL SEND",
      "Verify in your mailbox that you have received a validation key",
      [{ text: "OK", onPress: () => navigation.navigate("ForgotScreen") }]
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
            <Image source={require("../assets/Logo-padlock.png")} />
          </View>
          <View>
            <Text style={styles.title}>Forgot your password?</Text>
            <Text style={styles.subtitle}>
              Enter your email, we will send you a link to change your password.
            </Text>
          </View>
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
                title=""
                placeholder="Enter email"
                onChangeText={onChange}
                value={value}
                keyboardType={"email-address"}
              />
            )}
          />
          {errors.email?.message && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
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
  container: {
    marginTop: 50,
    paddingHorizontal: 32,
    paddingVertical: 64,
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
    marginBottom: 10,
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
});
