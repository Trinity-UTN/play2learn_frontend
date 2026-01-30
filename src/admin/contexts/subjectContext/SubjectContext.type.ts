import type { GetPaginated, PaginatedData } from "@/shared";
import type {
  CreateSubjectPayload,
  SubjectResponseDto,
  UpdateSubjectPayload,
} from "@/admin";
import type { StudentAssingmentResponse } from "@/admin/types/subject.types";

export interface SubjectContextType {
  loading: boolean;
  subjects: SubjectResponseDto[];
  paginatedSubjects: PaginatedData<SubjectResponseDto> | null;
  selectedSubject: SubjectResponseDto | null;
  studentAssingment: StudentAssingmentResponse[] | null;
  registerSubject: (data: CreateSubjectPayload) => Promise<void>;
  updateSubject: (data: UpdateSubjectPayload) => Promise<void>;
  getSubject: () => void;
  getSubjectByTeacher: () => void;
  getSubjectByStudent: () => void;
  getPaginatedSubject: (params: GetPaginated) => Promise<void>;
  deleteSubject: (id: number) => Promise<void>;
  setSelectedSubject: (subject: SubjectResponseDto | null) => void;
  getStudentAssingment: (id: number) => void;
  assingmentStudent: (idSubject: number, idStudent: number[]) => void;
  unassignStudent: (idSubject: number, idStudent: number[]) => void;
}
