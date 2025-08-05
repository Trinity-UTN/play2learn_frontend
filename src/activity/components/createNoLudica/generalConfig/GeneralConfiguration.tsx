import { useState } from "react";
import { motion } from "framer-motion";
import { FaCog, FaArrowRight, FaFileAlt, FaLink, FaEdit } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import type { NoLudicaConfig, TipoEntrega } from "../../../types/NoLudica.type";
import { useToaster } from "../../../../shared/hooks/useToaster";
import { useCreateNoLudica } from "../../../hooks/useCreateNoLudica";
import styles from "./GeneralConfiguration.module.css";

const GeneralConfiguration: React.FC = () => {
  const { config, handleConfigSubmit, getTipoEntregaOptions, validateConfig } =
    useCreateNoLudica();
  const { showToast } = useToaster();

  const [formData, setFormData] = useState<NoLudicaConfig>(config);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const tipoEntregaOptions = getTipoEntregaOptions();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (
    field: keyof NoLudicaConfig,
    value: string | TipoEntrega
  ) => {
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
      if (error.includes("consigna")) {
        fieldErrors.excercise = error;
      } else if (error.includes("tipo de entrega")) {
        fieldErrors.tipoEntrega = error;
      }

      showToast({
        title: "Error de validación",
        message: error,
        type: "warning",
        position: "bottom-right",
      });
    });

    setFormErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleConfigSubmit(formData);
    }
  };

  const getTypeIcon = (tipo: TipoEntrega) => {
    switch (tipo) {
      case "ENTREGA":
        return <FaFileAlt />;
      case "ENLACE":
        return <FaLink />;
      case "TEXTO":
        return <FaEdit />;
      default:
        return <FaEdit />;
    }
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <FaCog className={styles.headerIcon} />
        <div>
          <h3 className={styles.title}>Configuración de Actividad No Lúdica</h3>
          <p className={styles.description}>
            Define la consigna y el tipo de entrega que realizarán los
            estudiantes.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Consigna */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Consigna de la Actividad</h4>
            <p className={styles.sectionDescription}>
              Describe claramente qué deben hacer los estudiantes. Máximo 300
              caracteres.
            </p>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Consigna *
              <span className={styles.labelHint}>
                Sé específico sobre lo que esperas que entreguen los estudiantes
              </span>
            </label>
            <textarea
              value={formData.excercise}
              onChange={(e) => handleInputChange("excercise", e.target.value)}
              className={`${styles.textarea} ${
                formErrors.excercise ? styles.error : ""
              }`}
              placeholder="Ej: Redacta un ensayo de 500 palabras sobre el impacto de la tecnología en la educación..."
              rows={4}
            />
            {formErrors.excercise && (
              <span className={styles.errorMessage}>
                {formErrors.excercise}
              </span>
            )}
            <div className={styles.charCount}>
              <span
                className={
                  formData.excercise.length > 300 ? styles.overLimit : ""
                }
              >
                {formData.excercise.length}/300 caracteres
              </span>
            </div>
          </div>
        </div>

        {/* Tipo de Entrega */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Tipo de Entrega</h4>
            <p className={styles.sectionDescription}>
              Selecciona cómo quieres que los estudiantes entreguen su trabajo.
            </p>
          </div>

          <div className={styles.tipoEntregaGrid}>
            {tipoEntregaOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleInputChange("tipoEntrega", option.value)}
                className={`${styles.tipoEntregaOption} ${
                  formData.tipoEntrega === option.value ? styles.selected : ""
                }`}
              >
                <div className={styles.optionHeader}>
                  <div className={styles.optionIconReact}>
                    {getTypeIcon(option.value)}
                  </div>
                </div>
                <h5 className={styles.optionTitle}>{option.label}</h5>
                <p className={styles.optionDescription}>{option.description}</p>
                {option.acceptedFormats && (
                  <div className={styles.acceptedFormats}>
                    <span className={styles.formatsLabel}>Formatos:</span>
                    <span className={styles.formatsList}>
                      {option.acceptedFormats.join(", ")}
                    </span>
                  </div>
                )}
                {option.placeholder && (
                  <div className={styles.placeholderPreview}>
                    <span className={styles.placeholderLabel}>Ejemplo:</span>
                    <span className={styles.placeholderText}>
                      {option.placeholder}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {formErrors.tipoEntrega && (
            <span className={styles.errorMessage}>
              {formErrors.tipoEntrega}
            </span>
          )}
        </div>

        <div className={styles.submitSection}>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className={styles.submitButton}
          >
            <FaArrowRight />
            Siguiente
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default GeneralConfiguration;
