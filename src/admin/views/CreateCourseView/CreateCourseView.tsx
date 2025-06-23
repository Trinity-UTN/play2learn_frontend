import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBook, FaSave } from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import styles from "./CreateCourseView.module.css";

const CreateCourseView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    year_id: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Curso creado:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Generar Curso</h1>
        <p className={styles.subtitle}>Crea un nuevo curso en el sistema</p>
      </div>

      <Card className={styles.formCard}>
        <div className={styles.cardHeader}>
          <FaBook className={styles.headerIcon} />
          <h2 className={styles.cardTitle}>Información del Curso</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Año del Curso *</label>
              <select
                className={styles.select}
                value={formData.year_id}
                onChange={(e) => handleChange("year_id", e.target.value)}
                required
              >
                <option value="">Seleccionar año</option>
                <option value="1">Primer Año</option>
                <option value="2">Segundo Año</option>
                <option value="3">Tercer Año</option>
                <option value="4">Cuarto Año</option>
                <option value="5">Quinto Año</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nombre del Curso *</label>
              <Input
                placeholder="Nombre del curso. Ejemplo: A"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Button type="submit" variant="primary">
              <FaSave className={styles.buttonIcon} />
              Crear Curso
            </Button>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default CreateCourseView;
