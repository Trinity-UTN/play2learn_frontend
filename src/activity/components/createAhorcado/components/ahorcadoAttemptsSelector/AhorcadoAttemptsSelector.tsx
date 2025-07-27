import { motion } from "framer-motion";
import Card from "../../../../../shared/components/Card/CardComponent";
import { FaClock, FaHashtag } from "react-icons/fa";
import { useCreateAhorcado } from "../../CreateAhorcadoContext";
import styles from "./AhorcadoAttemptsSelector.module.css";
import Input from "../../../../../shared/components/Input/InputComponent";

const AhorcadoAttemptsSelector = () => {
  const { itemVariants, ahorcadoData, handleInputChange, errors } =
    useCreateAhorcado();
  return (
    <>
      <motion.div variants={itemVariants}>
        <Card className={styles.attemptsCard}>
          <div className={styles.cardHeader}>
            <FaClock className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Configuración de Intentos</h2>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Número de Intentos por Estudiante
              <span className={styles.required}>*</span>
            </label>
            <Input
              type="number"
              min="1"
              max="5"
              value={ahorcadoData.attempts}
              onChange={(e) =>
                handleInputChange("attempts", parseInt(e.target.value) || 1)
              }
              error={errors.attempts}
              className={styles.numberInput}
            />
            <div className={styles.inputHelper}>
              <span className={styles.attemptsInfo}>
                Los estudiantes podrán jugar {ahorcadoData.attempts}{" "}
                {ahorcadoData.attempts === 1 ? "vez" : "veces"}
              </span>
            </div>
          </div>

          <div className={styles.attemptsButtons}>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`${styles.attemptButton} ${
                  ahorcadoData.attempts === num ? styles.active : ""
                }`}
                onClick={() => handleInputChange("attempts", num)}
              >
                <FaHashtag className={styles.attemptIcon} />
                {num} {num === 1 ? "intento" : "intentos"}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default AhorcadoAttemptsSelector;
