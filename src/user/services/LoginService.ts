import axios from "axios";
import type { Login } from "../types/userTypes";

const api = axios.create({
  baseURL: "https://play2learn.backend.desarrollo.systemsbinary.com",
});
export async function LogIn(data: Login) {
  const { data: respuesta } = await api.post("/login", data);
  return respuesta;
}
