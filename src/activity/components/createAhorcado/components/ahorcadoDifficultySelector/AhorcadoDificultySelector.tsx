import { motion } from "framer-motion";
import styles from "./AhorcadoDificultySelector.module.css";
import { useCreateAhorcado } from "../../CreateAhorcadoContext";
import Card from "../../../../../shared/components/Card/CardComponent";
import { FaExclamationTriangle } from "react-icons/fa";

const AhorcadoDificultySelector = () => {
  const { itemVariants, difficultyLevels, handleInputChange, ahorcadoData } =
    useCreateAhorcado();
  return (
    <>
      <motion.div variants={itemVariants}>
        <Card className={styles.difficultyCard}>
          <div className={styles.cardHeader}>
            <FaExclamationTriangle className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Cantidad de Errores Permitidos</h2>
          </div>

          <div className={styles.difficultyGrid}>
            {difficultyLevels.map((level) => (
              <button
                key={level.errors}
                className={`${styles.difficultyButton} ${
                  ahorcadoData.errorsPermited === level.errors
                    ? styles.active
                    : ""
                }`}
                onClick={() =>
                  handleInputChange("errorsPermited", level.errors)
                }
                style={{ borderColor: level.color }}
              >
                <div
                  className={styles.difficultyColor}
                  style={{ backgroundColor: level.color }}
                />
                <div className={styles.difficultyInfo}>
                  <span className={styles.difficultyLabel}>{level.label}</span>
                  <span className={styles.difficultyErrors}>
                    {level.valor} errores permitidos
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className={styles.customDifficulty}>
            <label className={styles.label}>Errores Permitidos</label>
            <h3>{ahorcadoData.errorsPermited}</h3>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default AhorcadoDificultySelector;
