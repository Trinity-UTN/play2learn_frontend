import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaSave } from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import { useYear } from "../../hooks/useYear";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import { useToaster } from "../../../shared/hooks/useToaster";
import styles from "./CreateYearView.module.css";

const CreateYearView: React.FC = () => {
  const { loading, selectedYear, registerYear, updateYear, getYearById } =
    useYear();
  const { id } = useParams<{ id: string }>();
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "" });

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && id) {
      const loadYearData = async () => {
        try {
          setFormData({ name: selectedYear?.name || "" });
        } catch (error) {
          handleApiError(error, "Error al cargar el año");
          navigate("/dashboard/years/list");
        }
      };
      loadYearData();
    }
  }, [id, isEditMode, getYearById, navigate]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && id) {
        await updateYear({
          id: Number(id),
          name: formData.name,
        });
        showToast({
          title: "Año actualizado exitosamente",
          message: "El año ha sido actualizado exitosamente",
          type: "success",
          position: "bottom-right",
        });
        navigate("/dashboard/years/list");
      } else {
        await registerYear(formData);
        showToast({
          title: "Año creado exitosamente",
          message: "El año ha sido creado exitosamente",
          type: "success",
          position: "bottom-right",
        });
        setFormData({ name: "" });
      }
    } catch (err) {
      showToast({
        title:
          "Error al" +
          (isEditMode ? " actualizar" : " crear") +
          " el año académico",
        type: "error",
        position: "bottom-right",
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/years/list");
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
          {isEditMode ? "Modificar Año" : "Generar Año"}
        </h1>
        <p className={styles.subtitle}>
          {isEditMode
            ? "Modifica la información del año académico"
            : "Crea un nuevo año académico en el sistema"}
        </p>
      </div>

      <Card className={styles.formCard}>
        <div className={styles.cardHeader}>
          <FaCalendarAlt className={styles.headerIcon} />
          <h2 className={styles.cardTitle}>Información del Año</h2>
        </div>

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
