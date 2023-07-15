import { createContext } from "react";
import { Auth } from "../../interfaces/auth.interface";
import { User } from "../../interfaces/user.interface";

export type AuthContextType = {
  auth: Auth | any
  user: User | any
};

const AuthContext = createContext<any>({});

export default AuthContext;
