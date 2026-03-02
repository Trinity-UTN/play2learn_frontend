import axios from "axios";
import Cookies from "js-cookie";

import { BASE_URL } from "./apiAuth";
const formDataApi = axios.create({
  baseURL: BASE_URL,
});

formDataApi.interceptors.request.use(async (config) => {
  const token = Cookies.get('accessToken');
  try {
    config.headers.Authorization = `Bearer ${token}`;
  } catch (err) {
    console.error("Error obteniendo token válido:", err);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }
  return config;
});

export default formDataApi;
