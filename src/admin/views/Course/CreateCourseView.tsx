import { motion } from "framer-motion";
import { FaBook, FaSave } from "react-icons/fa";
import { Card, Button, Input } from "@/shared";
import { useCreateCourseView } from "@/admin";
import styles from "./CreateCourseView.module.css";

const CreateCourseView: React.FC = () => {
  const {
    loading,
    years,
    isEditMode,
    formData,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useCreateCourseView();
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
