import type { ActivityTeacherResponse } from "../../types/TeacherActivity.type";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

export interface ActivityTeacherContextType {
  // Estados generales
  loading: boolean;
  selectedActivityTeacher: ActivityTeacherResponse | null;
  paginatedActivitiesTeacher: PaginatedData<ActivityTeacherResponse> | null;

  // Funciones principales
  getPaginatedActivitiesTeacher: (params: GetPaginated) => Promise<void>;

  // Funciones auxiliares
  setSelectedActivityTeacher: (
    activity: ActivityTeacherResponse | null
  ) => void;
}
