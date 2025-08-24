import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBook, FaSave } from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import { useYear } from "../../hooks/useYear";
import { useCourse } from "../../hooks/useCourse";
import styles from "./CreateCourseView.module.css";
import { useNavigate, useParams } from "react-router-dom";

const CreateCourseView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { getYear, years } = useYear();
  const {
    registerCourse,
    loading,
    updateCourse,
    getCourseById,
    selectedCourse,
  } = useCourse();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    year_id: 0,
  });

  const resetFormData = () => {
    setFormData({
      name: "",
      year_id: 0,
    });
  };
  useEffect(() => {
    if (isEditMode && id) {
      const loadCourseData = async () => {
        try {
          setFormData({
            name: selectedCourse?.name || "",
            year_id: selectedCourse?.year.id || 0,
          });
        } catch (error) {
          console.error("Error al cargar el curso:", error);
          navigate("/dashboard/courses/list");
        }
      };
      loadCourseData();
    }
  }, [id, isEditMode, getCourseById, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && id) {
        const idN = id ? Number(id) : 0;
        const data = { id: idN, ...formData };

        await updateCourse(data);
        alert("Curso actualizado exitosamente.");
        navigate("/dashboard/courses/list");
      } else {
        await registerCourse(formData);
        alert("Curso creado exitosamente.");
        resetFormData();
      }
    } catch (err) {
      alert(
        isEditMode
          ? "Hubo un error al actualizar el Curso."
          : "Hubo un error al crear el Curso."
      );
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    getYear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCancel = () => {
    navigate("/dashboard/courses/list");
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
          {isEditMode ? "Actualizar Curso" : "Generar Curso"}
        </h1>
        <p className={styles.subtitle}>
          {isEditMode ? "Actualiza" : "Crea "} {isEditMode ? "el" : "un nuevo"}{" "}
          curso en el sistema
        </p>
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
                onChange={
                  (e) => handleChange("year_id", Number(e.target.value)) // agrego el number porque los select a los value los setea como string siempre
                }
                required
              >
                <option value="">Seleccionar año</option>
                {years.map((year) => (
                  <option value={year.id} key={year.id}>
                    {year.name}
                  </option>
                ))}
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
              {loading
                ? isEditMode
                  ? "Actualizando..."
                  : "Creando..."
                : isEditMode
                ? "Actualizar Curso"
                : "Crear Curso"}
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

export default CreateCourseView;
