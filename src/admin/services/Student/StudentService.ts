import api from "../../../shared/utils/api";
import { urls } from "../../urls";

export interface CreateStudentPayload {
  name: string;
  lastName: string;
  dni: number;
  email: string;
  class_id: number;
}

const registerStudentApi = async (data: CreateStudentPayload): Promise<void> => {
  try {
    await api.post(urls.Students, data);
  } catch (error) {
    console.error("Error al crear el estudiante:", error);
    throw error;
  }
};

export const StudentService = {
  registerStudentApi,
};
