import type {
  CreateTeacherPayload,
  GetTeacherPayload,
} from "../../services/teacher/TeacherService";

export interface TeacherContextType {
  loading: boolean;
  registerTeacher: (data: CreateTeacherPayload) => Promise<void>;
  getTeacher: () => void;
  teachers: GetTeacherPayload[];
}
