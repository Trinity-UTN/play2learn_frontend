import type {
  CreateCoursePayload,
  GetCoursePayload,
} from "../../services/course/CourseService";

export interface CourseContextType {
  loading: boolean;
  registerCourse: (data: CreateCoursePayload) => Promise<void>;
  getCourse: () => void;
  courses: GetCoursePayload[];
}
