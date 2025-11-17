import { motion } from "framer-motion";
import { FaEye, FaPlay, FaRedo, FaTags } from "react-icons/fa";
import { FcFolder } from "react-icons/fc";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import { useCreateDesafioClasificacion } from "../../../hooks/useCreateDesafioClasificacion";
import styles from "./ClasificacionPreview.module.css";
import DesafioClasificacionGame from "../../../../shared/components/Games/DesafioClasificacion/DesafioClasificacionGame";
import { useDesafioClasificacionGame } from "../../../../shared/hooks/games/useDesafioClasificacionGame";

const ClasificacionPreview: React.FC = () => {
  const { config } = useCreateDesafioClasificacion();
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
          <div className={styles.scenarioCard}>
            <div className={styles.scenarioHeader}>
              <h5 className={styles.scenarioTitle}>Clasificar Conceptos</h5>
            </div>
            <div className={styles.scenarioContent}>
              <p className={styles.scenarioText}>
                Arrastra cada concepto a la categoría correcta. ¡Demuestra tu
                conocimiento!
              </p>

              <div className={styles.pathSection}>
                <h6 className={styles.pathTitle}>Categorías disponibles:</h6>
                <div className={styles.pathList}>
                  {config.categories.map((category, index) => (
                    <div key={category.id} className={styles.pathItem}>
                      <div className={styles.pathNumber}>{index + 1}</div>
                      <span className={styles.pathText}>
                        {category.name} ({category.concepts.length} conceptos)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.completedActions}>
                <Button
                  variant="primary"
                  onClick={startGame}
                  className={styles.tryAgainButton}
                >
                  <FaPlay />
                  Comenzar Actividad
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <DesafioClasificacionGame mode="preview" />
        )}
      </div>
    </motion.div>
  );
};

export default ClasificacionPreview;
