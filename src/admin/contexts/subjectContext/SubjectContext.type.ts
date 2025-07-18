import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  CreateSubjectPayload,
  SubjectResponseDto,
} from "../../services/subject/SubjectService";

export interface SubjectContextType {
  loading: boolean;
  registerSubject: (data: CreateSubjectPayload) => Promise<void>;
  getSubject: () => void;
  getPaginatedSubject: (params: GetPaginated) => Promise<void>;
  deleteSubject: (id: number) => Promise<void>;
  subjects: SubjectResponseDto[];
  paginatedSubjects: PaginatedData<SubjectResponseDto> | null;
}
