import { motion } from "framer-motion";
import { FaEye, FaEdit, FaBullseye } from "react-icons/fa";
import CompletarOracionGame from "../../../../shared/components/Games/CompletarOracion/CompletarOracionGame";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import type { Sentence } from "../../../types/CompletarOracion.type";
import styles from "./CompletarOracionPreview.module.css";

interface CompletarOracionPreviewProps {
  sentences: Sentence[];
}

const CompletarOracionPreview: React.FC<CompletarOracionPreviewProps> = ({
  sentences,
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getTotalMissingWords = () => {
    return sentences.reduce((total, sentence) => {
      return total + sentence.words.filter((w) => w.isMissing).length;
    }, 0);
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h4 className={styles.title}>
              <FaEye className={styles.headerIcon} />
              Vista Previa de Actividad
              <span className={styles.tooltip}>
                <Tooltip content="Puedes probar completando los espacios en blanco." />
              </span>
            </h4>
          </div>
          <p className={styles.description}>
            Esta es una simulación de cómo los estudiantes experimentarán la
            actividad
          </p>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <FaEdit className={styles.statIcon} />
            <div>
              <span className={styles.statLabel}>
                Oración{sentences.length !== 1 ? "es" : ""}
              </span>
              <span className={styles.statValue}>{sentences.length}</span>
            </div>
          </div>
          <div className={styles.stat}>
            <FaBullseye className={styles.statIcon} />
            <div>
              <span className={styles.statLabel}>
                Palabra{getTotalMissingWords() !== 1 ? "s" : ""} a completar
              </span>
              <span className={styles.statValue}>{getTotalMissingWords()}</span>
            </div>
          </div>
        </div>
      </div>

      <CompletarOracionGame mode="preview" />
    </motion.div>
  );
};

export default CompletarOracionPreview;
