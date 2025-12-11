import { FaBell } from "react-icons/fa";
import type { NotificationVariant } from "../../types/notification.types";
import { Button } from "@/shared";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";
import { useNotificationBell } from "../../hooks/useNotificationBell";
import styles from "./NotificationBell.module.css";

interface NotificationBellProps {
  variant?: NotificationVariant;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  variant = "student",
}) => {
  const {
    isOpen,
    containerRef,
    unreadCount,
    loading,
    toggleDropdown,
    closeDropdown,
  } = useNotificationBell();

  return (
    <div className={styles.bellContainer} ref={containerRef}>
      <Button
        variant="ghost"
        size="md"
        className={`${styles.bellButton} ${styles[variant]}`}
        onClick={toggleDropdown}
        aria-label="Notificaciones"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaBell className={styles.bellIcon} />
        {!loading && unreadCount > 0 && (
          <span className={`${styles.badge} ${styles[`badge_${variant}`]}`}>
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <NotificationDropdown onClose={closeDropdown} variant={variant} />
      )}
    </div>
  );
};

export default NotificationBell;
