import { Login } from "./auth.interface";

export interface User extends Login {
  username: string
  firstname: string;
  lastname: string;
}

export interface UserRegister extends Login {
  username: string
  firstname: string;
  lastname: string;
  repeatPassword: string;
}
