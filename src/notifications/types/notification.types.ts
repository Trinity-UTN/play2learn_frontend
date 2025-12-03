import type { IconType } from "react-icons";

export type NotificationVariant = "student" | "teacher";

export type NotificationType =
  | "NEW_ACTIVITY_PUBLISHED"
  | "ACTIVITY_ABOUT_TO_EXPIRE"
  | "CORRECTED_ACTIVITY"
  | "NEW_BENEFIT"
  | "NEW_SKINS"
  | "NEW_ACHIEVEMENT"
  | "RANKING_TOP_1"
  | "BENEFIT_USE_ACCEPTED"
  | "STOCK_ORDER_EXECUTED"
  | "FIXED_TERM_DEPOSIT_ENDED"
  | "STUDENT_COMPLETE_ACTIVITY"
  | "ALL_STUDENTS_APPROVE_ACTIVITY"
  | "BENEFIT_PURCHASED"
  | "BENEFIT_USE_REQUESTED";

export interface Notification {
  id: number;
  title: string;
  notificationType: NotificationType;
  createdAt: string;
  read: boolean;
}

export interface NotificationResponse {
  id: number;
  title: string;
  notificationType: NotificationType;
  createdAt: string;
  read: boolean;
}

export interface NotificationConfig {
  icon: IconType;
  color: string;
  actionLabel: string;
  actionPath: string;
}
