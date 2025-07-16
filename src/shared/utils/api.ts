import axios from "axios";
import AuthService from "../../user/services/auth/AuthService";
import { BASE_URL } from "./apiAuth";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async config => {
  const authService= AuthService.getInstance()
  try {
    const validToken = await authService.getValidAccessToken();
    config.headers.Authorization = `Bearer ${validToken}`;
  } catch (err) {
    console.error("Error obteniendo token válido:", err);
    authService.logout();
  }
  return config;
});

export default api;
