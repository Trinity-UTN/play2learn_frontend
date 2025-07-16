import axios from "axios";

const BASE_URL = "https://play2learn.backend.desarrollo.systemsbinary.com";

const apiLogin = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export default apiLogin;
