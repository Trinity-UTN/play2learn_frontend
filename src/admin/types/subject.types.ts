import type { PaginatedData } from "@/shared";
import type { CourseResponseDto } from "./course.types";
import type { TeacherResponseDto } from "./teacher.types";

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

export interface SubjectSimplifiedResponseDto {
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

export interface StudentAssingmentResponse {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  registered: boolean;
}
