import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaRedo,
  FaStopwatch,
  FaCoins,
  FaTimesCircle,
  FaPlay,
} from "react-icons/fa";
import {
  Button,
  Badge,
  formatPrice,
  getSubjectColor,
  getActivityColor,
  getActivityIcon,
} from "@/shared";
import type { ActivityUI } from "../../../types/Activity.type";
import { getActivityStatusConfig } from "../../../utils/activities.utils";
import styles from "./ActivityRow.module.css";

interface ActivityRowProps {
  activity: ActivityUI;
  onStart?: (
    activityId: string,
    remainingAttempts: number,
    completedAt?: string,
  ) => void;
  onViewResults?: (
    activityId: string,
    remainingAttempts: number,
    completedAt?: string,
  ) => void;
}

const ActivityRow: React.FC<ActivityRowProps> = ({
  activity,
  onStart,
  onViewResults,
}) => {
  const statusConfig = getActivityStatusConfig(activity.status);
  const isDisabled =
    activity.status === "EXPIRED" && activity.remainingAttempts > 0;
  const badgeText =
    activity.noAttempts &&
    !(activity.status === "APPROVED" || activity.status === "PENDING")
      ? "Desaprobada"
      : statusConfig.label;
  const BadgeIcon =
    activity.noAttempts &&
    !(activity.status === "APPROVED" || activity.status === "PENDING")
      ? FaTimesCircle
      : statusConfig.icon;
  const ButtonIcon =
    activity.noAttempts &&
    !(activity.status === "APPROVED" || activity.status === "PENDING")
      ? FaPlay
      : statusConfig.buttonIcon;
  const buttonText =
    activity.noAttempts &&
    !(activity.status === "APPROVED" || activity.status === "PENDING")
      ? "Ver Resultados"
      : statusConfig.buttonText;
  const subjectColor = getSubjectColor(activity.subjectName);

  const handleActionButton = async () => {
    if (
      (activity.completedAt ||
        (activity.noAttempts && !(activity.status === "APPROVED"))) &&
      onViewResults
    ) {
      onViewResults(
        activity.id,
        activity.remainingAttempts,
        activity.completedAt,
      );
    } else if (
      activity.status === "PUBLISHED" &&
      !activity.completedAt &&
      onStart
    ) {
      onStart(activity.id, activity.remainingAttempts, activity.completedAt);
    }
  };

  const handleViewLastAttempt = () => {
    if (onViewResults) {
      onViewResults(
        activity.id,
        activity.remainingAttempts,
        activity.completedAt,
      );
    }
  };

  const ActivityIcon = getActivityIcon(activity.name);
  const activityColor = getActivityColor(activity.name);

  const hasAttemptedActivity =
    activity.remainingAttempts < activity.attempts &&
    activity.remainingAttempts > 0 &&
    activity.status === "PUBLISHED";

  return (
    <motion.div
      className={styles.activityRow}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.mainContent}>
        <div className={styles.basicInfo}>
          <div className={styles.titleSection}>
            <div
              className={styles.activityIconWrapper}
              style={{ backgroundColor: activityColor }}
            >
              <ActivityIcon className={styles.activityIcon} />
            </div>
            <div className={styles.titleInfo}>
              <h3 className={styles.activityTitle}>{activity.name}</h3>
              <div className={styles.metadata}>
                <Badge variant="custom" size="sm" customColor={subjectColor}>
                  {activity.subjectName}
                </Badge>
                <Badge
                  className={`${styles[activity.difficulty]} ${
                    styles.infoTextDifficultyInfo
                  }`}
                >
                  {activity.difficulty}
                </Badge>
              </div>
              {activity.rewardLabel && (
                <div className={styles.reward}>
                  <FaCoins className={styles.rewardIcon} />
                  <span className={styles.rewardText}>
                    {activity.rewardLabel}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información secundaria */}
        {activity.status !== "APPROVED" && activity.status !== "PENDING" && (
          <div className={styles.secondaryInfo}>
            <div className={styles.infoItem}>
              <FaCalendarAlt className={styles.metaIcon} />
              <span className={styles.infoText}>{activity.dateLabel} </span>
            </div>

            <div className={styles.infoItem}>
              <FaStopwatch className={styles.metaIcon} />
              <span className={styles.infoText}>{activity.timeLabel}</span>
            </div>

            <div className={styles.infoItem}>
              <FaRedo className={styles.metaIcon} />
              <span className={styles.infoText}>{activity.attemptsLabel}</span>
            </div>
          </div>
        )}
      </div>

      {/* Botón de acción */}
      <div className={styles.actionSection}>
        <div className={styles.statusBadge}>
          <Badge>
            <BadgeIcon className={styles.statusIcon} />
            {badgeText}
          </Badge>
        </div>

        <div className={styles.buttonGroup}>
          {hasAttemptedActivity && (
            <Button
              variant="secondary"
              className={styles.secondaryButton}
              onClick={handleViewLastAttempt}
            >
              Ver último intento
            </Button>
          )}

          {activity.status !== "EXPIRED" && (
            <Button
              variant="primary"
              className={styles.actionButton}
              disabled={isDisabled}
              onClick={handleActionButton}
            >
              <ButtonIcon className={styles.buttonIcon} />
              {buttonText}
            </Button>
          )}
        </div>
      </div>

      {/* Puntuación */}
      {activity.status === "APPROVED" && activity.reward !== undefined && (
        <div className={styles.scoreSection}>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreValue}>
              {formatPrice(activity.reward)}
            </span>
            <span className={styles.scoreLabel}>monedas</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default ActivityRow;
