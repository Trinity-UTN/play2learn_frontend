import { useState } from "react";
import { FaPlus, FaLightbulb, FaExclamationTriangle } from "react-icons/fa";
import { Button, Input, Tooltip } from "@/shared";
import { useCreateDesafioClasificacion } from "../../../hooks/useCreateDesafioClasificacion";
import styles from "./CategoriaForm.module.css";

const CategoryForm: React.FC = () => {
  const { categories, handleAddCategory, getCategoryNames } =
    useCreateDesafioClasificacion();
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const existingNames = getCategoryNames();
  const maxCategories = 10;

  const validateCategoryName = (name: string): string => {
    if (name) {
      if (name.length < 2) return "El nombre debe tener al menos 2 caracteres";
      if (name.length > 50)
        return "El nombre no puede superar los 50 caracteres";
      if (existingNames.includes(name.toLowerCase().trim())) {
        return "Ya existe una categoría con este nombre";
      }
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categories.length >= maxCategories) {
      setError(`No se pueden agregar más de ${maxCategories} categorías`);
      return;
    }

    const validationError = validateCategoryName(categoryName);
    if (validationError) {
      setError(validationError);
      return;
    }

    handleAddCategory(categoryName.trim());
    setCategoryName("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleRow}>
            <h4 className={styles.sectionTitle}>
              <FaLightbulb className={styles.sectionIcon} />
              Nombre de la categoría
              <span className={styles.sectionTooltip}>
                <Tooltip content="Máximo 10 categorías" />
              </span>
            </h4>
          </div>
          <p className={styles.sectionDescription}>
            Ingresa el nombre de la categoría que deseas crear
          </p>
        </div>

        <div className={styles.inputGroup}>
          <Input
            type="text"
            placeholder="Nombre de la categoría (ej: Animales, Colores, etc.)"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              if (error) setError("");
            }}
            disabled={categories.length >= maxCategories}
            className={error ? styles.inputError : styles.input}
            maxLength={50}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={
              !categoryName.trim() || categories.length >= maxCategories
            }
            className={styles.addButton}
          >
            <FaPlus />
          </Button>
        </div>
        {maxCategories === categories.length && (
          <span className={styles.errorMessage}>
            <FaExclamationTriangle />
            Se ha alcanzado el límite de categorías permitidas (10)
          </span>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
