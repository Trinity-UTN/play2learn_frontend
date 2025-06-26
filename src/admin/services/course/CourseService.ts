import api from "../../../shared/utils/api";
import { urls } from "../../urls";

export interface CreateCoursePayload {
  name: string;
  year_id: number;
}

const registerCourseApi = async (data: CreateCoursePayload): Promise<void> => {
  try {
    await api.post(urls.Course, data);
  } catch (error) {
    console.error("Error al crear el curso:", error);
    throw error;
  }
};

export const CourseService = {
  registerCourseApi,
};
