import type { CourseResponseDto } from "../course/CourseService";
import { urls } from "../urls";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";

export interface CreateStudentPayload {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  course_id: number;
  emailTutor: string;
  birthdate: string;
}

export interface UpdateStudentPayload {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  course_id: number;
  emailTutor: string;
  birthdate: string;
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

export interface Wallet {
  id: number;
  balance: number;
  invertedBalance: number;
}

export interface StudentResponseDto {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  birthdate: string;
  emailTutor: string;
  user: User;
  course: CourseResponseDto;
  active: boolean;
  profile: Profile;
  wallet: Wallet;
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
  params: GetPaginated
): Promise<PaginatedStudentResponse> => {
  const cleanParams = buildCleanPaginatedParams(params);
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
