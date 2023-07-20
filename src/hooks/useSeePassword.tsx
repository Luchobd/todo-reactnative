import React, { useState } from "react";

export const useSeePassword = () => {
  const [seePassword, setSeePassword] = useState(true);
  const [seePassword2, setSeePassword2] = useState(true);
  const [seePasswordIcon, setSeePasswordIcon] = useState<any>("eye-off");
  const [seePasswordIcon2, setSeePasswordIcon2] = useState<any>("eye-off");

  const textPassword = () => {
    setSeePassword(seePassword ? false : true);
    if (seePassword) {
      setSeePasswordIcon("eye");
    } else {
      setSeePasswordIcon("eye-off");
    }
  };

  const textPassword2 = () => {
    setSeePassword2(seePassword2 ? false : true);
    if (seePassword2) {
      setSeePasswordIcon2("eye");
    } else {
      setSeePasswordIcon2("eye-off");
    }
  };

  return {
    seePassword,
    seePassword2,
    textPassword,
    textPassword2,
    seePasswordIcon,
    seePasswordIcon2,
  };
};
