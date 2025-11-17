import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUsers,
  FaChartBar,
  FaRedo,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";

import styles from "./ActivityCard.module.css";
import type { TeacherActivity } from "../../../types/CreatedActivities";

interface ActivityCardProps {
  activity: TeacherActivity;
  onRepublish: (activityId: string) => void;
  onViewDetails: (activityId: string) => void;
}

const ActivityCard = ({
  activity,
  onRepublish,
  onViewDetails,
}: ActivityCardProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return {
          icon: FaCheckCircle,
          label: "Publicada",
          color: "#10b981",
          bgColor: "#d1fae5",
        };
      case "PENDING_PUBLICATION":
        return {
          icon: FaClock,
          label: "Pendiente",
          color: "#f59e0b",
          bgColor: "#fef3c7",
        };
      case "EXPIRED":
        return {
          icon: FaExclamationCircle,
          label: "Vencida",
          color: "#6b7280",
          bgColor: "#f3f4f6",
        };
      default:
        return {
          icon: FaClock,
          label: "Desconocido",
          color: "#6b7280",
          bgColor: "#f3f4f6",
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const completionPercentage =
    activity.totalStudents > 0
      ? Math.round((activity.completedStudents / activity.totalStudents) * 100)
      : 0;

  const statusConfig = getStatusConfig(activity.status);

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.titleSection}>
          <h3 className={styles.activityName}>{activity.name}</h3>
          <p className={styles.activityDescription}>{activity.description}</p>
        </div>
        <div
          className={styles.statusBadge}
          style={{
            backgroundColor: statusConfig.bgColor,
            color: statusConfig.color,
          }}
        >
          <statusConfig.icon className={styles.statusIcon} />
          {statusConfig.label}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <FaCalendarAlt className={styles.infoIcon} />
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Período</span>
              <span className={styles.infoValue}>
                {formatDate(activity.startDate)} -{" "}
                {formatDate(activity.endDate)}
              </span>
            </div>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Materia</span>
            <span className={styles.infoValue}>{activity.subjectName}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Curso</span>
            <span className={styles.infoValue}>{activity.courseName}</span>
          </div>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.stat}>
            <FaUsers className={styles.statIcon} />
            <div className={styles.statContent}>
              <span className={styles.statLabel}>Estudiantes</span>
              <span className={styles.statValue}>
                {activity.completedStudents}/{activity.totalStudents}
              </span>
            </div>
          </div>

          <div className={styles.stat}>
            <FaChartBar className={styles.statIcon} />
            <div className={styles.statContent}>
              <span className={styles.statLabel}>Promedio</span>
              <span className={styles.statValue}>{activity.averageScore}%</span>
            </div>
          </div>

          <div className={styles.stat}>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>Completado</span>
              <span className={styles.statValue}>{completionPercentage}%</span>
            </div>
          </div>
        </div>

        {activity.totalStudents > 0 && (
          <div className={styles.progressSection}>
            <div className={styles.progressBar}>
              <motion.div
                className={styles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        {activity.status === "EXPIRED" && (
          <motion.button
            className={styles.republishButton}
            onClick={() => onRepublish(activity.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRedo />
            Re-exponer
          </motion.button>
        )}
        <motion.button
          className={styles.viewButton}
          onClick={() => onViewDetails(activity.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaEye />
          Ver Detalles
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
