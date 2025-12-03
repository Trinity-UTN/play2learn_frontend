import api from "../../shared/utils/api";
import type { ChangePassword } from "../types/ChangePassword";
import { urls } from "./urls";

const changePasswordApi = async (data: ChangePassword) => {
  await api.post(urls.changePassword, data);
};
const restorePassword = async (type: string, id: number) => {
  await api.patch(`${urls.restorePassword}/${type}/${id}`);
};

export const PasswordService = {
  changePasswordApi,
  restorePassword,
};
