import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaSave } from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import { useYear } from "../../hooks/useYear";
import styles from "./CreateYearView.module.css";

const CreateYearView: React.FC = () => {
  const [formData, setFormData] = useState({ name: "" });
  const { registerYear, loading } = useYear();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerYear(formData);
      alert("Año creado exitosamente.");
      setFormData({ name: "" });
    } catch (err) {
      alert("Hubo un error al crear el año.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Generar Año</h1>
        <p className={styles.subtitle}>
          Crea un nuevo año en el sistema
        </p>
      </div>

      <Card className={styles.formCard}>
        <div className={styles.cardHeader}>
          <FaCalendarAlt className={styles.headerIcon} />
          <h2 className={styles.cardTitle}>Información del Año</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nombre del Año *</label>
              <Input
                placeholder="Ej: Primer Año"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Button type="submit" variant="primary" disabled={loading}>
              <FaSave className={styles.buttonIcon} />
              {loading ? "Creando..." : "Crear Año"}
            </Button>
            <Button type="button" variant="outline" disabled={loading}>
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default CreateYearView;
