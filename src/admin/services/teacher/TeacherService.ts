import type {
  CreateTeacherPayload,
  PaginatedTeacherResponse,
  TeacherResponseDto,
  UpdateTeacherPayload,
} from "@/admin";
import { urls } from "../urls";
import { buildCleanPaginatedParams, type GetPaginated, api } from "@/shared";

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
