import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_AUTH;

const api = axios.create({
  baseURL: API_URL});

export const AuthAPI = {
  login: async (credentials) => {
    const response = await api.post("/login", credentials);
    return response;
  },
  register: async (user) => {
    const response = await api.post("/register", user);
    return response;
  }
}
export default AuthAPI;