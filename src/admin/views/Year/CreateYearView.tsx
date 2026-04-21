import { motion } from "framer-motion";
import { FaSave } from "react-icons/fa";
import { Card, Button, Input } from "@/shared";
import styles from "./CreateYearView.module.css";
import { useCreateYearView } from "@/admin";

const CreateYearView: React.FC = () => {
  const {
    formData,
    loading,
    isEditMode,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useCreateYearView();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>
          {isEditMode ? "Modificar Año" : "Generar Año"}
        </h1>
        <p className={styles.subtitle}>
          {isEditMode
            ? "Modifica la información del año académico"
            : "Crea un nuevo año académico en el sistema"}
        </p>
      </div>

      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nombre del Año *</label>
              <Input
                placeholder="Ej: Primer Año"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                required
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
                  ? "Actualizar Año"
                  : "Crear Año"}
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

export default CreateYearView;
