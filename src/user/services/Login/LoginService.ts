import api from "../../../shared/utils/api";
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
  try {
    const response = await api.post(urls.login, data);
    return response.data;
  } catch (error) {
    console.error("Error en LogIn:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const LoginService = {
  loginApi,
};
