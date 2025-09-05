import type { CourseResponseDto } from "../course/CourseService";
import type { TeacherResponseDto } from "../teacher/TeacherService";
import { urls } from "../urls";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";

export interface CreateSubjectPayload {
  name: string;
  courseId: number;
  teacherId: number | null;
  optional: boolean;
}

export interface UpdateSubjectPayload {
  id: number;
  name: string;
  courseId: number;
  teacherId: number | null;
  optional: boolean;
}

export interface SubjectResponseDto {
  id: number;
  name: string;
  course: CourseResponseDto;
  teacher: TeacherResponseDto;
  optional: boolean;
  actualBalance: number;
  initialBalance: number;
}

export interface PaginatedSubjectResponse {
  data: PaginatedData<SubjectResponseDto>;
  message: string;
  errors: any;
  timestamp: string;
}

const registerSubjectApi = async (
  data: CreateSubjectPayload
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

const getPaginatedSubjectApi = async (
  params: GetPaginated
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

export const SubjectService = {
  registerSubjectApi,
  updateSubjectApi,
  getSubjectApi,
  getPaginatedSubjectApi,
  deleteSubjectApi,
  getSubjectByTeacherApi,
};
