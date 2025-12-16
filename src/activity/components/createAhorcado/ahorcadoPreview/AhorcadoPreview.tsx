import { motion } from "framer-motion";
import { FaEye, FaBullseye, FaHeart } from "react-icons/fa";
import { AhorcadoGame, Tooltip } from "@/shared";
import { useCreateAhorcado } from "../../../hooks/useCreateAhorcado";
import styles from "./AhorcadoPreview.module.css";

const AhorcadoPreview: React.FC = () => {
  const { config } = useCreateAhorcado();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getMaxErrors = (): number => {
    return config.errorsPermited === "CINCO" ? 5 : 3;
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
                <Tooltip content="Puedes probar jugando una partida de ejemplo" />
              </span>
            </h4>
          </div>
          <p className={styles.description}>
            Así es como verán la actividad tus estudiantes.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <FaBullseye className={styles.statIcon} />
            <div>
              <span className={styles.statLabel}>Palabra</span>
              <span className={styles.statValue}>
                {config.word.length} letras
              </span>
            </div>
          </div>
          <div className={styles.stat}>
            <FaHeart className={styles.statIcon} />
            <div>
              <span className={styles.statLabel}>Errores permitidos</span>
              <span className={styles.statValue}>{getMaxErrors()}</span>
            </div>
          </div>
        </div>
      </div>

      <AhorcadoGame mode="preview" />
    </motion.div>
  );
};

export default AhorcadoPreview;
