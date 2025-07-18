import apiLogin from "../../../shared/utils/apiAuth";
import { urls } from "../urls";

export interface LoginPayload {
  email: string;
  password: string;
}

const loginApi = async (data: LoginPayload): Promise<any> => {
  try {
    const response = await apiLogin.post(urls.login, data);
    
    return response.data;
  } catch (error) {
    console.error("Error en LogIn:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const LoginService = {
  loginApi,
};
