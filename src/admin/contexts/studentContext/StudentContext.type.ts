import type { CreateStudentPayload } from "../../services/student/StudentService";

export interface StudentContextType {
  loading: boolean;
  registerStudent: (data: CreateStudentPayload) => Promise<void>;
}
