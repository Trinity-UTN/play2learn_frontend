import { motion } from "framer-motion";
import { FaEye, FaPlay, FaRedo, FaTags } from "react-icons/fa";
import { FcFolder } from "react-icons/fc";
import { Button, Tooltip, DesafioClasificacionGame } from "@/shared";
import styles from "./ClasificacionPreview.module.css";
import { useDesafioClasificacionGame } from "../../../../shared/hooks/games/useDesafioClasificacionGame";

const ClasificacionPreview: React.FC = () => {
  const { totalCategories, totalConcepts, resetGame, gameStarted, startGame } =
    useDesafioClasificacionGame();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
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
                <Tooltip content="Los conceptos se mostrarán mezclados para clasificarlos" />
              </span>
            </h4>
          </div>
          <p className={styles.description}>
            Así verán la actividad tus estudiantes
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <FcFolder className={styles.statIcon} />
            <div>
              <span className={styles.statLabel}>Categorías</span>
              <span className={styles.statValue}>{totalCategories}</span>
            </div>
          </div>
          <div className={styles.stat}>
            <FaTags className={styles.statIcon} style={{ color: "#dc2626" }} />
            <div>
              <span className={styles.statLabel}>Conceptos totales</span>
              <span className={styles.statValue}>{totalConcepts}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.simulatorContainer}>
        <div className={styles.simulatorHeader}>
          <div className={styles.simulatorTitle}>
            <FaEye className={styles.simulatorIcon} />
            <h4>Desafío de Clasificación</h4>
          </div>
          <Button
            variant="secondary"
            onClick={resetGame}
            className={styles.resetButton}
          >
            <FaRedo />
            Reiniciar
          </Button>
        </div>

        {!gameStarted ? (
          <Button
            variant="primary"
            onClick={startGame}
            className={styles.tryAgainButton}
          >
            <FaPlay />
            Comenzar Actividad
          </Button>
        ) : (
          <DesafioClasificacionGame mode="preview" />
        )}
      </div>
    </motion.div>
  );
};

export default ClasificacionPreview;
