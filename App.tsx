import React, {useContext} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthProvider from "./src/context/auth/State";
import Home from "./src/components/Home";



export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <Text>Esta funcionando correctamente... {"\n"}Creando ContextApi</Text>
        <Home/>
        <StatusBar style="auto" />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
