import type { Notification } from "../types/notification.types";

export interface NotificationsContextType {
  // Estados generales
  loading: boolean;
  notifications: Notification[];
  unreadCount: number;

  // Funciones principales
  getUserNotifications: () => Promise<void>;
  markAsRead: (notificationId: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;

  // Funciones auxiliares
  refreshNotifications: () => Promise<void>;
}
