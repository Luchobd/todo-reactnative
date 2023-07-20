import React, { useState } from "react";
import AuthContext from "./Context";
import { registerRequest } from "../../api/auth";
import { User, UserRegister } from "../../interfaces/user.interface";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signup = async (user: User) => {
    try {
      const response = await registerRequest(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };
  const login = (userDate: React.SetStateAction<undefined>) => {
    try {
      setAuth(userDate);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    try {
      setAuth(undefined);
      setIsAuthenticated(false);
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
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
