import { useState } from "react";
import { motion } from "framer-motion";
import { FaCog, FaListOl, FaListAlt } from "react-icons/fa";
import { Input, Tooltip } from "@/shared";
import type { OrdenarSecuenciaConfig } from "../../../types/OrdenarSecuencia.type";
import { useCreateOrdenarSecuencia } from "../../../hooks/useCreateOrdenarSecuencia";
import styles from "./GeneralConfiguration.module.css";

const GeneralConfiguration: React.FC = () => {
  const { config, handleConfigSubmit } = useCreateOrdenarSecuencia();

  const [formData, setFormData] = useState<OrdenarSecuenciaConfig>(config);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (
    field: keyof OrdenarSecuenciaConfig,
    value: number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (formData.cantEvents < 3) {
      newErrors.cantEvents = "Debe crear al menos 3 eventos";
    } else if (formData.cantEvents > 10) {
      newErrors.cantEvents = "No puede crear más de 10 eventos";
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
        <div>
          <h3 className={styles.title}>Configuración de Actividad</h3>
          <p className={styles.description}>
            Define la cantidad de eventos que los estudiantes deberán ordenar en
            la secuencia correcta.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaListOl className={styles.sectionIcon} />
                Cantidad de Eventos
                <span className={styles.sectionTooltip}>
                  <Tooltip content="Mínimo 3 eventos, máximo 10" />
                </span>
              </h4>
            </div>
            <p className={styles.sectionDescription}>
              Indica la cantidad de eventos que los estudiantes deberán ordenar
            </p>
          </div>
          <div className={styles.inputGroup}>
            <Input
              type="number"
              value={formData.cantEvents}
              onChange={(e) =>
                handleInputChange(
                  "cantEvents",
                  Number.parseInt(e.target.value) || 4
                )
              }
              error={errors.cantEvents}
              min="4"
              max="8"
              className={styles.input}
            />
          </div>
        </div>

        {/* <div className={styles.infoSection}> // TODO: ACTIVITY INFO
          <div className={styles.infoHeader}>
            <FaInfoCircle className={styles.infoIcon} />
            <h4 className={styles.infoTitle}>¿Cómo funciona esta actividad?</h4>
          </div>
          <div className={styles.infoContent}>
            <p className={styles.infoText}>
              Los estudiantes verán los eventos desordenados y deberán
              arrastrarlos para ponerlos en el orden cronológico correcto. Cada
              evento puede incluir una imagen, nombre y descripción para ayudar
              a los estudiantes a identificar la secuencia correcta.
            </p>
          </div>
        </div> */}

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
            <span className={styles.summaryLabel}>Total de eventos:</span>
            <span className={styles.summaryValue}>{formData.cantEvents}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Dificultad estimada:</span>
            <span className={styles.summaryValue}>
              {formData.cantEvents <= 4
                ? "Fácil"
                : formData.cantEvents <= 7
                ? "Medio"
                : "Difícil"}
            </span>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default GeneralConfiguration;
