import api from "../../../shared/utils/api";
import { urls } from "../urls";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
import type { CourseResponseDto } from "../course/CourseService";

export interface CreateStudentPayload {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  course_id: number;
}

export interface UpdateStudentPayload {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  course_id: number;
}

// Despues ver si esta interface es comun en otros response y sacarla de aca
interface User {
  id: number;
  email: string;
}

export interface BodyPart {
  id: number;
  name: string;
  image: string;
  price: number;
  type: string;
  available: boolean;
}

export interface Profile {
  id: number;
  selectedBody: BodyPart | null;
  selectedShirt: BodyPart | null;
  selectedHat: BodyPart | null;
  ownedAspects: BodyPart[];
}

export interface StudentResponseDto {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  user: User;
  course: CourseResponseDto;
  active: boolean;
  profile: Profile;
}

export interface PaginatedStudentResponse {
  data: PaginatedData<StudentResponseDto>;
  message: string;
  errors: any;
  timestamp: string;
}

const registerStudentApi = async (
  data: CreateStudentPayload
): Promise<void> => {
  try {
    await api.post(urls.Students, data);
  } catch (error) {
    console.error("Error al crear el estudiante:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const updateStudentApi = async (data: UpdateStudentPayload): Promise<void> => {
  try {
    await api.put(`${urls.Students}/${data.id}`, data);
  } catch (error) {
    console.error("Error al actualizar el estudiante:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getStudentApi = async () => {
  try {
    const response = await api.get(urls.Students);
    return response;
  } catch (error) {
    console.error("Error al obtener los estudiantes:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getStudentByIdApi = async (id: number): Promise<StudentResponseDto> => {
  try {
    const response = await api.get(`${urls.Students}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener el estudiante (por id):", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getPaginatedStudentApi = async (
  params: GetPaginated
): Promise<PaginatedStudentResponse> => {
  try {
    const cleanParams = buildCleanPaginatedParams(params);

    const response = await api.get(urls.StudentsPaginated, {
      params: cleanParams,
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener estudiantes paginados:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const deleteStudentApi = async (id: number): Promise<void> => {
  try {
    await api.delete(`${urls.Students}/${id}`);
  } catch (error) {
    console.error("Error al eliminar el estudiante:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const restoreStudentApi = async (id: number): Promise<void> => {
  try {
    await api.patch(`${urls.StudentsRestore}/${id}`);
  } catch (error) {
    console.error("Error al restaurar el estudiante:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
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
