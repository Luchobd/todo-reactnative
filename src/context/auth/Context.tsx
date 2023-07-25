import { createContext } from "react";
import { User } from "../../interfaces/user.interface";
import { Login } from "../../interfaces/auth.interface";

export type AuthContextType = {
  user: User | null;
  signup: (user: User) => Promise<void>;
  isAuthenticated: boolean;
  auth: string | undefined;
  signin: (userDate: Login) => Promise<void>;
  logout: () => void;
  tokenLogin: (token: string) => void;
  getToken: string | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
