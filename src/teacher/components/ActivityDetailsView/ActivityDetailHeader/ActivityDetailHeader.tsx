import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaStopCircle,
  FaCalendarAlt,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import styles from "./ActivityDetailHeader.module.css";
import type { ActivityDetail } from "../../../types/CreatedActivities";

interface ActivityDetailHeaderProps {
  activity: ActivityDetail;
  onBack?: () => void;
  onFinish: () => void;
}

const ActivityDetailHeader = ({
  activity,
  onBack,
  onFinish,
}: ActivityDetailHeaderProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return { label: "Publicada", color: "#10b981" };
      case "PENDING_PUBLICATION":
        return { label: "Pendiente", color: "#f59e0b" };
      case "EXPIRED":
        return { label: "Vencida", color: "#6b7280" };
      default:
        return { label: "Desconocido", color: "#6b7280" };
    }
  };

  const statusConfig = getStatusConfig(activity.status);

  return (
    <motion.div
      className={styles.header}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.headerTop}>
        {onBack && (
          <motion.button
            className={styles.backButton}
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft />
            Volver
          </motion.button>
        )}

        {activity.status === "PUBLISHED" && (
          <motion.button
            className={styles.finishButton}
            onClick={onFinish}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaStopCircle />
            Finalizar Actividad
          </motion.button>
        )}
      </div>

      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{activity.name}</h1>
          <p className={styles.description}>{activity.description}</p>
        </div>

        <div
          className={styles.statusBadge}
          style={{ backgroundColor: statusConfig.color }}
        >
          {statusConfig.label}
        </div>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.infoItem}>
          <FaCalendarAlt className={styles.infoIcon} />
          <span>
            {new Date(activity.startDate).toLocaleDateString("es-ES")} -{" "}
            {new Date(activity.endDate).toLocaleDateString("es-ES")}
          </span>
        </div>
        <div className={styles.infoItem}>
          <FaBook className={styles.infoIcon} />
          <span>{activity.subjectName}</span>
        </div>
        <div className={styles.infoItem}>
          <FaUsers className={styles.infoIcon} />
          <span>{activity.courseName}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityDetailHeader;
