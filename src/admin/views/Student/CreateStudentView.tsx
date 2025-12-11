import { motion } from "framer-motion";
import { FaGraduationCap, FaSave } from "react-icons/fa";
import { Card, Button, Input } from "@/shared";

import styles from "./CreateStudentView.module.css";
import { useCreateStudentView } from "@/admin";

const CreateStudentView: React.FC = () => {
  const {
    loading,
    years,
    courses: filteredCourses,

    formData,
    handleChange,
    handleSubmit,
    handleCancel,

    isEditMode,
    setFormData,
  } = useCreateStudentView();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>
          {isEditMode ? "Modificar Estudiante" : "Generar Estudiante"}
        </h1>
        <p className={styles.subtitle}>
          {isEditMode
            ? "Modifica la información del estudiante"
            : "Registra un nuevo estudiante en el sistema"}
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
                max={50}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Apellidos *</label>
              <Input
                placeholder="Apellido del estudiante"
                value={formData.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
                required
                max={50}
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>DNI *</label>
              <Input
                placeholder="DNI del estudiante"
                value={formData.dni}
                onChange={(e) => handleChange("dni", e.target.value)}
                required
                max={8}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Fecha de nacimiento</label>
              <Input
                type="date"
                placeholder="Fecha de nacimiento del estudiante"
                value={formData.birthdate}
                onChange={(e) => handleChange("birthdate", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Correo Electrónico (estudiante) *
              </label>
              <Input
                type="email"
                placeholder="Dirección de email del estudiante"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Correo Electrónico (tutor)</label>
              <Input
                type="email"
                placeholder="Dirección de email del tutor del estudiante"
                value={formData.emailTutor}
                onChange={(e) => handleChange("emailTutor", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Año del Curso *</label>
              <select
                className={styles.select}
                value={formData.year_id}
                onChange={(e) => {
                  const yearId = Number(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    year_id: yearId,
                    course_id: 0, // reset curso al cambiar año
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
                value={formData.course_id}
                onChange={(e) =>
                  handleChange("course_id", Number(e.target.value))
                }
                required
                disabled={formData.year_id === 0}
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

          <div className={styles.buttonGroup}>
            <Button type="submit" variant="primary" disabled={loading}>
              <FaSave className={styles.buttonIcon} />
              {loading
                ? isEditMode
                  ? "Actualizando..."
                  : "Creando..."
                : isEditMode
                ? "Actualizar Estudiante"
                : "Crear Estudiante"}
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

export default CreateStudentView;
