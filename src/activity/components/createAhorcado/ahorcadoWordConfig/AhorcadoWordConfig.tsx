import { motion } from "framer-motion";
import Card from "../../../../shared/components/Card/CardComponent";
import Input from "../../../../shared/components/Input/InputComponent";
import { FaLightbulb, FaKeyboard } from "react-icons/fa";
import { useCreateAhorcado } from "../../../hooks/useCreateAhorcado";
import styles from "./AhorcadoWordConfig.module.css";

const AhorcadoWordConfig = () => {
  const {
    itemVariants,
    ahorcadoData,
    handleInputChange,
    errors,
    wordSuggestions,
  } = useCreateAhorcado();

  return (
    <>
      <motion.div variants={itemVariants}>
        <Card className={styles.configCard}>
          <div className={styles.cardHeader}>
            <FaKeyboard className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Configuración de la Palabra</h2>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Palabra a Adivinar
              <span className={styles.required}>*</span>
            </label>
            <Input
              type="text"
              value={ahorcadoData.word}
              onChange={(e) =>
                handleInputChange("word", e.target.value.toUpperCase())
              }
              placeholder="Ingresa la palabra (ej: MATEMATICAS)"
              error={errors.word}
              className={styles.wordInput}
            />
            <div className={styles.inputHelper}>
              <span className={styles.charCount}>
                {ahorcadoData.word.length}/15 caracteres
              </span>
              {ahorcadoData.word && (
                <span className={styles.wordLength}>
                  Longitud: {ahorcadoData.word.length} letras
                </span>
              )}
            </div>
          </div>

          <div className={styles.suggestions}>
            <label className={styles.suggestionsLabel}>
              <FaLightbulb className={styles.suggestionIcon} />
              Sugerencias de palabras:
            </label>
            <div className={styles.suggestionsList}>
              {wordSuggestions.map((word) => (
                <button
                  key={word}
                  className={styles.suggestionButton}
                  onClick={() => handleInputChange("word", word)}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default AhorcadoWordConfig;
