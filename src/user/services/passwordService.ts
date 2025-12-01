import api from "../../shared/utils/api";
import type { ChangePassword } from "../types/ChangePassword";
import { urls } from "./urls";

const changePasswordApi = async (data: ChangePassword) => {
  await api.post(urls.changePassword, data);
};

export const PasswordService = {
  changePasswordApi,
};
