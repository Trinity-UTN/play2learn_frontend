import type { CreateCoursePayload } from "../../services/course/CourseService";

export interface CourseContextType {
  loading: boolean;
  registerCourse: (data: CreateCoursePayload) => Promise<void>;
}
