import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGamepad,
  FaCog,
  FaLightbulb,
  FaInfoCircle,
  FaChartBar,
} from "react-icons/fa";
import { Tooltip } from "@/shared";
import type { AhorcadoConfig } from "../../../types/Ahorcado.type";
import { useCreateAhorcado } from "../../../hooks/useCreateAhorcado";
import ActivityFormError from "../../common/ActivityFormError/ActivityFormError";
import styles from "./GeneralConfiguration.module.css";

const GeneralConfiguration: React.FC = () => {
  const {
    config,
    wordSuggestions,
    handleConfigSubmit,
    validateConfig,
    getDifficultyOptions,
  } = useCreateAhorcado();

  const [formData, setFormData] = useState<AhorcadoConfig>(config);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const difficultyOptions = getDifficultyOptions();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "CINCO":
        return "#10b981";
      case "TRES":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const handleInputChange = (field: keyof AhorcadoConfig, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpiar error del campo
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const validationErrors = validateConfig(formData);
    const fieldErrors: { [key: string]: string } = {};

    validationErrors.forEach((error) => {
      if (error.includes("palabra")) {
        fieldErrors.word = error;
      } else if (error.includes("dificultad")) {
        fieldErrors.errorsPermited = error;
      }
    });

    setFormErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleDismissError = (key: string) => {
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleConfigSubmit(formData);
    }
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <FaCog className={styles.headerIcon} />
        <div className={styles.headerContent}>
          <h3 className={styles.title}>Configuración de Actividad</h3>
          <p className={styles.description}>
            Define la palabra a adivinar y el nivel de dificultad para tus
            estudiantes.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Palabra */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaLightbulb className={styles.sectionIcon} />
                Palabra a Adivinar
                <span className={styles.sectionTooltip}>
                  <Tooltip content="La palabra debe tener entre 3 y 50 caracteres, y debe contener sólo letras" />
                </span>
              </h4>
            </div>
            <p className={styles.sectionDescription}>
              Ingresa la palabra que los estudiantes deberán adivinar.
            </p>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={formData.word}
              onChange={(e) =>
                handleInputChange("word", e.target.value.toUpperCase())
              }
              className={`${styles.input} ${
                formErrors.word ? styles.error : ""
              }`}
              placeholder="MATEMATICAS"
              maxLength={50}
            />
            {formErrors.word && (
              <span className={styles.errorMessage}>{formErrors.word}</span>
            )}
            <div className={styles.charCount}>
              <span
                className={formData.word.length > 50 ? styles.overLimit : ""}
              >
                {formData.word.length}/50 caracteres
              </span>
            </div>
          </div>

          {/* Sugerencias de palabras */}
          <div className={styles.suggestions}>
            <label className={styles.suggestionsLabel}>
              <FaInfoCircle className={styles.suggestionIcon} />
              Sugerencias de palabras
            </label>
            <div className={styles.suggestionsList}>
              {wordSuggestions.map((word) => (
                <button
                  key={word}
                  type="button"
                  className={styles.suggestionButton}
                  onClick={() => handleInputChange("word", word)}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Configuración de Dificultad */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaChartBar className={styles.sectionIcon} />
                Nivel de Dificultad
              </h4>
            </div>
            <p className={styles.sectionDescription}>
              Selecciona cuántos errores pueden cometer los estudiantes antes de
              perder.
            </p>
          </div>
          <div className={styles.difficultyGrid}>
            {difficultyOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  handleInputChange("errorsPermited", option.value)
                }
                className={`${styles.difficultyOption} ${
                  formData.errorsPermited === option.value
                    ? styles.selected
                    : ""
                }`}
                style={{
                  borderColor:
                    formData.errorsPermited === option.value
                      ? getDifficultyColor(option.value)
                      : undefined,
                }}
              >
                <div className={styles.optionHeader}>
                  <div
                    className={styles.optionIcon}
                    style={{
                      backgroundColor: getDifficultyColor(option.value),
                    }}
                  >
                    <FaGamepad />
                  </div>
                  <div className={styles.optionContent}>
                    <h5 className={styles.optionTitle}>{option.label}</h5>
                    <p className={styles.optionDescription}>
                      {option.description}
                    </p>
                  </div>
                </div>
                <div className={styles.errorCount}>
                  <span className={styles.errorLabel}>Errores permitidos:</span>
                  <span
                    className={styles.errorNumber}
                    style={{ color: getDifficultyColor(option.value) }}
                  >
                    {option.errors}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <ActivityFormError
          errors={formErrors}
          onDismiss={handleDismissError}
          showToaster
        />
      </form>
    </motion.div>
  );
};

export default GeneralConfiguration;
