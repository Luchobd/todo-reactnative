import { View, Text, Button, Modal } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { stylesGlobal } from "../theme/global";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../context/auth/Context";

export const HomeScreen = () => {
  const navigation: any = useNavigation();
  const [isVisible, setisVisible] = useState(false);

  useEffect(() => {
    tokenLogin(getToken!)
  }, [])
  
  const {getToken, tokenLogin} = useContext(AuthContext)
  console.log("HOME", getToken)

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

      <View>
        <Button title="Open Modal" onPress={() => setisVisible(true)} />

        <Modal animationType="fade" visible={isVisible} transparent={true}>
          {/* Background Modal  */}
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.3)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Contenido Modal   */}
            <View
              style={{
                backgroundColor: "white",
                width: 200,
                height: 200,
                justifyContent: "center",
                alignItems: "center",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.25,
                elevation: 10, // Con esto aplicamos sombras en android.
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Modal</Text>
              <Text
                style={{ fontSize: 16, fontWeight: "300", marginBottom: 20 }}
              >
                Cuerpo del Modal
              </Text>
              <Button title="Close" onPress={() => setisVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
