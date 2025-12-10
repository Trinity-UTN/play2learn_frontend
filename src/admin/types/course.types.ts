import type { PaginatedData } from "@/shared";
import type { YearResponseDto } from "./year.types";

export interface CreateCoursePayload {
  name: string;
  year_id: number;
}

export interface UpdateCoursePayload {
  id: number;
  name: string;
}

export interface CourseResponseDto {
  id: number;
  name: string;
  year: YearResponseDto;
}

export interface PaginatedCourseResponse {
  data: PaginatedData<CourseResponseDto>;
  message: string;
  errors: any;
  timestamp: string;
}
