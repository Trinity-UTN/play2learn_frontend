import { useEffect, useCallback, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { NotificationsService } from "../services/NotificationsService";
import { NotificationsContext } from "./NotificationsContext";
import type { NotificationsContextType } from "./NotificationsContext.type";
import type { Notification } from "../types/notification.types";
import { useHandleApiError } from "../../shared/hooks/useHandleApiError";

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const location = useLocation();

  // Estados generales
  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Calcular notificaciones no leídas cuando cambian las notificaciones. TODO: optimizar
  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Funciones principales
  const getUserNotifications = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await NotificationsService.getUserNotifications();
      setNotifications(response);
    } catch (error) {
      handleApiError(error, "Error al obtener las notificaciones");
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);

  const markAsRead = useCallback(
    async (notificationId: number): Promise<void> => {
      setLoading(true);
      try {
        const updatedNotification = await NotificationsService.markAsRead(
          notificationId
        );

        setNotifications((prev) =>
          prev.map((n) => (n.id === notificationId ? updatedNotification : n))
        );
      } catch (error) {
        handleApiError(error, "Error al marcar la notificación como leída");
      } finally {
        setLoading(false);
      }
    },
    [handleApiError]
  );

  const markAllAsRead = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      // Marcar todas las notificaciones no leídas
      const unreadNotifications = notifications.filter((n) => !n.read);

      await Promise.all(
        unreadNotifications.map((n) => NotificationsService.markAsRead(n.id))
      );

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      handleApiError(
        error,
        "Error al marcar todas las notificaciones como leídas"
      );
    } finally {
      setLoading(false);
    }
  }, [notifications, handleApiError]);

  const refreshNotifications = useCallback(async (): Promise<void> => {
    await getUserNotifications();
  }, [getUserNotifications]);

  useEffect(() => {
    getUserNotifications();
  }, [location.pathname]);

  const contextValue: NotificationsContextType = {
    // Estados generales
    loading,
    notifications,
    unreadCount,

    // Funciones principales
    getUserNotifications,
    markAsRead,
    markAllAsRead,

    // Funciones auxiliares
    refreshNotifications,
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};
