import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "./useNotifications";
import { NOTIFICATION_CONFIG } from "../constants/notification.constants";

/**
 * Hook que maneja el estado y la lógica para el dropdown de notificaciones.
 */
export const useNotificationDropdown = () => {
  const navigate = useNavigate();

  const { notifications, loading, markAsRead } = useNotifications();
  const [processingIds, setProcessingIds] = useState<Set<number>>(new Set());
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMarkAsRead = useCallback(
    async (notificationId: number, isRead: boolean) => {
      if (!isRead && !processingIds.has(notificationId)) {
        setProcessingIds((prev) => new Set(prev).add(notificationId));

        try {
          await markAsRead(notificationId);
        } finally {
          setProcessingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(notificationId);
            return newSet;
          });
        }
      }
    },
    [markAsRead, processingIds]
  );

  const handleActionClick = useCallback(
    async (
      notificationId: number,
      isRead: boolean,
      notificationType: string
    ) => {
      // Marcar como leída si no lo está
      if (!isRead) {
        await handleMarkAsRead(notificationId, isRead);
      }

      // Navegar a la ruta correspondiente
      const config =
        NOTIFICATION_CONFIG[
          notificationType as keyof typeof NOTIFICATION_CONFIG
        ];
      if (config) {
        navigate(config.actionPath);
      }
    },
    [handleMarkAsRead, navigate]
  );

  const isProcessing = useCallback(
    (notificationId: number) => processingIds.has(notificationId),
    [processingIds]
  );

  return {
    loading,
    notifications,
    isExpanded,
    handleMarkAsRead,
    handleActionClick,
    isProcessing,
    setIsExpanded,
  };
};
