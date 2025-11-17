import { motion } from "framer-motion";
import { FaCalendarAlt, FaRedo, FaStopwatch, FaCoins } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import formatPrice from "../../../../shared/utils/formatPrice";
import type { ActivityUI } from "../../../types/Activity.type";
import { getActivityIcon } from "../../../../shared/utils/activityIcons";
import { getActivityStatusConfig } from "../../../utils/activities.utils";
import { getSubjectColor } from "../../../../shared/constants/subject.constants";
import styles from "./ActivityRow.module.css";

interface ActivityRowProps {
  activity: ActivityUI;
  onStart?: (activityId: string) => void;
}

const ActivityRow: React.FC<ActivityRowProps> = ({ activity, onStart }) => {
  const statusConfig = getActivityStatusConfig(activity.status);
  const isDisabled =
    (activity.status === "CREATED" || activity.noAttempts) &&
    !(activity.status === "APPROVED");
  const subjectColor = getSubjectColor(activity.subjectName);
  const buttonText =
    activity.noAttempts && !(activity.status === "APPROVED")
      ? "Sin intentos"
      : statusConfig.buttonText;

  const handleActionButton = async () => {
    if (activity.status === "PUBLISHED" && !activity.noAttempts && onStart) {
      onStart(activity.id);
    }
  };

  const ActivityIcon = getActivityIcon(activity.name);

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
            <span className={styles.activityIcon}>
              <ActivityIcon />
            </span>
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
        {activity.status !== "APPROVED" && (
          <div className={styles.secondaryInfo}>
            <div className={styles.infoItem}>
              <FaCalendarAlt className={styles.metaIcon} />
              <span className={styles.infoText}>{activity.dateLabel}</span>
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
            <statusConfig.icon className={styles.statusIcon} />
            {statusConfig.label}
          </Badge>
        </div>

        <Button
          variant={activity.status === "EXPIRED" ? "ghost" : "primary"}
          className={styles.actionButton}
          disabled={isDisabled}
          onClick={handleActionButton}
        >
          <statusConfig.buttonIcon className={styles.buttonIcon} />
          {buttonText}
        </Button>
      </div>

      {/* Puntuación */}
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
