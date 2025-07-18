import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
import { urls } from "../urls";
import type { CourseResponseDto } from "../course/CourseService";
import type { TeacherResponseDto } from "../teacher/TeacherService";

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
  try {
    await api.post(urls.Subject, data);
  } catch (error) {
    console.error("Error al crear la materia:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const updateSubjectApi = async (data: UpdateSubjectPayload): Promise<void> => {
  try {
    await api.put(`${urls.Subject}/${data.id}`, data);
  } catch (error) {
    console.error("Error al actualizar la materia:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getSubjectApi = async () => {
  try {
    const response = await api.get(urls.Subject);
    return response;
  } catch (error) {
    console.error("Error al obtener las materias:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getPaginatedSubjectApi = async (
  params: GetPaginated
): Promise<PaginatedSubjectResponse> => {
  try {
    const cleanParams = buildCleanPaginatedParams(params);

    const response = await api.get(urls.SubjectPaginated, {
      params: cleanParams,
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener materias paginadas:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const deleteSubjectApi = async (id: number): Promise<void> => {
  try {
    //console.log(`Eliminando materia con ID: ${id}`); // TODO: REMOVE_DEBUG
    await api.delete(`${urls.Subject}/${id}`);
  } catch (error) {
    console.error("Error al eliminar la materia:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const SubjectService = {
  registerSubjectApi,
  updateSubjectApi,
  getSubjectApi,
  getPaginatedSubjectApi,
  deleteSubjectApi,
};
