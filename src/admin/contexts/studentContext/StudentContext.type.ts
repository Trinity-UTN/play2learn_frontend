import type { CreateStudentPayload } from "../../services/Student/StudentService";

export interface StudentContextType {
  loading: boolean;
  registerStudent: (data: CreateStudentPayload) => Promise<void>;
}
