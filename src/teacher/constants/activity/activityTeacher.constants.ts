import { FaClock, FaStar } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";

// ============================================
// ACTIVITY STATUS (TEACHER)
// ============================================
export const ACTIVITY_TEACHER_STATUS = {
  CREATED: "CREATED",
  PUBLISHED: "PUBLISHED",
  EXPIRED: "EXPIRED",
} as const;

export type ActivityTeacherStatus =
  (typeof ACTIVITY_TEACHER_STATUS)[keyof typeof ACTIVITY_TEACHER_STATUS];

export const ACTIVITY_TEACHER_STATUS_FILTERS = [
  {
    key: ACTIVITY_TEACHER_STATUS.CREATED,
    label: "Pendiente de publicación",
    icon: FaClock,
  },
  {
    key: ACTIVITY_TEACHER_STATUS.PUBLISHED,
    label: "Disponibles",
    icon: FaStar,
  },
  {
    key: ACTIVITY_TEACHER_STATUS.EXPIRED,
    label: "Expiradas",
    icon: FiXCircle,
  },
] as const;
