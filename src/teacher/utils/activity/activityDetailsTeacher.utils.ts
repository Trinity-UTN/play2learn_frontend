import {
  STUDENT_ACTIVITY_STATE_CONFIG,
  ACTIVITY_DIFFICULTY_CONFIG,
  REWARD_TYPE_CONFIG,
} from "../../constants/activity/activityDetailsTeacher.constants";
import type {
  StudentActivityState,
  ActivityDifficultyLevel,
  RewardType,
} from "../../constants/activity/activityDetailsTeacher.constants";

/**
 * Obtiene la configuración visual (colores y etiqueta) de un estado
 */
export const getStatusConfig = (status: string) => {
  switch (status) {
    case "PUBLISHED":
      return { label: "Publicada", color: "#10b981" };
    case "CREATED":
      return { label: "Pendiente de publicación", color: "#f59e0b" };
    case "EXPIRED":
      return { label: "Vencida", color: "#6b7280" };
    default:
      return { label: "Desconocido", color: "#6b7280" };
  }
};

/**
 * Obtiene la configuración visual (colores y etiqueta) de un estado de estudiante
 */
export const getStudentStateConfig = (state: StudentActivityState) => {
  return (
    STUDENT_ACTIVITY_STATE_CONFIG[state] ||
    STUDENT_ACTIVITY_STATE_CONFIG.NOT_COMPLETED
  );
};

/**
 * Obtiene la configuración visual (colores y etiqueta) de la dificultad
 */
export const getDifficultyConfig = (difficulty: ActivityDifficultyLevel) => {
  return (
    ACTIVITY_DIFFICULTY_CONFIG[difficulty] || ACTIVITY_DIFFICULTY_CONFIG.MEDIO
  );
};

/**
 * Obtiene la configuración visual (colores y etiqueta) del tipo de recompensa
 */
export const getRewardTypeConfig = (rewardType: RewardType) => {
  return REWARD_TYPE_CONFIG[rewardType] || REWARD_TYPE_CONFIG.EQUITATIVO;
};

/**
 * Formatea el tiempo promedio de realización de segundos a formato legible
 */
export const formatCompletionTime = (seconds: number): string => {
  if (!seconds || seconds === 0) return "-";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${minutes}m ${secs}s`;
};

/**
 * Filtra estudiantes por nombre (búsqueda case-insensitive)
 */
export const filterStudentsByName = (
  students: any[],
  searchTerm: string
): any[] => {
  if (!searchTerm.trim()) return students;
  const lowerSearch = searchTerm.toLowerCase();
  return students.filter((student) =>
    student.studentName.toLowerCase().includes(lowerSearch)
  );
};
