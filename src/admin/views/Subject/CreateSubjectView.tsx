import type React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, FaSave } from "react-icons/fa";
import BooleanInput from "../../../shared/components/BooleanInput/BooleanInputComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Card from "../../../shared/components/Card/CardComponent";
import Input from "../../../shared/components/Input/InputComponent";
import { useYear } from "../../hooks/useYear";
import { useCourse } from "../../hooks/useCourse";
import { useTeacher } from "../../hooks/useTeacher";
import { useSubject } from "../../hooks/useSubject";
import styles from "./CreateSubjectView.module.css";

const CreateSubjectView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { getYear, years } = useYear();
  const { getCourse, courses } = useCourse();
  const { getTeacher, teachers } = useTeacher();
  const { registerSubject, updateSubject, loading, selectedSubject } =
    useSubject();

  const [formData, setFormData] = useState({
    name: "",
    yearId: 0,
    courseId: 0,
    teacherId: 0,
    optional: false,
  });

  const filteredCourses = courses.filter(
    (course) => course.year.id === formData.yearId
  );

  const resetFormData = () => {
    setFormData({
      name: "",
      yearId: 0,
      courseId: 0,
      teacherId: 0,
      optional: false,
    });
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([getYear(), getCourse(), getTeacher()]);
    };

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEditMode && selectedSubject) {
      setFormData({
        name: selectedSubject.name || "",
        yearId: selectedSubject.course?.year?.id || 0,
        courseId: selectedSubject.course?.id || 0,
        teacherId: selectedSubject.teacher?.id || 0,
        optional: selectedSubject.optional || false,
      });
    }
  }, [isEditMode, selectedSubject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name.trim(),
      courseId: formData.courseId,
      teacherId: formData.teacherId === 0 ? null : formData.teacherId,
      optional: formData.optional,
    };
    try {
      if (isEditMode && id) {
        await updateSubject({
          id: Number(id),
          ...payload,
        });
        alert("Materia actualizada exitosamente.");
        navigate("/dashboard/subjects/list");
      } else {
        await registerSubject(payload);
        alert("Materia creada exitosamente.");
        resetFormData();
      }
    } catch (err) {
      alert(
        isEditMode
          ? "Hubo un error al actualizar la materia."
          : "Hubo un error al crear la materia."
      );
    }
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    if (isEditMode) {
      navigate("/dashboard/subjects/list");
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
        <h1 className={styles.title}>
          {isEditMode ? "Modificar Materia" : "Generar Materia"}
        </h1>
        <p className={styles.subtitle}>
          {isEditMode
            ? "Modifica la información de la materia"
            : "Registra una nueva materia en el sistema"}
        </p>
      </div>

      <Card className={styles.formCard}>
        <div className={styles.cardHeader}>
          <FaGraduationCap className={styles.headerIcon} />
          <h2 className={styles.cardTitle}>Información de la Materia</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nombre *</label>
              <Input
                placeholder="Nombre de la materia"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Año del Curso *</label>
              <select
                className={styles.select}
                value={formData.yearId}
                onChange={(e) => {
                  const yearId = Number(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    yearId: yearId,
                    courseId: 0, // reset curso al cambiar año
                  }));
                }}
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
              <label className={styles.label}>Curso *</label>
              <select
                className={styles.select}
                value={formData.courseId}
                onChange={(e) =>
                  handleChange("courseId", Number(e.target.value))
                }
                required
                disabled={formData.yearId === 0}
              >
                <option value="">Seleccionar curso</option>
                {filteredCourses.map((course) => (
                  <option value={course.id} key={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Docente</label>
              <select
                className={styles.select}
                value={formData.teacherId}
                onChange={(e) =>
                  handleChange("teacherId", Number(e.target.value))
                }
              >
                <option value="">Seleccionar docente</option>
                {teachers.map((teacher) => (
                  <option value={teacher.id} key={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Materia Opcional *</label>
              <BooleanInput
                checked={formData.optional}
                onChange={(checked) => handleChange("optional", checked)}
                label={
                  formData.optional ? "Sí, es opcional" : "No, es obligatoria"
                }
                size="md"
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Button type="submit" variant="primary" disabled={loading}>
              <FaSave className={styles.buttonIcon} />
              {loading
                ? isEditMode
                  ? "Actualizando..."
                  : "Creando..."
                : isEditMode
                ? "Actualizar Materia"
                : "Crear Materia"}
            </Button>
            {isEditMode && (
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default CreateSubjectView;
