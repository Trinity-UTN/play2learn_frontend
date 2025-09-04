import type {
  CreateCoursePayload,
  CourseResponseDto,
  UpdateCoursePayload,
} from "../../services/course/CourseService";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

export interface CourseContextType {
  loading: boolean;
  courses: CourseResponseDto[];
  paginatedCourse: PaginatedData<CourseResponseDto> | null;
  selectedCourse: CourseResponseDto | null;
  registerCourse: (data: CreateCoursePayload) => Promise<void>;
  updateCourse: (data: UpdateCoursePayload) => Promise<void>;
  getCourse: () => void;
  getCourseById: (id: number) => Promise<CourseResponseDto | undefined>;
  getPaginatedCourse: (params: GetPaginated) => Promise<void>;
  deleteCourse: (id: number) => Promise<void>;
  setSelectedCourse: React.Dispatch<
    React.SetStateAction<CourseResponseDto | null>
  >;
}
