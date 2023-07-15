import React, { useReducer } from "react";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

import AuthContext, { AuthContextType } from "./Context";
import { AuthRuducer } from "./Reducer";
import { POST_LOGIN, POST_REGISTER } from "../types";

import { Auth } from "../../interfaces/auth.interface";
import { User, UserRegister } from "../../interfaces/user.interface";

interface InitialState {
  auth: string;
  user: string;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

// const initialState: any = {
//   auth: "",
//   user: "",
// };

export const AuthProvider = ({ children }: Props) => {
  const initialState: any = {
    auth: "",
    user: "",
  };

  const [state, dispatch] = useReducer<any>(AuthRuducer, initialState);

  const postAuthRegister = async (payload: InitialState) => {
    try {
      const resp: AxiosResponse = await axios.post(`http://10.0.2.2:3000/auth/register`,payload);
      return resp;
    } catch (error) {
      console.log(error);
    }
  };
  const postAuthLogin = async (payload: Auth) => {
    try {
      const resp: AxiosResponse = await axios.post(
        `http://10.0.2.2:3000/auth/login`,
        payload
      );
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        postAuthRegister,
        postAuthLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
