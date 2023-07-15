import { Auth } from "./auth.interface";

export interface UserRegister {
  User: User[];
}

export interface User extends Auth {
  name: string;
  description: string;
}
