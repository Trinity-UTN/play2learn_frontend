import type {
  CreateTeacherPayload,
  TeacherResponseDto,
} from "../../services/teacher/TeacherService";

export interface TeacherContextType {
  loading: boolean;
  registerTeacher: (data: CreateTeacherPayload) => Promise<void>;
  getTeacher: () => void;
  teachers: TeacherResponseDto[];
}
