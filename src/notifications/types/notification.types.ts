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
  | "STUDENT_COMPLETED_ACTIVITY"
  | "ALL_STUDENTS_COMPLETED_ACTIVITY"
  | "ACTIVITY_PUBLISHED"
  | "ACTIVITY_EXPIRED"
  | "ACTIVITY_PENDING_CORRECTION"
  | "BENEFIT_PURCHASED"
  | "BENEFIT_REQUEST";

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
