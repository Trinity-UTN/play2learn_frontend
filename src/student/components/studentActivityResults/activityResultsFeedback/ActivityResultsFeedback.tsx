import { motion } from "framer-motion";
import { FcComments } from "react-icons/fc";
import { Card } from "@/shared";
import styles from "./ActivityResultsFeedback.module.css";

interface ActivityResultsFeedbackProps {
  teacherComment?: string | null;
}

const ActivityResultsFeedback: React.FC<ActivityResultsFeedbackProps> = ({
  teacherComment,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.container}
    >
      <Card className={styles.feedbackCard}>
        <div className={styles.header}>
          <h3 className={styles.sectionTitle}>Comentarios del Docente</h3>
        </div>

        <div className={styles.feedbackContent}>
          <div className={styles.detailItem}>
            <div className={styles.detailContent}>
              <FcComments className={styles.detailIcon} />
              <div>
                <span className={styles.label}>Retroalimentación</span>
                <span
                  className={`${styles.value} ${
                    !teacherComment ? styles.teacherComments : ""
                  }`}
                >
                  {teacherComment ||
                    "El docente corrigió la actividad pero no realizó comentarios"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityResultsFeedback;
