import { motion } from "framer-motion";
import { FaEye, FaQuestionCircle, FaClock } from "react-icons/fa";
import { PreguntadosGame, Tooltip } from "@/shared";
import { useCreatePreguntados } from "../../../hooks/useCreatePreguntados";
import styles from "./PreguntadosPreview.module.css";

const PreguntadosPreview: React.FC = () => {
  const { questions, config } = useCreatePreguntados();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
                <Tooltip content="Puedes probar respondiendo las preguntas." />
              </span>
            </h4>
          </div>
          <p className={styles.description}>
            Así es como verán la actividad tus estudiantes.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <FaQuestionCircle className={styles.statIconQuestion} />
            <div>
              <span className={styles.statLabel}>Preguntas</span>
              <span className={styles.statValue}>{questions.length}</span>
            </div>
          </div>
          <div className={styles.stat}>
            <FaClock className={styles.statIconClock} />
            <div>
              <span className={styles.statLabel}>
                Tiempo por pregunta (seg)
              </span>
              <span className={styles.statValue}>
                {config.maxTimePerQuestionInSeconds}
              </span>
            </div>
          </div>
        </div>
      </div>

      <PreguntadosGame mode="preview" />
    </motion.div>
  );
};

export default PreguntadosPreview;
