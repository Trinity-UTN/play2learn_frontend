import api from "../../../shared/utils/api";
import { urls } from "../../urls";
import type { YearResponseDto } from "../Year/YearService";

export interface CreateCoursePayload {
  name: string;
  year_id: number;
}

export interface GetCoursePayload {
  id: number;
  name: string;
  year: YearResponseDto;
}

const registerCourseApi = async (data: CreateCoursePayload): Promise<void> => {
  try {
    await api.post(urls.Course, data);
  } catch (error) {
    console.error("Error al crear el curso:", error);
    throw error;
  }
};

const getCourseApi = async () => {
  try {
    const response = await api.get(urls.Course);
    return response;
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    throw error;
  }
};

export const CourseService = {
  registerCourseApi,
  getCourseApi,
};
