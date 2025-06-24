import axios from "axios";
import type { Login } from "../types/userTypes";
import { urlBase } from "../../urls";
import { urls } from "../urls";

const api = axios.create({
  baseURL: urlBase.server,
});
export async function LogIn(data: Login) {
  const { data: respuesta } = await api.post(urls.login, data);
  return respuesta;
}
