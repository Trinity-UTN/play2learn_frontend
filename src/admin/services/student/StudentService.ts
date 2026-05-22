import type {
  CreateStudentPayload,
  PaginatedStudentResponse,
  StudentResponseDto,
  UpdateStudentPayload,
} from "@/admin";
import { urls } from "../urls";
import { type GetPaginated, api, buildCleanPaginatedParams } from "@/shared";

const registerStudentApi = async (
  data: CreateStudentPayload,
): Promise<void> => {
  await api.post(urls.Students, data);
};

const updateStudentApi = async (data: UpdateStudentPayload): Promise<void> => {
  await api.put(`${urls.Students}/${data.id}`, data);
};

const getStudentApi = async () => {
  const response = await api.get(urls.Students);
  return response;
};

const getStudentByIdApi = async (id: number): Promise<StudentResponseDto> => {
  const response = await api.get(`${urls.Students}/${id}`);
  return response.data.data;
};

const getPaginatedStudentApi = async (
  params: GetPaginated,
): Promise<PaginatedStudentResponse> => {
  const cleanParams = {
    ...buildCleanPaginatedParams(params),
    filters: params.filters?.join(","),
    filtersValues: params.filtersValues?.join(","),
  };
  const response = await api.get(urls.StudentsPaginated, {
    params: cleanParams,
  });
  return response.data;
};

const deleteStudentApi = async (id: number): Promise<void> => {
  await api.delete(`${urls.Students}/${id}`);
};

const restoreStudentApi = async (id: number): Promise<void> => {
  await api.patch(`${urls.StudentsRestore}/${id}`);
};

export const StudentService = {
  registerStudentApi,
  updateStudentApi,
  deleteStudentApi,
  getStudentApi,
  getPaginatedStudentApi,
  getStudentByIdApi,
  restoreStudentApi,
};
