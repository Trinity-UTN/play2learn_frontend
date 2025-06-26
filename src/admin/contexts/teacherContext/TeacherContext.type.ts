import type { CreateTeacherPayload } from "../../services/teacher/TeacherService";

export interface TeacherContextType {
  loading: boolean;
  registerTeacher: (data: CreateTeacherPayload) => Promise<void>;
}
