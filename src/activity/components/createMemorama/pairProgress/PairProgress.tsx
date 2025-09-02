import { motion, type Variants } from "framer-motion";
import Card from "../../../../shared/components/Card/CardComponent";
import { useCreateMemorama } from "../../../hooks/useCreateMemorama";
import styles from "./PairProgress.module.css";

interface MemoramaPairProgressProps {
  itemVariants: Variants;
}

const PairProgress: React.FC<MemoramaPairProgressProps> = ({
  itemVariants,
}) => {
  const { config, getCompletedPairs, getIncompletePairs, getEmptyPairs } =
    useCreateMemorama();

  return (
    <motion.div variants={itemVariants}>
      <Card className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span className={styles.progressText}>
            Parejas completadas: {getCompletedPairs()} de {config.totalPairs}
            {getIncompletePairs() > 0 && (
              <span className={styles.incompleteText}>
                {" "}
                • {getIncompletePairs()} incompleta
                {getIncompletePairs() !== 1 ? "s" : ""}
              </span>
            )}
            {getEmptyPairs() > 0 && (
              <span className={styles.emptyText}>
                {" "}
                • {getEmptyPairs()} vacía
                {getEmptyPairs() !== 1 ? "s" : ""}
              </span>
            )}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${(getCompletedPairs() / config.totalPairs) * 100}%`,
              }}
            />
            <div
              className={styles.progressIncomplete}
              style={{
                width: `${(getIncompletePairs() / config.totalPairs) * 100}%`,
                left: `${(getCompletedPairs() / config.totalPairs) * 100}%`,
              }}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PairProgress;
