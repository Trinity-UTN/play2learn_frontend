import type { GetPaginated, PaginatedData } from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { urls } from "../urls";
import type { YearResponseDto } from "../Year/YearService";

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
    // Filtrar parámetros undefined/null para evitar enviar valores vacíos
    const cleanParams: any = {};

    if (params.page !== undefined) cleanParams.page = params.page;
    if (params.page_size !== undefined)
      cleanParams.page_size = params.page_size;
    if (params.order_by !== undefined) cleanParams.order_by = params.order_by;
    if (params.order_type !== undefined)
      cleanParams.order_type = params.order_type;
    if (params.search !== undefined && params.search !== "")
      cleanParams.search = params.search;
    if (params.filters !== undefined && params.filters.length > 0)
      cleanParams.filters = params.filters;
    if (params.filtersValues !== undefined && params.filtersValues.length > 0)
      cleanParams.filtersValues = params.filtersValues;

    //console.log("Params:", cleanParams); // TODO: REMOVE_DEBUG
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
    //console.log(`Eliminando año con ID: ${id}`); // TODO: REMOVE_DEBUG
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
  deleteCourseApi
};
