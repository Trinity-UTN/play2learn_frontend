import type React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserTie, FaSave } from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import { useTeacher } from "../../hooks/useTeacher";
import { useToaster } from "../../../shared/hooks/useToaster";
import styles from "./CreateTeacherView.module.css";

const CreateTeacherView: React.FC = () => {
  const {
    loading,
    selectedTeacher,
    registerTeacher,
    getTeacherById,
    updateTeacher,
  } = useTeacher();
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
  });

  const isEditMode = Boolean(id);

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
          console.error("Error al cargar el docente:", error); // TODO: REMOVE_DEBUG
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
        showToast({
          title: "Docente actualizado exitosamente",
          message: "El docente ha sido actualizado exitosamente",
          type: "success",
          position: "bottom-right",
        });
        navigate("/dashboard/teachers/list");
      } else {
        await registerTeacher(formData);
        showToast({
          title: "Docente creado exitosamente",
          message: "El docente ha sido creado exitosamente",
          type: "success",
          position: "bottom-right",
        });
        resetFormData();
      }
    } catch (err) {
      showToast({
        title:
          "Error al" + (isEditMode ? " actualizar" : " crear") + " el docente",
        type: "error",
        position: "bottom-right",
      });
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
        <h1 className={styles.title}>
          {isEditMode ? "Editar" : "Generar"} Docente
        </h1>
        <p className={styles.subtitle}>
          {isEditMode ? "Actualiza" : "Crea "} {isEditMode ? "el" : "un nuevo"}{" "}
          docente en el sistema
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
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Apellidos * </label>
              <Input
                placeholder="Apellido"
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
                placeholder="DNI"
                value={formData.dni}
                onChange={(e) => handleChange("dni", e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Correo Electrónico *</label>
              <Input
                type="email"
                placeholder="Dirección de email"
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
