import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaSave } from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import styles from "./CreateStudentView.module.css";

const CreateStudentView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    dni: "",
    email: "",
    class: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Estudiante creado:", formData);
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
        <h1 className={styles.title}>Generar Estudiante</h1>
        <p className={styles.subtitle}>
          Registra un nuevo estudiante en el sistema
        </p>
      </div>

      <Card className={styles.formCard}>
        <div className={styles.cardHeader}>
          <FaGraduationCap className={styles.headerIcon} />
          <h2 className={styles.cardTitle}>Información del Estudiante</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nombres *</label>
              <Input
                placeholder="Nombre del estudiante"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Apellidos *</label>
              <Input
                placeholder="Apellido del estudiante"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>DNI</label>
              <Input
                placeholder="DNI del estudiante"
                value={formData.dni}
                onChange={(e) => handleChange("dni", e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Correo Electrónico *</label>
              <Input
                type="email"
                placeholder="Dirección de email del estudiante"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Año *</label>
              <select
                className={styles.select}
                value={formData.class}
                onChange={(e) => handleChange("class", e.target.value)}
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
          </div>

          <div className={styles.buttonGroup}>
            <Button type="submit" variant="primary">
              <FaSave className={styles.buttonIcon} />
              Crear Estudiante
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

export default CreateStudentView;
