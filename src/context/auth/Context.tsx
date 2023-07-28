import { createContext } from "react";
import { User } from "../../interfaces/user.interface";
import { Login } from "../../interfaces/auth.interface";
import { Change } from "../../interfaces/change.interface";

export type AuthContextType = {
  user: User | null;
  signup: (user: User) => Promise<void>;
  isAuthenticated: boolean;
  auth: string | undefined;
  signin: (userDate: Login) => Promise<void>;
  logout: () => void;
  tokenLogin: (token: string) => void;
  getToken: string | null;
  sendChangePassEmail: (email: { email: string }) => Promise<void>;
  sendEmail: User | null;
  changePassword: (change: Change) => Promise<void>;
  changeResp: Change | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
