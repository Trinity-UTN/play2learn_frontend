import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCircle,
} from "react-icons/fa";

// ============================================
// ACTIVITY STATUS (TEACHER ACTIVITY, STUDENT DATA)
// ============================================
export const STUDENT_ACTIVITY_STATES = {
  APPROVED: "APPROVED",
  IN_PROGRESS: "IN_PROGRESS",
  DISAPPROVED: "DISAPPROVED",
  NOT_COMPLETED: "NOT_COMPLETED",
} as const;

export type StudentActivityState =
  (typeof STUDENT_ACTIVITY_STATES)[keyof typeof STUDENT_ACTIVITY_STATES];

export const STUDENT_ACTIVITY_STATE_CONFIG = {
  [STUDENT_ACTIVITY_STATES.APPROVED]: {
    label: "Aprobada",
    color: "#10b981",
    bgColor: "#dcfce7",
    icon: FaCheckCircle,
  },
  [STUDENT_ACTIVITY_STATES.DISAPPROVED]: {
    label: "Desaprobada",
    color: "#ef4444",
    bgColor: "#fee2e2",
    icon: FaTimesCircle,
  },
  [STUDENT_ACTIVITY_STATES.IN_PROGRESS]: {
    label: "En Curso",
    color: "#f59e0b",
    bgColor: "#fef3c7",
    icon: FaClock,
  },
  [STUDENT_ACTIVITY_STATES.NOT_COMPLETED]: {
    label: "No Realizada",
    color: "#6b7280",
    bgColor: "#f3f4f6",
    icon: FaCircle,
  },
} as const;

// ============================================
// ACTIVITY DIFFICULTY LEVELS
// ============================================
export const ACTIVITY_DIFFICULTY_LEVELS = {
  FACIL: "FACIL",
  MEDIO: "MEDIO",
  DIFICIL: "DIFICIL",
} as const;

export type ActivityDifficultyLevel =
  (typeof ACTIVITY_DIFFICULTY_LEVELS)[keyof typeof ACTIVITY_DIFFICULTY_LEVELS];

export const ACTIVITY_DIFFICULTY_CONFIG = {
  [ACTIVITY_DIFFICULTY_LEVELS.FACIL]: {
    label: "Fácil",
    color: "#10b981",
    bgColor: "#dcfce7",
  },
  [ACTIVITY_DIFFICULTY_LEVELS.MEDIO]: {
    label: "Medio",
    color: "#f59e0b",
    bgColor: "#fef3c7",
  },
  [ACTIVITY_DIFFICULTY_LEVELS.DIFICIL]: {
    label: "Difícil",
    color: "#ef4444",
    bgColor: "#fee2e2",
  },
} as const;

// ============================================
// REWARD TYPES
// ============================================
export const REWARD_TYPES = {
  EQUITATIVO: "EQUITATIVO",
  POISSON: "POISSON",
} as const;

export type RewardType = (typeof REWARD_TYPES)[keyof typeof REWARD_TYPES];

export const REWARD_TYPE_CONFIG = {
  [REWARD_TYPES.EQUITATIVO]: {
    label: "Equitativo",
    color: "#3b82f6",
    bgColor: "#dbeafe",
  },
  [REWARD_TYPES.POISSON]: {
    label: "Poisson",
    color: "#8b5cf6",
    bgColor: "#ede9fe",
  },
} as const;
