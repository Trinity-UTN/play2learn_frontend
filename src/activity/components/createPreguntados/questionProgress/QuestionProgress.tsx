import { motion, type Variants } from "framer-motion";
import Card from "../../../../shared/components/Card/CardComponent";
import { useCreatePreguntados } from "../../../hooks/useCreatePreguntados";
import styles from "./QuestionProgress.module.css";

interface QuestionProgressProps {
  itemVariants: Variants;
}

const QuestionProgress: React.FC<QuestionProgressProps> = ({
  itemVariants,
}) => {
  const {
    config,
    getCompletedQuestions,
    getIncompleteQuestions,
    getEmptyQuestions,
  } = useCreatePreguntados();

  return (
    <motion.div variants={itemVariants}>
      <Card className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span className={styles.progressText}>
            Preguntas completadas: {getCompletedQuestions()} de{" "}
            {config.totalQuestions}
            {getIncompleteQuestions() > 0 && (
              <span className={styles.incompleteText}>
                {" "}
                • {getIncompleteQuestions()} incompleta
                {getIncompleteQuestions() !== 1 ? "s" : ""}
              </span>
            )}
            {getEmptyQuestions() > 0 && (
              <span className={styles.emptyText}>
                {" "}
                • {getEmptyQuestions()} vacía
                {getEmptyQuestions() !== 1 ? "s" : ""}
              </span>
            )}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${
                  (getCompletedQuestions() / config.totalQuestions) * 100
                }%`,
              }}
            />
            <div
              className={styles.progressIncomplete}
              style={{
                width: `${
                  (getIncompleteQuestions() / config.totalQuestions) * 100
                }%`,
                left: `${
                  (getCompletedQuestions() / config.totalQuestions) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default QuestionProgress;
