import { motion } from "framer-motion";
import { FaCalendarAlt, FaStopwatch, FaRedo, FaCoins } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import type { ActivityUI } from "../../../types/Activity.type";
import { useActivityStudentUI } from "../../../hooks/useActivityStudentUI";
import styles from "./ActivityCard.module.css";

interface ActivityCardProps {
  activity: ActivityUI;
  onStart?: (activityId: string) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onStart }) => {
  const { getStatusConfig, getRandomIcon } = useActivityStudentUI();

  const statusConfig = getStatusConfig(activity.status);
  const isDisabled =
    (activity.status === "CREATED" || activity.noAttempts) &&
    !(activity.status === "APPROVED");
  const buttonText =
    activity.noAttempts && !(activity.status === "APPROVED")
      ? "Sin intentos"
      : statusConfig.buttonText;

  const handleActionButton = async () => {
    if (activity.status === "PUBLISHED" && !activity.noAttempts && onStart) {
      onStart(activity.id);
    }
  };

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
              // backgroundColor: getRandomColor(),
              color: "white",
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
              {getRandomIcon()}
            </motion.span>
          </div>

          <div className={styles.statusBadge}>
            <Badge>
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
              {activity.status != "APPROVED" && (
                <div className={styles.metaItem}>
                  <FaStopwatch className={styles.metaIcon} />
                  <span>{activity.timeLabel} </span>
                </div>
              )}
            </div>

            {activity.status != "APPROVED" && (
              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <FaRedo className={styles.metaIcon} />
                  <span>{activity.attemptsLabel}</span>
                </div>
                <div className={styles.metaItem}>
                  <FaCoins className={styles.metaIcon} />
                  {activity.rewardLabel}
                </div>
              </div>
            )}
          </div>

          {/* {activity.status === "EXPIRED"  && (
            <div className={styles.scoreSection}>
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
          )} */}

          {/* {activity.status === "PUBLISHED" && (
            <div className={styles.dueDateSection}>
              <FaClock className={styles.dueDateIcon} />
              <span className={styles.dueDateText}>
                Vence {getDaysUntilDue(activity.endDate)}
              </span>
            </div>
          )} */}
        </div>

        {/* Footer */}
        <div className={styles.cardFooter}>
          <div className={styles.difficultyBadge}>
            <Badge className={`${styles[activity.difficulty]}`}>
              {activity.difficulty}
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

        {/* Glow effect */}
        <motion.div
          className={styles.glowEffect}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

export default ActivityCard;
