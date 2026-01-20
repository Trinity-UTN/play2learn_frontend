import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCog,
  FaClipboardList,
  FaUpload,
  FaFileAlt,
  FaLink,
  FaEdit,
} from "react-icons/fa";
import { TextArea, Tooltip } from "@/shared";
import type { NoLudicaConfig, TipoEntrega } from "../../../types/NoLudica.type";
import { useCreateNoLudica } from "../../../hooks/useCreateNoLudica";
import ActivityFormError from "../../common/ActivityFormError/ActivityFormError";
import styles from "./GeneralConfiguration.module.css";

const GeneralConfiguration: React.FC = () => {
  const { config, handleConfigSubmit, getTipoEntregaOptions, validateConfig } =
    useCreateNoLudica();

  const [formData, setFormData] = useState<NoLudicaConfig>(config);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData(config);
  }, [config]);
  const tipoEntregaOptions = getTipoEntregaOptions();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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

  const validateForm = (): boolean => {
    const validationErrors = validateConfig(formData);
    const fieldErrors: { [key: string]: string } = {};

    validationErrors.forEach((error) => {
      if (error.includes("consigna")) {
        fieldErrors.excercise = error;
      } else if (error.includes("tipo de entrega")) {
        fieldErrors.tipoEntrega = error;
      }
    });

    setFormErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleConfigSubmit(formData);
    }
  };

  const handleDismissError = (key: string) => {
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <FaCog className={styles.headerIcon} />
        <div className={styles.headerContent}>
          <h3 className={styles.title}>Configuración de Actividad</h3>
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
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaClipboardList className={styles.sectionIcon} />
                Consigna de la Actividad
                <span className={styles.sectionTooltip}>
                  <Tooltip content="La consigna no puede tener mas de 300 caracteres" />
                </span>
              </h4>
            </div>
            <p className={styles.sectionDescription}>
              Describe la consigna que deben cumplir los estudiantes.
            </p>
          </div>

          <div className={styles.inputGroup}>
            <TextArea
              id="excercise"
              value={formData.excercise}
              onChange={(e) => handleInputChange("excercise", e.target.value)}
              error={!!formErrors.excercise}
              helperText={formErrors.excercise}
              placeholder="Redacta un ensayo de 500 palabras sobre el impacto de la tecnología en la educación..."
              rows={2}
              maxLength={300}
              showCharCount={true}
              resize="vertical"
            />
          </div>
        </div>

        {/* Tipo de Entrega */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaUpload className={styles.sectionIcon} />
                Tipo de Entrega
                <span className={styles.sectionTooltip}>
                  <Tooltip content="La consigna no puede tener mas de 300 caracteres" />
                </span>
              </h4>
            </div>
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
                className={`${styles.tipoEntregaOption} ${formData.tipoEntrega === option.value ? styles.selected : ""
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
