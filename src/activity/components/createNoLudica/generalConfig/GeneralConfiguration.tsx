import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCog, FaClipboardList } from "react-icons/fa";
import { TextArea, Tooltip } from "@/shared";
import type { NoLudicaConfig } from "../../../types/NoLudica.type";
import { useCreateNoLudica } from "../../../hooks/useCreateNoLudica";
import ActivityFormError from "../../common/ActivityFormError/ActivityFormError";
import styles from "./GeneralConfiguration.module.css";

const GeneralConfiguration: React.FC = () => {
  const { config, handleConfigSubmit, validateConfig } = useCreateNoLudica();

  const [formData, setFormData] = useState<NoLudicaConfig>(config);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData(config);
  }, [config]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const validateForm = (): boolean => {
    const validationErrors = validateConfig(formData);
    const fieldErrors: { [key: string]: string } = {};

    validationErrors.forEach((error) => {
      if (error.includes("consigna")) {
        fieldErrors.exercise = error;
      }
    });

    setFormErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleInputChange = (field: keyof NoLudicaConfig, value: string) => {
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
            Define la consigna que realizarán los estudiantes.
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
                  <Tooltip content="La consigna no puede tener mas de 1000 caracteres" />
                </span>
              </h4>
            </div>
            <p className={styles.sectionDescription}>
              Describe la consigna que deben cumplir los estudiantes.
            </p>
          </div>

          <div className={styles.inputGroup}>
            <TextArea
              id="exercise"
              value={formData.exercise}
              onChange={(e) => handleInputChange("exercise", e.target.value)}
              error={!!formErrors.exercise}
              helperText={formErrors.exercise}
              placeholder="Redacta un ensayo de 500 palabras sobre el impacto de la tecnología en la educación..."
              rows={2}
              maxLength={1000}
              showCharCount={true}
              resize="vertical"
            />
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
