import type { GetPaginated, PaginatedData } from "@/shared";
import type {
  CreateStudentPayload,
  UpdateStudentPayload,
  StudentResponseDto,
} from "@/admin";

export interface StudentContextType {
  loading: boolean;
  students: StudentResponseDto[];
  paginatedStudents: PaginatedData<StudentResponseDto> | null;
  selectedStudent: StudentResponseDto | null;
  registerStudent: (data: CreateStudentPayload) => Promise<void>;
  updateStudent: (data: UpdateStudentPayload) => Promise<void>;
  getStudent: () => void;
  getStudentById: (id: number) => Promise<StudentResponseDto | undefined>;
  getPaginatedStudent: (params: GetPaginated) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
  restoreStudent: (id: number) => Promise<void>;
  setSelectedStudent: React.Dispatch<
    React.SetStateAction<StudentResponseDto | null>
  >;
}
