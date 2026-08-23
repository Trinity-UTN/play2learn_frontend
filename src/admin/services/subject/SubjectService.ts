import { urls } from "../urls";
import { type GetPaginated, api, buildCleanPaginatedParams } from "@/shared";
import {
  type CreateSubjectPayload,
  type PaginatedSubjectResponse,
  type UpdateSubjectPayload,
} from "@/admin";

const registerSubjectApi = async (
  data: CreateSubjectPayload,
): Promise<void> => {
  await api.post(urls.Subject, data);
};

const updateSubjectApi = async (data: UpdateSubjectPayload): Promise<void> => {
  await api.put(`${urls.Subject}/${data.id}`, data);
};

const getSubjectApi = async () => {
  const response = await api.get(urls.Subject);
  return response;
};

const getSubjectByTeacherApi = async () => {
  const response = await api.get(urls.SubjectTeacher);
  return response;
};

const getSubjectByStudentApi = async () => {
  const response = await api.get(urls.SubjectStudent);
  return response;
};

const getPaginatedSubjectApi = async (
  params: GetPaginated,
): Promise<PaginatedSubjectResponse> => {
  const cleanParams = buildCleanPaginatedParams(params);
  const response = await api.get(urls.SubjectPaginated, {
    params: cleanParams,
  });
  return response.data;
};

const deleteSubjectApi = async (id: number): Promise<void> => {
  await api.delete(`${urls.Subject}/${id}`);
};

const getStudentAssignmentApi = async (id: number) => {
  const response = await api.get(`${urls.StudentAssignment}/${id}`);
  return response.data;
};

const AssingmentStudent = async (idSubject: number, idStudent: number[]) => {
  await api.patch(`${urls.AssingmentStudent}/${idSubject}`, idStudent);
};
const UnassignStudent = async (idSubject: number, idStudent: number[]) => {
  await api.patch(`${urls.UnassignStudent}/${idSubject}`, idStudent);
};

const restoreSubjectApi = async (id: number): Promise<void> => {
  await api.patch(`${urls.SubjectRestore}/${id}`);
};
export const SubjectService = {
  registerSubjectApi,
  updateSubjectApi,
  getSubjectApi,
  getPaginatedSubjectApi,
  deleteSubjectApi,
  getSubjectByTeacherApi,
  getSubjectByStudentApi,
  getStudentAssignmentApi,

  AssingmentStudent,
  UnassignStudent,
  restoreSubjectApi,
};
