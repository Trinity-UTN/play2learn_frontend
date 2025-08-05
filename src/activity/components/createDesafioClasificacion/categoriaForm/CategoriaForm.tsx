import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaExclamationTriangle } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Input from "../../../../shared/components/Input/InputComponent";
import styles from "./CategoriaForm.module.css";
import { useCreateDesafioClasificacion } from "../../../hooks/useDesafioClasificacion";

const CategoryForm = ({}) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const { handleAddCategory, getCategoryNames, categories } =
    useCreateDesafioClasificacion();
  const existingNames = getCategoryNames();
  const maxCategories = 10;
  const validateCategoryName = (name: string): string => {
    if (!name.trim()) {
      return "El nombre de la categoría es requerido";
    }

    if (name.length < 2) {
      return "El nombre debe tener al menos 2 caracteres";
    }

    if (name.length > 50) {
      return "El nombre no puede superar los 50 caracteres";
    }

    if (existingNames.includes(name.toLowerCase().trim())) {
      return "Ya existe una categoría con este nombre";
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

  const handleInputChange = (value: string) => {
    setCategoryName(value);
    if (error) {
      const validationError = validateCategoryName(value);
      setError(validationError);
    }
  };

  const isMaxReached = categories.length >= maxCategories;
  const charactersLeft = 50 - categoryName.length;
  const isValid =
    categoryName.trim().length >= 2 && !validateCategoryName(categoryName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <Input
              type="text"
              placeholder="Nombre de la categoría (ej: Animales, Colores, etc.)"
              value={categoryName}
              onChange={(e) => handleInputChange(e.target.value)}
              disabled={isMaxReached}
              className={`${styles.input} ${error ? styles.inputError : ""}`}
              maxLength={50}
            />
            <div className={styles.inputMeta}>
              <span
                className={`${styles.charCounter} ${
                  charactersLeft < 10 ? styles.charCounterWarning : ""
                }`}
              >
                {charactersLeft} caracteres restantes
              </span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isMaxReached}
            className={styles.addButton}
          >
            <FaPlus />
            Agregar
          </Button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.errorMessage}
          >
            <FaExclamationTriangle className={styles.errorIcon} />
            {error}
          </motion.div>
        )}

        {isMaxReached && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={styles.warningMessage}
          >
            <FaExclamationTriangle className={styles.warningIcon} />
            Has alcanzado el límite máximo de {maxCategories} categorías
          </motion.div>
        )}

        <div className={styles.hints}>
          <h4 className={styles.hintsTitle}>Consejos:</h4>
          <ul className={styles.hintsList}>
            <li>Usa nombres descriptivos y claros</li>
            <li>Evita categorías muy similares</li>
            <li>Piensa en conceptos que los estudiantes puedan confundir</li>
          </ul>
        </div>
      </form>
    </motion.div>
  );
};

export default CategoryForm;
