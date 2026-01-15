import { motion } from "framer-motion";
import { FaArrowLeft, FaUser, FaCalendar } from "react-icons/fa";
import { Badge, Card } from "@/shared";
import { reviewItemVariants } from "../../../constants/activity/noLudicaReview.constants";
import type { AttemptReviewStoredData } from "../../../types/NoLudicaReview.type";
import { formatAttemptDate } from "../../../utils/activity/noLudicaReview.utils";
import { getActivityColor, getActivityIcon } from "@/shared";
import styles from "./AttemptReviewHeader.module.css";

interface AttemptReviewHeaderProps {
  storedData: AttemptReviewStoredData | null;
  onBack: () => void;
}

const AttemptReviewHeader: React.FC<AttemptReviewHeaderProps> = ({
  storedData,
  onBack,
}) => {
  if (!storedData) return null;
  const ActivityIcon = getActivityIcon("No Ludica");
  const activityColor = getActivityColor("No Ludica");

  return (
    <motion.div
      variants={reviewItemVariants}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.topBar}>
        <motion.button
          className={styles.backButton}
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft />
          Volver
        </motion.button>
      </div>

      <Card className={styles.headerCard}>
        <div className={styles.infoHeader}>
          <div
            className={styles.iconContainer}
            style={{ backgroundColor: activityColor }}
          >
            <ActivityIcon className={styles.activityIcon} />
          </div>

          <div className={styles.infoContent}>
            <div className={styles.titleWithStatus}>
              <h1 className={styles.activityName}>{storedData.activityName}</h1>
            </div>

            <div className={styles.badges}>
              <Badge
                variant="custom"
                size="sm"
                customColor={{ bg: "rgba(255, 255, 255, 0.2)", text: "white" }}
              >
                <FaUser className={styles.badgeIcon} />
                {storedData.studentFullName}
              </Badge>
              <Badge
                variant="custom"
                size="sm"
                customColor={{ bg: "rgba(255, 255, 255, 0.2)", text: "white" }}
              >
                <FaCalendar className={styles.badgeIcon} />
                {formatAttemptDate(storedData.attemptDate)}
              </Badge>
            </div>
          </div>
        </div>

        <p className={styles.description}>{storedData.activityDescription}</p>
      </Card>
    </motion.div>
  );
};

export default AttemptReviewHeader;
