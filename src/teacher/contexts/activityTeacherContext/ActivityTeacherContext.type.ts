import type {
  ActivityTeacherDetailsResponse,
  ActivityTeacherResponse,
} from "../../types/TeacherActivity.type";
import type {
  SubjectSimplifiedResponseDto,
  CourseResponseDto,
  YearResponseDto,
} from "@/admin";
import type { GetPaginated, PaginatedData } from "@/shared";

export interface ActivityTeacherContextType {
  // Estados generales
  loading: boolean;

  /// Estados de Actividad
  selectedActivityTeacher: ActivityTeacherResponse | null;
  paginatedActivitiesTeacher: PaginatedData<ActivityTeacherResponse> | null;
  activityDetails: ActivityTeacherDetailsResponse | null;

  /// Estados de materias, cursos, años
  subjectsTeacher: SubjectSimplifiedResponseDto[] | null;
  coursesTeacher: CourseResponseDto[] | null;
  yearsTeacher: YearResponseDto[] | null;

  // Funciones principales
  getPaginatedActivitiesTeacher: (params: GetPaginated) => Promise<void>;
  getActivityDetailsTeacher: (activityId: number) => Promise<void>;
  getSubjectCoursesYearsTeacher: () => Promise<void>;

  // Funciones auxiliares
  setSelectedActivityTeacher: (
    activity: ActivityTeacherResponse | null
  ) => void;
}
