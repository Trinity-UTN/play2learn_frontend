import { motion } from "framer-motion";
import { FaArrowLeft, FaUser, FaCalendar } from "react-icons/fa";
import { Badge, Button, Card } from "@/shared";
import { reviewItemVariants } from "../../../constants/activity/noLudicaReview.constants";
import type { AttemptReviewStoredData } from "../../../types/NoLudicaReview.type";
import { formatAttemptDate } from "../../../utils/activity/noLudicaReview.utils";
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

  return (
    <motion.div variants={reviewItemVariants}>
      <Card className={styles.headerCard}>
        <div className={styles.headerTop}>
          <Button
            variant="ghost"
            onClick={onBack}
            className={styles.backButton}
          >
            <FaArrowLeft />
            <span>Volver</span>
          </Button>
          <Badge
            variant="custom"
            customColor={{ bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b" }}
          >
            Pendiente de corrección
          </Badge>
        </div>

        <div className={styles.headerContent}>
          <h1 className={styles.title}>{storedData.activityName}</h1>
          <p className={styles.description}>{storedData.activityDescription}</p>

          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <FaUser className={styles.metaIcon} />
              <span className={styles.metaLabel}>Estudiante:</span>
              <span className={styles.metaValue}>
                {storedData.studentFullName}
              </span>
            </div>

            <div className={styles.metaItem}>
              <FaCalendar className={styles.metaIcon} />
              <span className={styles.metaLabel}>Fecha del intento:</span>
              <span className={styles.metaValue}>
                {formatAttemptDate(storedData.attemptDate)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AttemptReviewHeader;
