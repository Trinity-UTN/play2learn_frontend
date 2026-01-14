import { FaCheck, FaTimes } from "react-icons/fa";

// ============================================
// NO LUDICA REVIEW CONSTANTS
// ============================================

export const PASSING_SCORE = 60;

export const REVIEW_STATES = {
  APPROVED: "APPROVED",
  DISAPPROVED: "DISAPPROVED",
  PENDING: "PENDING",
} as const;

export type ReviewState = (typeof REVIEW_STATES)[keyof typeof REVIEW_STATES];

export interface ReviewStateConfig {
  label: string;
  color: string;
  bgColor: string;
  icon: typeof FaCheck | typeof FaTimes;
}

export const REVIEW_STATE_CONFIG: Record<ReviewState, ReviewStateConfig> = {
  APPROVED: {
    label: "Aprobado",
    color: "#22c55e",
    bgColor: "rgba(34, 197, 94, 0.15)",
    icon: FaCheck,
  },
  DISAPPROVED: {
    label: "Desaprobado",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.15)",
    icon: FaTimes,
  },
  PENDING: {
    label: "Pendiente",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.15)",
    icon: FaTimes,
  },
};

// ============================================
// ANIMATIONS
// ============================================

export const reviewContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const reviewItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ============================================
// LOCAL STORAGE KEY
// ============================================

export const ATTEMPT_REVIEW_STORAGE_KEY = "attempt_review_data";
