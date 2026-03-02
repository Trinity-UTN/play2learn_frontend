import type { Notification } from "../types/notification.types";
import {
  NOTIFICATION_EXPIRATION_DAYS,
  NOTIFICATION_HIDDEN_ROUTES,
} from "../constants/notification.constants";

/**
 * Verifica si una notificación ha expirado basado en su fecha de creación.
 */
export const isNotificationExpired = (createdAt: string): boolean => {
  const notificationDate = new Date(createdAt);
  const expirationDate = new Date(notificationDate);
  expirationDate.setDate(
    expirationDate.getDate() + NOTIFICATION_EXPIRATION_DAYS,
  );
  return new Date() > expirationDate;
};

/**
 * Filtra una lista de notificaciones para incluir solo aquellas que no han expirado.
 */
export const filterValidNotifications = (
  notifications: Notification[],
): Notification[] => {
  return notifications.filter(
    (notification) => !isNotificationExpired(notification.createdAt),
  );
};

/**
 * Ordena un array de notificaciones.
 * La lógica de ordenación es: no leídas (más recientes primero), seguidas de las leídas (más recientes primero).
 */
export const sortNotifications = (
  notifications: Notification[],
): Notification[] => {
  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  const sortByDate = (a: Notification, b: Notification) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  };

  return [...unread.sort(sortByDate), ...read.sort(sortByDate)];
};

/**
 * Formatea una cadena de fecha de notificación a un formato de tiempo relativo
 * (e.g., "Hace un momento", "Hace 5m", "Hace 3h", "Hace 2d") o a un formato de fecha corta
 * si la diferencia es mayor a 7 días.
 */
export const formatNotificationDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Hace un momento";
  if (diffMins < 60) return `Hace ${diffMins}m`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;

  return date.toLocaleDateString("es-AR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Verifica si se debe mostrar una notificación basada en la ruta actual.
 * Si la ruta actual corresponde a una actividad en juego, se oculta la notificación.
 */
export const shouldShowNotifications = (pathname: string): boolean => {
  return !NOTIFICATION_HIDDEN_ROUTES.STUDENT_ACTIVITY_PLAY.test(pathname);
};
