import { useState } from "react";
import { motion } from "framer-motion";
import { FaCog, FaPuzzlePiece, FaListAlt } from "react-icons/fa";
import { Input, Tooltip } from "@/shared";
import type { MemoramaConfig } from "../../../types/Memorama.type";
import { useCreateMemorama } from "../../../hooks/useCreateMemorama";
import styles from "./GeneralConfiguration.module.css";

const GeneralConfiguration: React.FC = () => {
  const { config, handleConfigSubmit } = useCreateMemorama();
  const [formData, setFormData] = useState<MemoramaConfig>(config);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (field: keyof MemoramaConfig, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (formData.totalPairs < 4) {
      newErrors.totalPairs = "Debe crear al menos 4 parejas";
    } else if (formData.totalPairs > 8) {
      newErrors.totalPairs = "No puede crear más de 8 parejas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
            Define la cantidad de parejas que tendrá el memorama.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaPuzzlePiece className={styles.sectionIcon} />
                Cantidad de Parejas
                <span className={styles.sectionTooltip}>
                  <Tooltip content="Mínimo 4 parejas, máximo 8" />
                </span>
              </h4>
            </div>
            <p className={styles.sectionDescription}>
              Indica la cantidad de parejas que tendrá el memorama.
            </p>
          </div>
          <div className={styles.inputGroup}>
            <Input
              type="number"
              value={formData.totalPairs}
              onChange={(e) =>
                handleInputChange(
                  "totalPairs",
                  Number.parseInt(e.target.value) || 4
                )
              }
              error={errors.totalPairs}
              min="4"
              max="8"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaListAlt className={styles.sectionIcon} />
                Resumen de la Actividad
              </h4>
            </div>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Total de parejas:</span>
            <span className={styles.summaryValue}>{formData.totalPairs}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Cartas totales:</span>
            <span className={styles.summaryValue}>
              {formData.totalPairs * 2}
            </span>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default GeneralConfiguration;
