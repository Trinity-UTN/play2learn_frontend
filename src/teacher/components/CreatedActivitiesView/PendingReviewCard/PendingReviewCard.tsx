import { motion } from "framer-motion";
import { FaUserGraduate, FaClock, FaBook, FaEye } from "react-icons/fa";

import styles from "./PendingReviewCard.module.css";
import type { PendingReviewActivity } from "../../../types/CreatedActivities";

interface PendingReviewCardProps {
  review: PendingReviewActivity;
  onReview: (reviewId: string) => void;
}

const PendingReviewCard = ({ review, onReview }: PendingReviewCardProps) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `Hace ${diffDays} día${diffDays > 1 ? "s" : ""}`;
    if (diffHours > 0)
      return `Hace ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
    return "Hace unos minutos";
  };

  return (
    <motion.div
      className={styles.card}
      whileHover={{ x: 4, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.2 }}
      onClick={() => onReview(review.id)}
    >
      <div className={styles.cardContent}>
        <div className={styles.mainInfo}>
          <h4 className={styles.activityName}>{review.activityName}</h4>
          <div className={styles.metadata}>
            <div className={styles.metaItem}>
              <FaUserGraduate className={styles.metaIcon} />
              <span>{review.studentName}</span>
            </div>
            <div className={styles.metaItem}>
              <FaBook className={styles.metaIcon} />
              <span>{review.courseName}</span>
            </div>
          </div>
        </div>

        <div className={styles.timeSection}>
          <FaClock className={styles.timeIcon} />
          <span className={styles.timeText}>
            {formatTimeAgo(review.submittedAt)}
          </span>
        </div>
      </div>

      <motion.div
        className={styles.reviewButton}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaEye />
      </motion.div>
    </motion.div>
  );
};

export default PendingReviewCard;
