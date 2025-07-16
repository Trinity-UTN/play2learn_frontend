import api from "../../../shared/utils/api";
import { urls } from "../urls";
import type { UserResponseDto } from "../../../user/services/Login/LoginService";

export interface CreateTeacherPayload {
  name: string;
  lastname: string;
  dni: string;
  email: string;
}

export interface TeacherResponseDto {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  user: UserResponseDto;
}

const registerTeacherApi = async (
  data: CreateTeacherPayload
): Promise<void> => {
  try {
    await api.post(urls.Teacher, data);
  } catch (error) {
    console.error("Error al crear el docente:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getTeacherApi = async () => {
  try {
    const response = await api.get(urls.Teacher);
    return response;
  } catch (error) {
    console.error("Error al obtener los docentes:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const TeacherService = {
  registerTeacherApi,
  getTeacherApi,
};
