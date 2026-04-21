import { motion } from "framer-motion";
import { FaSave } from "react-icons/fa";
import { BooleanInput, Button, Card, Input } from "@/shared";
import styles from "./CreateSubjectView.module.css";
import { useCreateSubjectView } from "@/admin";

const CreateSubjectView: React.FC = () => {
  const {
    loading,
    years,
    teacher,
    isEditMode,
    formData,
    filteredCourses,
    setFormData,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useCreateSubjectView();

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
                {teacher.map((teacher) => (
                  <option value={teacher.id} key={teacher.id}>
                    {teacher.name} {teacher.lastname}
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
