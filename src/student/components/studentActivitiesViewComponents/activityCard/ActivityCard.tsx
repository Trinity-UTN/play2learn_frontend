import { motion } from "framer-motion";
import {
  FaClock,
  // FaExclamationTriangle,
  FaStar,
  FaCalendarAlt,
  FaStopwatch,
  FaRedo,
} from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import type { ActivityNotApprovedResponseInterface } from "../../../types/Activity.type";
import styles from "./ActivityCard.module.css";
import { useActivityStudentUI } from "../../../hooks/useActivityStudentUI";

interface ActivityCardProps {
  activity: ActivityNotApprovedResponseInterface;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { getStatusConfig, getRandomIcon, getDaysUntilDue, getRandomColor } =
    useActivityStudentUI();
  const statusConfig = getStatusConfig(activity.status);
  const finishAttempts = activity.attempts === activity.remainingAttempts;

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
              backgroundColor: getRandomColor(),
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
              <div className={styles.metaItem}>
                <FaStopwatch className={styles.metaIcon} />
                <span>{activity.maxTime} min</span>
              </div>
            </div>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <FaRedo className={styles.metaIcon} />
                <span>
                  {activity.remainingAttempts} / {activity.attempts} intentos
                </span>
              </div>
              <div className={styles.metaItem}>
                <FaStar className={styles.metaIcon} />
                {activity.minReward ? (
                  <span>
                    {activity.minReward} - {activity.maxReward} pts
                  </span>
                ) : (
                  <span>{activity.maxReward} pts</span>
                )}
              </div>
            </div>
          </div>

          {/* {activity.status === "FINISHED"  && (
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

          {activity.status === "PUBLISHED" && (
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
            <Badge className={`${styles[activity.dificulty]}`}>
              {activity.dificulty}
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
