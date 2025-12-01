import { FaBell, FaCheck, FaArrowRight } from "react-icons/fa";
import type { NotificationVariant } from "../../types/notification.types";
import { NOTIFICATION_CONFIG } from "../../constants/notification.constants";
import { formatNotificationDate } from "../../utils/notification.utils";
import { useNotificationDropdown } from "../../hooks/useNotificationDropdown";
import styles from "./NotificationDropdown.module.css";

interface NotificationDropdownProps {
  onClose: () => void;
  variant?: NotificationVariant;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  onClose,
  variant = "student",
}) => {
  const {
    notifications,
    loading,
    handleMarkAsRead,
    handleActionClick,
    isProcessing,
    isExpanded,
    setIsExpanded,
  } = useNotificationDropdown();

  const displayedNotifications = isExpanded
    ? notifications
    : notifications.slice(0, 3);
  const hasMoreNotifications = notifications.length > 3;

  const onActionClick = async (
    notificationId: number,
    isRead: boolean,
    notificationType: string
  ) => {
    await handleActionClick(notificationId, isRead, notificationType);
    onClose();
  };

  const onMarkAsRead = async (
    e: React.MouseEvent,
    notificationId: number,
    isRead: boolean
  ) => {
    e.stopPropagation();
    await handleMarkAsRead(notificationId, isRead);
  };

  const handleViewAll = () => {
    // TODO: Implementar navegación a la página de todas las notificaciones
  };

  if (loading) {
    return (
      <div className={`${styles.dropdown} ${styles[variant]}`}>
        <div className={styles.loadingState}>
          <div
            className={`${styles.spinner} ${styles[`spinner_${variant}`]}`}
          />
          <span>Cargando notificaciones...</span>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className={`${styles.dropdown} ${styles[variant]}`}>
        <div className={styles.dropdownHeader}>
          <h3 className={styles.dropdownTitle}>Notificaciones</h3>
          <button
            className={`${styles.viewAllTopButton} ${
              styles[`viewAllTopButton_${variant}`]
            }`}
            onClick={handleViewAll}
          >
            Ver todo
          </button>
        </div>
        <div className={styles.emptyState}>
          <FaBell className={styles.emptyStateIcon} />
          <p className={styles.emptyStateText}>No tienes notificaciones</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.dropdown} ${styles[variant]}`}>
      <div
        className={`${styles.dropdownHeader} ${styles[`header_${variant}`]}`}
      >
        <h3 className={styles.dropdownTitle}>Notificaciones</h3>
        <button
          className={`${styles.viewAllTopButton} ${
            styles[`viewAllTopButton_${variant}`]
          }`}
          onClick={handleViewAll}
        >
          Ver todo
        </button>
      </div>
      <div className={styles.notificationsList}>
        {displayedNotifications.map((notification) => {
          const config = NOTIFICATION_CONFIG[notification.notificationType];
          const IconComponent = config.icon;
          const ActionIcon = FaArrowRight;
          const formattedDate = formatNotificationDate(notification.createdAt);
          const processing = isProcessing(notification.id);

          return (
            <div
              key={notification.id}
              className={`${styles.notificationItem} ${
                styles[`item_${variant}`]
              } ${!notification.read ? styles.unread : ""} ${
                !notification.read ? styles[`unread_${variant}`] : ""
              } ${processing ? styles.processing : ""}`}
            >
              <div
                className={styles.iconContainer}
                style={{ backgroundColor: config.color }}
              >
                <IconComponent className={styles.notificationIcon} />
              </div>

              <div className={styles.notificationContent}>
                <div className={styles.notificationTitle}>
                  {notification.title}
                </div>
                <div className={styles.notificationTime}>{formattedDate}</div>
              </div>

              <div className={styles.notificationActionsRight}>
                {!notification.read && (
                  <button
                    className={`${styles.actionButton} ${
                      styles.markAsReadButton
                    } ${styles[`markAsReadButton_${variant}`]}`}
                    onClick={(e) =>
                      onMarkAsRead(e, notification.id, notification.read)
                    }
                    disabled={processing}
                    aria-label="Marcar como leída"
                  >
                    <FaCheck />
                  </button>
                )}

                <button
                  className={`${styles.actionButton} ${
                    styles.actionButtonIcon
                  } ${styles[`actionButtonIcon_${variant}`]}`}
                  onClick={() =>
                    onActionClick(
                      notification.id,
                      notification.read,
                      notification.notificationType
                    )
                  }
                  disabled={processing}
                  aria-label={config.actionLabel}
                  title={config.actionLabel}
                >
                  <ActionIcon />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {hasMoreNotifications && !isExpanded && (
        <button
          className={`${styles.expandButton} ${
            styles[`expandButton_${variant}`]
          }`}
          onClick={() => setIsExpanded(true)}
        >
          Ver más notificaciones ({notifications.length - 3})
        </button>
      )}

      {isExpanded && hasMoreNotifications && (
        <button
          className={`${styles.expandButton} ${
            styles[`expandButton_${variant}`]
          }`}
          onClick={() => setIsExpanded(false)}
        >
          Mostrar menos
        </button>
      )}
    </div>
  );
};

export default NotificationDropdown;
