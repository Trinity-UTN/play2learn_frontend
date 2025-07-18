import type { GetPaginated, PaginatedData } from "../../../shared/types/PaginacionType";
import type { CreateTeacherPayload, TeacherResponseDto, UpdateTeacherPayload } from "../../services/teacher/TeacherService";

export interface TeacherContextType {
  loading: boolean;
  registerTeacher: (data: CreateTeacherPayload) => Promise<void>;
  updateTeacher: (data: UpdateTeacherPayload) => Promise<void>;
  deleteTeacher: (id: number) => Promise<void>;
  getTeacher: () => void;
  getTeacherById: (id: number) => Promise<TeacherResponseDto>;
  getPaginatedTeacher: (params: GetPaginated) => Promise<void>;
  teacher: TeacherResponseDto[];
  paginatedTeacher: PaginatedData<TeacherResponseDto> | null;
  selectedTeacher: TeacherResponseDto | null;
  setSelectedTeacher: React.Dispatch<React.SetStateAction<TeacherResponseDto | null>>;
}
