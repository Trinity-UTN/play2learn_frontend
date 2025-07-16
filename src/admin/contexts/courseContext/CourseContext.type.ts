import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  CreateCoursePayload,
  CourseResponseDto,
  UpdateCoursePayload,
} from "../../services/course/CourseService";

export interface CourseContextType {
  loading: boolean;
  registerCourse: (data: CreateCoursePayload) => Promise<void>;
  updateCourse: (data: UpdateCoursePayload) => Promise<void>;
  getCourse: () => void;
  getPaginatedCourse: (params: GetPaginated) => Promise<void>;
  deleteCourse: (id: number) => Promise<void>;
  courses: CourseResponseDto[];
  paginatedCourse: PaginatedData<CourseResponseDto> | null;
}
