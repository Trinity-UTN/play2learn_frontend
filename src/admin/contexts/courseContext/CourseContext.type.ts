import type {
  CreateCoursePayload,
  CourseResponseDto,
  UpdateCoursePayload,
} from "../../services/course/CourseService";
import type { GetPaginated, PaginatedData } from "../../../shared/types/PaginacionType";

export interface CourseContextType {
  loading: boolean;
  registerCourse: (data: CreateCoursePayload) => Promise<void>;
  updateCourse: (data: UpdateCoursePayload) => Promise<void>;
  deleteCourse: (id: number) => Promise<void>;
  getCourse: () => void;
  getCourseById: (id: number) => Promise<CourseResponseDto>;
  getPaginatedCourse: (params: GetPaginated) => Promise<void>;
  courses: CourseResponseDto[];
  paginatedCourse: PaginatedData<CourseResponseDto> | null;
  selectedCourse: CourseResponseDto | null;
  setSelectedCourse: React.Dispatch<React.SetStateAction<CourseResponseDto | null>>;
}


