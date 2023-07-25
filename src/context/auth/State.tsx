import React, { useState } from "react";
import AuthContext from "./Context";
import { loginRequest, registerRequest } from "../../api/auth";
import { User } from "../../interfaces/user.interface";
import { Login } from "../../interfaces/auth.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [getToken, setGetToken] = useState(null);

  const signup = async (user: User) => {
    try {
      const response = await registerRequest(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (auth: Login) => {
    try {
      const response = await loginRequest(auth);

      if (response.data === "User not found") {
        return Alert.alert("Warning", "Check your email please");
      } else if (response.data === "Password is incorrect") {
        return Alert.alert("Warning", "Incorrect password");
      } else {
        await AsyncStorage.setItem("token", response.data.token);
        setAuth(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tokenLogin = async () => {
    try {
      const token: any = await AsyncStorage.getItem("token");
      if (token) {
        setGetToken(token);
      }
      console.log("SOY TOKEN", token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
      setGetToken(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        auth,
        signin,
        logout,
        tokenLogin,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
