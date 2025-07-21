import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaSave } from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import { useTeacher } from "../../hooks/useTeacher";
import styles from "./CreateTeacherView.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateTeacherView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const {
    loading,
    registerTeacher,
    getTeacherById,
    selectedTeacher,
    updateTeacher,
  } = useTeacher();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && id) {
      const loadTeacherData = async () => {
        try {
          setFormData({
            name: selectedTeacher?.name || "",
            lastname: selectedTeacher?.lastname || "",
            dni: selectedTeacher?.dni || "",
            email: selectedTeacher?.user.email || "",
          });
        } catch (error) {
          console.error("Error al cargar el docente:", error);
          navigate("/dashboard/teachers/list");
        }
      };
      loadTeacherData();
    }
  }, [id, isEditMode, getTeacherById, navigate]);

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
      if (isEditMode && id) {
        const idN = id ? Number(id) : 0;
        const data = { id: idN, ...formData };

        await updateTeacher(data);
        alert("Docente actualizado exitosamente.");
        navigate("/dashboard/teachers/list");
      } else {
        await registerTeacher(formData);
        alert("Docente creado exitosamente.");
        resetFormData();
      }
    } catch (err) {
      alert(
        isEditMode
          ? "Hubo un error al actualizar el Docente."
          : "Hubo un error al crear el Docente."
      );
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleCancel = () => {
    navigate("/dashboard/teachers/list");
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
              {loading
                ? isEditMode
                  ? "Actualizando..."
                  : "Creando..."
                : isEditMode
                ? "Actualizar Docente"
                : "Crear Docente"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default CreateTeacherView;
