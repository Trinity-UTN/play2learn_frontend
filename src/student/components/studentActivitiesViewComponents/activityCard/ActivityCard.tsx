import { motion } from "framer-motion";
import {
  FaPlay,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
  FaStar,
  FaCalendarAlt,
  FaStopwatch,
  FaRedo,
  FaTrophy,
} from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import type { ConfigurationActivity } from "../../../types/Activity.type";
import styles from "./ActivityCard.module.css";

interface ActivityCardProps {
  activity: ConfigurationActivity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          icon: FaCheck,
          color: "#10B981",
          bgColor: "#D1FAE5",
          label: "Completada",
          buttonText: "Ver Resultados",
          buttonIcon: FaTrophy,
        };
      case "pending":
        return {
          icon: FaClock,
          color: "#F59E0B",
          bgColor: "#FEF3C7",
          label: "Pendiente",
          buttonText: "Continuar",
          buttonIcon: FaPlay,
        };
      case "overdue":
        return {
          icon: FaExclamationTriangle,
          color: "#EF4444",
          bgColor: "#FEE2E2",
          label: "Vencida",
          buttonText: "Reintentar",
          buttonIcon: FaRedo,
        };
      case "available":
        return {
          icon: FaStar,
          color: "#8B5CF6",
          bgColor: "#EDE9FE",
          label: "Disponible",
          buttonText: "Comenzar",
          buttonIcon: FaPlay,
        };
      default:
        return {
          icon: FaClock,
          color: "#6B7280",
          bgColor: "#F3F4F6",
          label: "Desconocido",
          buttonText: "Ver",
          buttonIcon: FaPlay,
        };
    }
  };

  // const getDifficultyColor = (difficulty: string) => {
  //   switch (difficulty) {
  //     case "Fácil":
  //       return "#10B981";
  //     case "Medio":
  //       return "#F59E0B";
  //     case "Difícil":
  //       return "#EF4444";
  //     default:
  //       return "#6B7280";
  //   }
  // };

  const getDaysUntilDue = (endDate: string) => {
    const due = new Date(endDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Vencida";
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    return `${diffDays} días`;
  };

  const statusConfig = getStatusConfig(activity.status);
  // const difficultyColor = getDifficultyColor(activity.difficulty);

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
      className={styles.cardWrapper}
    >
      <Card className={`${styles.activityCard} ${styles[activity.status]}`}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <div
            className={styles.activityIcon}
            style={{
              backgroundColor: `${activity.color}20`,
              color: activity.color,
            }}
          >
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {activity.icon}
            </motion.span>
          </div>

          <div className={styles.statusBadge}>
            <Badge
            // className={{
            //   backgroundColor: statusConfig.bgColor,
            //   color: statusConfig.color,
            // }}
            >
              <statusConfig.icon className={styles.statusIcon} />
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className={styles.cardContent}>
          <h3 className={styles.activityName}>{activity.name}</h3>
          <p className={styles.activityDescription}>{activity.description}</p>

          <div className={styles.activityMeta}>
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <FaCalendarAlt className={styles.metaIcon} />
                <span>{activity.subjectName}</span>
              </div>
              <div className={styles.metaItem}>
                <FaStopwatch className={styles.metaIcon} />
                <span>{activity.maxTime} min</span>
              </div>
            </div>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <FaRedo className={styles.metaIcon} />
                <span>{activity.attempts} intentos</span>
              </div>
              <div className={styles.metaItem}>
                <FaStar className={styles.metaIcon} />
                <span>{activity.points} pts</span>
              </div>
            </div>
          </div>

          {/* Progress Bar for completed/pending activities */}
          {activity.progress !== undefined && activity.progress > 0 && (
            <div className={styles.progressSection}>
              <div className={styles.progressLabel}>
                <span>Progreso</span>
                <span>{activity.progress}%</span>
              </div>
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  style={{ backgroundColor: activity.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${activity.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Score for completed activities */}
          {activity.status === "completed" && activity.score && (
            <div className={styles.scoreSection}>
              <div className={styles.scoreCircle}>
                <motion.div
                  className={styles.scoreValue}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                >
                  {activity.score}%
                </motion.div>
              </div>
              <div className={styles.scoreInfo}>
                <span className={styles.pointsEarned}>
                  +{activity.points} puntos
                </span>
                <span className={styles.completedDate}>
                  {activity.completedDate &&
                    new Date(activity.completedDate).toLocaleDateString(
                      "es-ES"
                    )}
                </span>
              </div>
            </div>
          )}

          {/* Due date for pending activities */}
          {(activity.status === "pending" ||
            activity.status === "available") && (
            <div className={styles.dueDateSection}>
              <FaClock className={styles.dueDateIcon} />
              <span className={styles.dueDateText}>
                Vence {getDaysUntilDue(activity.endDate)}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.cardFooter}>
          <div className={styles.difficultyBadge}>
            <Badge
            // style={{
            //   backgroundColor: `${difficultyColor}20`,
            //   color: difficultyColor,
            // }}
            >
              {activity.difficulty}
            </Badge>
          </div>

          <Button
            variant={activity.status === "completed" ? "ghost" : "primary"}
            className={styles.actionButton}
          >
            <statusConfig.buttonIcon className={styles.buttonIcon} />
            {statusConfig.buttonText}
          </Button>
        </div>

        {/* Glow effect */}
        <motion.div
          className={styles.glowEffect}
          style={{ backgroundColor: activity.color }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

export default ActivityCard;
