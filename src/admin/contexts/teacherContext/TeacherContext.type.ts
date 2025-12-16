import type { GetPaginated, PaginatedData } from "@/shared";
import type {
  CreateTeacherPayload,
  TeacherResponseDto,
  UpdateTeacherPayload,
} from "@/admin";

export interface TeacherContextType {
  loading: boolean;
  teacher: TeacherResponseDto[];
  paginatedTeacher: PaginatedData<TeacherResponseDto> | null;
  selectedTeacher: TeacherResponseDto | null;
  registerTeacher: (data: CreateTeacherPayload) => Promise<void>;
  updateTeacher: (data: UpdateTeacherPayload) => Promise<void>;
  getTeacher: () => void;
  getTeacherById: (id: number) => Promise<TeacherResponseDto | undefined>;
  getPaginatedTeacher: (params: GetPaginated) => Promise<void>;
  deleteTeacher: (id: number) => Promise<void>;
  restoreTeacher: (id: number) => Promise<void>;
  setSelectedTeacher: React.Dispatch<
    React.SetStateAction<TeacherResponseDto | null>
  >;
}
