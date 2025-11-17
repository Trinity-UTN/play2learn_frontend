import { motion } from "framer-motion";
import { FaClipboardCheck } from "react-icons/fa";

import PendingReviewCard from "../PendingReviewCard/PendingReviewCard";
import styles from "./PendingReviewSection.module.css";
import type { PendingReviewActivity } from "../../../types/CreatedActivities";

interface PendingReviewSectionProps {
  pendingReviews: PendingReviewActivity[];
  onReview: (reviewId: string) => void;
}

const PendingReviewSection = ({
  pendingReviews,
  onReview,
}: PendingReviewSectionProps) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div variants={itemVariants} className={styles.section}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <FaClipboardCheck className={styles.icon} />
        </div>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Pendientes de Revisión</h2>
          <span className={styles.count}>
            {pendingReviews.length} actividades
          </span>
        </div>
      </div>

      <div className={styles.reviewsList}>
        {pendingReviews.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>
              No hay actividades pendientes de revisión
            </p>
          </div>
        ) : (
          pendingReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PendingReviewCard review={review} onReview={onReview} />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default PendingReviewSection;
