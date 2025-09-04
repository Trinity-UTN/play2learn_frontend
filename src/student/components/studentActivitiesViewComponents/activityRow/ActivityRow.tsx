import { motion } from "framer-motion";
import styles from "./ActivityRow.module.css";
import type { ActivityNotApprovedResponseInterface } from "../../../types/Activity.type";
import { useActivityStudentUI } from "../../../hooks/useActivityStudentUI";
import { FaCalendarAlt, FaRedo, FaStopwatch } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Badge from "../../../../shared/components/Badge/BadgeComponent";

interface ActivityRowProps {
  activity: ActivityNotApprovedResponseInterface;
  onStart?: (activityId: string) => void;
  onContinue?: (activityId: string) => void;
  onViewResults?: (activityId: string) => void;
}

const ActivityRow: React.FC<ActivityRowProps> = ({
  activity,
  onStart,
  onContinue,
  onViewResults,
}) => {
  const { getRandomColor, getRandomIcon, getStatusConfig } =
    useActivityStudentUI();

  const getStatusInfo = () => {
    const now = new Date();
    const endDate = new Date(activity.endDate);

    if (activity.status) {
      return {
        status: "FINISHED",
        label: "Completada",
        color: "#10b981",
        icon: "✅",
      };
    }

    if (now > endDate) {
      return {
        status: "expired",
        label: "Vencida",
        color: "#ef4444",
        icon: "⏰",
      };
    }

    if (activity.status) {
      return {
        status: "PUBLISHED",
        label: "Disponible",
        color: "#8b5cf6",
        icon: "⭐",
      };
    }

    return {
      status: "CREATED",
      label: "Próximamente",
      color: "#6b7280",
      icon: "⏳",
    };
  };

  const getDifficultyInfo = () => {
    switch (activity.dificulty) {
      case "FACIL":
        return { color: "#10b981" };
      case "MEDIO":
        return { color: "#f59e0b" };

      case "DIFICIL":
        return { color: "#ef4444" };
      default:
        return { color: "#6b7280" };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const statusInfo = getStatusInfo();
  const difficultyInfo = getDifficultyInfo();
  const finishAttempts = activity.attempts === activity.remainingAttempts;
  const statusConfig = getStatusConfig(activity.status);
  const handleAction = () => {
    switch (statusInfo.status) {
      case "available":
        onStart?.(activity.id);
        break;
      case "in-progress":
        onContinue?.(activity.id);
        break;
      case "completed":
        onViewResults?.(activity.id);
        break;
      case "expired":
        onStart?.(activity.id); // Reintentar
        break;
    }
  };

  const getActionText = () => {
    switch (statusInfo.status) {
      case "available":
        return "Comenzar";
      case "in-progress":
        return "Continuar";
      case "completed":
        return "Ver Resultados";
      case "expired":
        return "Reintentar";
      default:
        return "Próximamente";
    }
  };

  return (
    <motion.div
      className={`${styles.activityRow} ${styles[statusInfo.status]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.mainContent}>
        <div className={styles.basicInfo}>
          <div className={styles.titleSection}>
            <span className={styles.activityIcon}> {getRandomIcon()}</span>

            <div className={styles.titleInfo}>
              <h3 className={styles.activityTitle}>{activity.name}</h3>
              <h3 className={styles.activitySubtitle}>
                {activity.description}
              </h3>
              <div className={styles.metadata}>
                <span
                  className={styles.subject}
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {activity.subjectName}
                </span>
                <span
                  className={styles.infoTextDifficultyInfo}
                  style={{ backgroundColor: difficultyInfo.color }}
                >
                  {activity.dificulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Información secundaria */}
        <div className={styles.secondaryInfo}>
          <div className={styles.infoItem}>
            <FaCalendarAlt className={styles.metaIcon} />
            <span className={styles.infoText}>
              {formatDate(activity.startDate)} - {formatDate(activity.endDate)}
            </span>
          </div>

          {/* Tiempo máximo */}
          <div className={styles.infoItem}>
            <FaStopwatch className={styles.metaIcon} />
            <span className={styles.infoText}>
              {formatTime(activity.maxTime)}
            </span>
          </div>

          {/* Intentos */}
          <div className={styles.infoItem}>
            <FaRedo className={styles.metaIcon} />
            <span className={styles.infoText}>
              {activity.remainingAttempts} / {activity.attempts} intentos
            </span>
          </div>
        </div>
      </div>

      {/* Botón de acción */}
      <div className={styles.actionSection}>
        {/* Estado */}
        <div className={styles.statusBadge}>
          <Badge>
            <statusConfig.icon className={styles.statusIcon} />
            {statusConfig.label}
          </Badge>
        </div>

        <Button
          variant={activity.status === "FINISHED" ? "ghost" : "primary"}
          className={styles.actionButton}
          disabled={activity.status === "CREATED" || finishAttempts}
        >
          <statusConfig.buttonIcon className={styles.buttonIcon} />
          {finishAttempts ? "Sin intentos" : statusConfig.buttonText}
        </Button>

        {/* Puntuación (si está completada) */}
        {/* CAMBIAR PARA EL MANEJO DE LA ACTIVIDAD TERMINADA */}
      </div>
      {activity.status === "FINISHED" && activity.maxReward !== undefined && (
        <div className={styles.scoreSection}>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreValue}>
              {activity.maxReward ? 0 : activity.maxReward}
            </span>
            <span className={styles.scoreLabel}>pts</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ActivityRow;
