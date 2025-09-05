import { motion } from "framer-motion";
import styles from "./ActivityRow.module.css";
import type { ActivityUI } from "../../../types/Activity.type";
import { useActivityStudentUI } from "../../../hooks/useActivityStudentUI";
import { FaCalendarAlt, FaRedo, FaStopwatch, FaCoins } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import formatPrice from "../../../../shared/utils/formatPrice";

interface ActivityRowProps {
  activity: ActivityUI;
  onStart?: (activityId: string) => void;
  onContinue?: (activityId: string) => void;
  onViewResults?: (activityId: string) => void;
}

const ActivityRow: React.FC<ActivityRowProps> = ({ activity }) => {
  const { getRandomColor, getRandomIcon, getStatusConfig } =
    useActivityStudentUI();

  const statusConfig = getStatusConfig(activity.status);
  const isDisabled =
    (activity.status === "CREATED" || activity.noAttempts) &&
    !(activity.status === "APPROVED");

  const buttonText =
    activity.noAttempts && !(activity.status === "APPROVED")
      ? "Sin intentos"
      : statusConfig.buttonText;

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
        <div className={styles.secondaryInfo}>
          <div className={styles.infoItem}>
            <FaCalendarAlt className={styles.metaIcon} />
            <span className={styles.infoText}>{activity.dateLabel}</span>
          </div>

          {/* Tiempo máximo */}
          <div className={styles.infoItem}>
            <FaStopwatch className={styles.metaIcon} />
            <span className={styles.infoText}>{activity.timeLabel}</span>
          </div>

          {/* Intentos */}
          <div className={styles.infoItem}>
            <FaRedo className={styles.metaIcon} />
            <span className={styles.infoText}>{activity.attemptsLabel}</span>
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
          disabled={isDisabled}
        >
          <statusConfig.buttonIcon className={styles.buttonIcon} />
          {buttonText}
        </Button>
      </div>
      {/* Puntuación (si está completada) */}
      {activity.status === "APPROVED" && activity.reward !== undefined && (
        <div className={styles.scoreSection}>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreValue}>
              {formatPrice(activity.reward)}
            </span>
            <span className={styles.scoreLabel}>pts</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ActivityRow;
