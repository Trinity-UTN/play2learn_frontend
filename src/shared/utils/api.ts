import axios from "axios";
import AuthService from "../../user/services/auth/AuthService";

const BASE_URL = "https://play2learn.backend.desarrollo.systemsbinary.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async config => {
  try {
    const validToken = await AuthService.getValidAccessToken();
    config.headers.Authorization = `Bearer ${validToken}`;
  } catch (err) {
    console.error("Error obteniendo token válido:", err);
    AuthService.logout();
  }
  return config;
});

export default api;
