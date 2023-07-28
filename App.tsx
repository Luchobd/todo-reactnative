import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AuthProvider from "./src/context/auth/State";
import { Navigation } from "./src/navigation/Navigation";

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <StatusBar style="light" />
      <Navigation />
    </NavigationContainer>
    </AuthProvider>
  );
}
