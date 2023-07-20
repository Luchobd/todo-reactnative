import axios from "axios";
import { User } from "../interfaces/user.interface";

const API = "http://10.0.2.2:3000/auth";

export const registerRequest = async (user: User) => await axios.post(`${API}/register`, user);

