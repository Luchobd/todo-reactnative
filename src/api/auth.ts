import axios from "axios";
import { User } from "../interfaces/user.interface";
import { Login } from "../interfaces/auth.interface";
import { Change } from "../interfaces/change.interface";


const API = "http://10.0.2.2:3000/auth";

export const registerRequest = async (user: User) => await axios.post(`${API}/register`, user);
export const loginRequest = async (auth: Login) => await axios.post(`${API}/login`, auth);
export const sendChangePassRequest = async (email: {email: string}) => await axios.post(`${API}/forgot-password`, email);
export const forgotPasswordRequest = async (change: Change) => await axios.post(`${API}/change-password`, change);

