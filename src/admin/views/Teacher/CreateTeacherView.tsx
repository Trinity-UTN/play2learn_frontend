import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaSave } from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import { useTeacher } from "../../hooks/useTeacher";
import styles from "./CreateTeacherView.module.css";

const CreateTeacherView: React.FC = () => {
  const { loading, registerTeacher } = useTeacher();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
  });

  const resetFormData = () => {
    setFormData({
      name: "",
      lastname: "",
      dni: "",
      email: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerTeacher(formData);
      alert("Docente creado exitosamente.");
      resetFormData();
    } catch (err) {
      alert("Hubo un error al crear el Docente.");
    }
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
        <h1 className={styles.title}>Generar Docente</h1>
        <p className={styles.subtitle}>
          Registra un nuevo docente en el sistema
        </p>
      </div>

      <Card className={styles.formCard}>
        <div className={styles.cardHeader}>
          <FaUserTie className={styles.headerIcon} />
          <h2 className={styles.cardTitle}>Información del Docente</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nombres *</label>
              <Input
                placeholder="Nombre del docente"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Apellidos * </label>
              <Input
                placeholder="Apellido del docente"
                value={formData.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>DNI *</label>
              <Input
                placeholder="DNI del docente"
                value={formData.dni}
                onChange={(e) => handleChange("dni", e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Correo Electrónico *</label>
              <Input
                type="email"
                placeholder="Dirección de email del docente"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Button type="submit" variant="primary">
              <FaSave className={styles.buttonIcon} />
              {loading ? "Creando..." : "Crear Docente"}
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

export default CreateTeacherView;
