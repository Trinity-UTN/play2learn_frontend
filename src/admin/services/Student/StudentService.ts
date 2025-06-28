import api from "../../../shared/utils/api";
import { urls } from "../urls";

export interface CreateStudentPayload {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  course_id: number;
}

const registerStudentApi = async (
  data: CreateStudentPayload
): Promise<void> => {
  try {
    await api.post(urls.Students, data);
  } catch (error) {
    console.error("Error al crear el estudiante:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const StudentService = {
  registerStudentApi,
};
