import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCog, FaClock, FaQuestionCircle, FaArrowRight } from "react-icons/fa";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import Input from "../../../../../shared/components/Input/InputComponent";
import type { PreguntadosConfig } from "../../../../types/Preguntados.type";
import styles from "./GeneralConfiguration.module.css";

interface GeneralConfigProps {
  config: PreguntadosConfig;
  onSubmit: (config: PreguntadosConfig) => void;
}

const GeneralConfiguration: React.FC<GeneralConfigProps> = ({
  config,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<PreguntadosConfig>(config);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (field: keyof PreguntadosConfig, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (formData.totalQuestions < 5) {
      newErrors.totalQuestions = "Debe crear al menos 5 preguntas";
    } else if (formData.totalQuestions > 50) {
      newErrors.totalQuestions = "No puede crear más de 50 preguntas";
    }

    if (formData.maxTimePerQuestionInSeconds < 10) {
      newErrors.maxTimePerQuestionInSeconds =
        "El tiempo mínimo por pregunta es de 10 segundos";
    } else if (formData.maxTimePerQuestionInSeconds > 300) {
      newErrors.maxTimePerQuestionInSeconds =
        "El tiempo máximo por pregunta es de 300 segundos (5 minutos)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <FaCog className={styles.headerIcon} />
        <div>
          <h3 className={styles.title}>Configuración General</h3>
          <p className={styles.description}>
            Define la cantidad de preguntas y el tiempo que tendrán los
            estudiantes para responder cada una.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FaQuestionCircle className={styles.labelIcon} />
              Cantidad de Preguntas *
              <span className={styles.labelHint}>
                Mínimo 5 preguntas, máximo 50
              </span>
            </label>
            <Input
              type="number"
              value={formData.totalQuestions}
              onChange={(e) =>
                handleInputChange(
                  "totalQuestions",
                  Number.parseInt(e.target.value) || 5
                )
              }
              error={errors.totalQuestions}
              min="5"
              max="50"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FaClock className={styles.labelIcon} />
              Tiempo por Pregunta (segundos) *
              <span className={styles.labelHint}>
                Mínimo 10 segundos, máximo 300 segundos
              </span>
            </label>
            <Input
              type="number"
              value={formData.maxTimePerQuestionInSeconds}
              onChange={(e) =>
                handleInputChange(
                  "maxTimePerQuestionInSeconds",
                  Number.parseInt(e.target.value) || 30
                )
              }
              error={errors.maxTimePerQuestionInSeconds}
              min="10"
              max="300"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.summary}>
          <h4 className={styles.summaryTitle}>Resumen de la Actividad</h4>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total de preguntas:</span>
              <span className={styles.summaryValue}>
                {formData.totalQuestions}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Tiempo por pregunta:</span>
              <span className={styles.summaryValue}>
                {formData.maxTimePerQuestionInSeconds} segundos
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>
                Tiempo total estimado:
              </span>
              <span className={styles.summaryValue}>
                {Math.ceil(
                  (formData.totalQuestions *
                    formData.maxTimePerQuestionInSeconds) /
                    60
                )}{" "}
                minutos
              </span>
            </div>
          </div>
        </div>

        <div className={styles.submitSection}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className={styles.submitButton}
          >
            <FaArrowRight />
            Crear Preguntas
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default GeneralConfiguration;
