import { apiLogin } from "@/shared";
import { urls } from "../urls";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserResponseDto {
  id: number;
  email: string;
}

const loginApi = async (data: LoginPayload): Promise<any> => {
  const response = await apiLogin.post(urls.login, data);
  return response.data;
};

export const LoginService = {
  loginApi,
};

//Cambio de nombre de carpeta
