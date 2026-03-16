import { useEffect, useCallback, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { NotificationsService } from "../services/NotificationsService";
import { NotificationsContext } from "./NotificationsContext";
import type { NotificationsContextType } from "./NotificationsContext.type";
import type { Notification } from "../types/notification.types";
import { useHandleApiError } from "@/shared";

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
  }, []);

  // const getUserNotifications = useCallback(async (): Promise<void> => {
  //   setLoading(true);
  //   try {
  //     // Mock data basado en el DTO del backend
  //     const mockNotifications: Notification[] = [
  //       {
  //         id: 1,
  //         title: "Nueva actividad disponible",
  //         notificationType: "NEW_ACTIVITY_PUBLISHED",
  //         createdAt: new Date().toISOString(),
  //         read: false,
  //       },
  //       {
  //         id: 2,
  //         title: "Actividad por vencer",
  //         notificationType: "ACTIVITY_ABOUT_TO_EXPIRE",
  //         createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
  //         read: false,
  //       },
  //       {
  //         id: 3,
  //         title: "Actividad corregida",
  //         notificationType: "CORRECTED_ACTIVITY",
  //         createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 días atrás
  //         read: true,
  //       },
  //       {
  //         id: 4,
  //         title: "Nuevo beneficio disponible",
  //         notificationType: "NEW_BENEFIT",
  //         createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 días atrás
  //         read: false,
  //       },
  //       {
  //         id: 5,
  //         title: "Nueva skin disponible",
  //         notificationType: "NEW_SKINS",
  //         createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 días atrás
  //         read: true,
  //       },
  //       {
  //         id: 6,
  //         title: "Nuevo logro disponible",
  //         notificationType: "NEW_ACHIEVEMENT",
  //         createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 días atrás
  //         read: false,
  //       },
  //       {
  //         id: 7,
  //         title: "Has llegado a la cima del ranking",
  //         notificationType: "RANKING_TOP_1",
  //         createdAt: new Date(Date.now() - 518400000).toISOString(), // 6 días atrás
  //         read: true,
  //       },
  //     ];

  //     setNotifications(mockNotifications);
  //   } catch (error) {
  //     handleApiError(error, "Error al obtener las notificaciones");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const markAsRead = useCallback(
    async (notificationId: number): Promise<void> => {
      setLoading(true);
      try {
        const updatedNotification =
          await NotificationsService.markAsRead(notificationId);

        setNotifications((prev) =>
          prev.map((n) => (n.id === notificationId ? updatedNotification : n)),
        );
      } catch (error) {
        handleApiError(error, "Error al marcar la notificación como leída");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const markAllAsRead = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      // Marcar todas las notificaciones no leídas
      const unreadNotifications = notifications.filter((n) => !n.read);

      await Promise.all(
        unreadNotifications.map((n) => NotificationsService.markAsRead(n.id)),
      );

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      handleApiError(
        error,
        "Error al marcar todas las notificaciones como leídas",
      );
    } finally {
      setLoading(false);
    }
  }, [notifications]);

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
