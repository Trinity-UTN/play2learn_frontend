import type { ActivityTeacherResponse } from "../../types/TeacherActivity.type";
import {
  ACTIVITY_TEACHER_STATUS,
  type ActivityTeacherStatus,
} from "../../constants/activity/activityTeacher.constants";

export type ActivityActionHandlers = {
  onViewDetails: (
    activity: ActivityTeacherResponse,
    activityId: number,
  ) => void;
  onReexpose: (activityId: number, activityName: string) => void;
};

/**
 * Retorna la configuración visual (colores y labels) según el estado de la actividad
 */
export const getActivityStatusConfig = (status: ActivityTeacherStatus) => {
  switch (status) {
    case ACTIVITY_TEACHER_STATUS.CREATED:
      return {
        label: "Pendiente de publicación",
        color: { bg: "#dbeafe", text: "#1e40af" },
        icon: "FaClock",
      };
    case ACTIVITY_TEACHER_STATUS.PUBLISHED:
      return {
        label: "Disponible",
        color: { bg: "#dcfce7", text: "#065f46" },
        icon: "FaStar",
      };
    case ACTIVITY_TEACHER_STATUS.EXPIRED:
      return {
        label: "Expirada",
        color: { bg: "#fee2e2", text: "#7f1d1d" },
        icon: "FiXCircle",
      };
    default:
      return {
        label: "Desconocido",
        color: { bg: "#f3f4f6", text: "#6b7280" },
        icon: "FaQuestion",
      };
  }
};

/**
 * Formatea la fecha de la actividad
 */
export const formatActivityDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const hasActiveFilters = (
  search: string,
  subjectId: string,
  courseId: string,
  yearId: string,
): boolean => {
  return !!search || !!subjectId || !!yearId || !!courseId;
};
