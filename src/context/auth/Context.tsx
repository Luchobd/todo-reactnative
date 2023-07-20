import { createContext, useContext } from "react";
// import { Auth } from "../../interfaces/auth.interface";
import { User, UserRegister } from "../../interfaces/user.interface";

export type AuthContextType = {
  user: User | null;
  signup: (user: User) => Promise<void>;
  isAuthenticated: boolean;
  auth: string | undefined;
  login: (userDate: React.SetStateAction<undefined>) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);


export default AuthContext;
