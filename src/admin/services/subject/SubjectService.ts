import api from "../../../shared/utils/api";
import { urls } from "../urls";

export interface CreateSubjectPayload {
  name: string;
  courseId: number;
  teacherId: number;
  optional: boolean;
}

const registerSubjectApi = async (
  data: CreateSubjectPayload
): Promise<void> => {
  try {
    await api.post(urls.Subject, data);
  } catch (error) {
    console.error("Error al crear la materia:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const SubjectService = {
  registerSubjectApi,
};
