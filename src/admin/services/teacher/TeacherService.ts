import api from "../../../shared/utils/api";
import { urls } from "../../urls";

export interface CreateTeacherPayload {
    name:string,
    lastname: string,
    dni: string,
    email: string,
}

const registerTeacherApi = async (data: CreateTeacherPayload): Promise<void> => {
  try {
    await api.post(urls.Teacher, data);
  } catch (error) {
    console.error("Error al crear el docente:", error);
    throw error;
  }
};

export const TeacherService = {
  registerTeacherApi,
};
