import api from "../../../shared/utils/api";
import { urls } from "../urls";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";

export interface CreateTeacherPayload {
  name: string;
  lastname: string;
  dni: string;
  email: string;
}

export interface CreateTeacherPayload {
  name: string;
  lastname: string;
  dni: string;
  email: string;
}

export interface UpdateTeacherPayload {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  email: string;
}

// Despues ver si esta interface es comun en otros response y sacarla de aca
interface User {
  id: number;
  email: string;
}

export interface TeacherResponseDto {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  user: User;
  active: boolean;
}

export interface PaginatedTeacherResponse {
  data: PaginatedData<TeacherResponseDto>;
  message: string;
  errors: any;
  timestamp: string;
}

const registerTeacherApi = async (
  data: CreateTeacherPayload
): Promise<void> => {
  await api.post(urls.Teacher, data);
};

const updateTeacherApi = async (data: UpdateTeacherPayload): Promise<void> => {
  await api.put(`${urls.Teacher}/${data.id}`, data);
};

const getTeacherApi = async () => {
  const response = await api.get(urls.Teacher);
  return response;
};

const getTeacherByIdApi = async (id: number): Promise<TeacherResponseDto> => {
  const response = await api.get(`${urls.Teacher}/${id}`);
  return response.data;
};

const getPaginatedTeacherApi = async (
  params: GetPaginated
): Promise<PaginatedTeacherResponse> => {
  const cleanParams = buildCleanPaginatedParams(params);
  const response = await api.get(urls.TeacherPaginated, {
    params: cleanParams,
  });
  return response.data;
};

const deleteTeacherApi = async (id: number): Promise<void> => {
  await api.delete(`${urls.Teacher}/${id}`);
};

const restoreTeacherApi = async (id: number): Promise<void> => {
  await api.patch(`${urls.TeacherRestore}/${id}`);
};

export const TeacherService = {
  registerTeacherApi,
  updateTeacherApi,
  deleteTeacherApi,
  getTeacherApi,
  getPaginatedTeacherApi,
  getTeacherByIdApi,
  restoreTeacherApi,
};
