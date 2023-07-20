import { View, Text } from "react-native";
import React, { useState } from "react";

export const useSeePassword = () => {
  const [seePassword, setSeePassword] = useState(true);
  const [seePassword2, setSeePassword2] = useState(true);
  const [seePasswordIcon, setSeePasswordIcon] = useState("eye");
  const [seePasswordIcon2, setSeePasswordIcon2] = useState("eye");

  const textPassword = () => {
    setSeePassword(seePassword === true ? false : true);
  };

  const textPassword2 = () => {
    setSeePassword2(seePassword2 === true ? false : true);
  };

  const iconPassword: any = () => {
    setSeePasswordIcon(seePassword === true ? "eye-off" : "eye")
  }

  const iconPassword2: any = () => {
    setSeePasswordIcon2(seePassword2 === true ? "eye-off" : "eye")
  }

  return {
    seePassword,
    seePassword2,
    textPassword,
    textPassword2,
    iconPassword,
    iconPassword2,
  };
};
