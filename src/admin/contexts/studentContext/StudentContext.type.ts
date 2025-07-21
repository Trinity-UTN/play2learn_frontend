import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  CreateStudentPayload,
  UpdateStudentPayload,
  StudentResponseDto,
} from "../../services/student/StudentService";

export interface StudentContextType {
  loading: boolean;
  registerStudent: (data: CreateStudentPayload) => Promise<void>;
  updateStudent: (data: UpdateStudentPayload) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
  restoreStudent: (id: number) => Promise<void>;
  getStudent: () => void;
  getStudentById: (id: number) => Promise<StudentResponseDto>;
  getPaginatedStudent: (params: GetPaginated) => Promise<void>;
  students: StudentResponseDto[];
  paginatedStudents: PaginatedData<StudentResponseDto> | null;
  selectedStudent: StudentResponseDto | null;
  setSelectedStudent: React.Dispatch<
    React.SetStateAction<StudentResponseDto | null>
  >;
}
