import type { PaginatedData } from "@/shared";
import type { UserResponseDto } from "@/user/services/login/LoginService";

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

export interface TeacherResponseDto {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  user: UserResponseDto;
  active: boolean;
}

export interface PaginatedTeacherResponse {
  data: PaginatedData<TeacherResponseDto>;
  message: string;
  errors: any;
  timestamp: string;
}
