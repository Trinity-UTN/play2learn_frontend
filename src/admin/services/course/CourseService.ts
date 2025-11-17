import type { YearResponseDto } from "../Year/YearService";
import { urls } from "../urls";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";

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
  await api.post(urls.Course, data);
};

const updateCourseApi = async (data: UpdateCoursePayload): Promise<void> => {
  await api.put(`${urls.Course}/${data.id}`, data);
};

const getCourseApi = async () => {
  const response = await api.get(urls.Course);
  return response;
};

const getCourseByIdApi = async (id: number): Promise<CourseResponseDto> => {
  const response = await api.get(`${urls.Course}/${id}`);
  return response.data;
};

const getPaginatedCourseApi = async (
  params: GetPaginated
): Promise<PaginatedCourseResponse> => {
  const cleanParams = buildCleanPaginatedParams(params);
  const response = await api.get(urls.CoursePaginated, {
    params: cleanParams,
  });
  return response.data;
};

const deleteCourseApi = async (id: number): Promise<void> => {
  await api.delete(`${urls.Course}/${id}`);
};

export const CourseService = {
  registerCourseApi,
  getCourseApi,
  updateCourseApi,
  getPaginatedCourseApi,
  deleteCourseApi,
  getCourseByIdApi,
};
