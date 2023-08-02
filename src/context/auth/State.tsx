import React, { useState } from "react";
import AuthContext from "./Context";
import {
  forgotPasswordRequest,
  loginRequest,
  registerRequest,
  sendChangePassRequest,
} from "../../api/auth";
import { User } from "../../interfaces/user.interface";
import { Login } from "../../interfaces/auth.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Change } from "../../interfaces/change.interface";


type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [sendEmail, setSendEmail] = useState(null);
  const [auth, setAuth] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [getToken, setGetToken] = useState(null);
  const [changeResp, setChangeResp] = useState(null);

  const signup = async (user: User) => {
    try {
      const response = await registerRequest(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  const tokenLogin = async () => {
    try {
      const token: any = await AsyncStorage.getItem("token");
      if (token) {
        setGetToken(token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
      setGetToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  const sendChangePassEmail = async (email: { email: string }) => {
    try {
      const response = await sendChangePassRequest(email);
      setSendEmail(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async (change: Change) => {
    try {
      const response = await forgotPasswordRequest(change);

      if (response.data === "Verification code entered is incorrect!") {
        return Alert.alert(
          "Warning",
          "The verification key must be identical to the one you received by email"
        );
      }

      setChangeResp(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
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
        sendEmail,
        sendChangePassEmail,
        changePassword,
        changeResp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
