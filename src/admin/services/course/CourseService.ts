import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
import { urls } from "../urls";
import type { YearResponseDto } from "../year/YearService";

export interface CreateCoursePayload {
  name: string;
  year_id: number;
}

export interface UpdateCoursePayload {
  id: number;
  name: string;
}

export interface CourseResponseDto {
  id: number;
  name: string;
  year: YearResponseDto;
}

export interface PaginatedCourseResponse {
  data: PaginatedData<CourseResponseDto>;
  message: string;
  errors: any;
  timestamp: string;
}

const registerCourseApi = async (data: CreateCoursePayload): Promise<void> => {
  try {
    await api.post(urls.Course, data);
  } catch (error) {
    console.error("Error al crear el curso:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const updateCourseApi = async (data: UpdateCoursePayload): Promise<void> => {
  try {
    await api.put(`${urls.Course}/${data.id}`, data);
  } catch (error) {
    console.error("Error al actualizar el curso:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};
const getCourseApi = async () => {
  try {
    const response = await api.get(urls.Course);
    return response;
  } catch (error) {
    console.error("Error al obtener los cursos:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getPaginatedCourseApi = async (
  params: GetPaginated
): Promise<PaginatedCourseResponse> => {
  try {
    const cleanParams = buildCleanPaginatedParams(params);

    const response = await api.get(urls.CoursePaginated, {
      params: cleanParams,
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener cursos paginados:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const deleteCourseApi = async (id: number): Promise<void> => {
  try {
    //console.log(`Eliminando curso con ID: ${id}`); // TODO: REMOVE_DEBUG
    await api.delete(`${urls.Course}/${id}`);
  } catch (error) {
    console.error("Error al eliminar el curso:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const CourseService = {
  registerCourseApi,
  getCourseApi,
  updateCourseApi,
  getPaginatedCourseApi,
  deleteCourseApi,
};
