import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaTag,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Button, Input, Card, Badge, useConfirmation } from "@/shared";
import ConceptList from "../conceptList/ConceptList";
import type { ClassificationCategory } from "../../../types/DesafioClasificacion.type";
import { useCreateDesafioClasificacion } from "../../../hooks/useCreateDesafioClasificacion";
import styles from "./CategoriaCard.module.css";

type Props = {
  category: ClassificationCategory;
};

const CategoryCard = ({ category }: Props) => {
  const { handleEditCategory, handleDeleteCategory, getCategoryNames } =
    useCreateDesafioClasificacion();
  const { showConfirmation } = useConfirmation();

  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState(category.name);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  let existingCategoryNames = getCategoryNames();
  existingCategoryNames = existingCategoryNames.filter(
    (name) => name !== category.name.toLowerCase()
  );

  const validateCategoryName = (name: string): string => {
    if (!name.trim()) return "El nombre es requerido";
    if (name.length < 2) return "Mínimo 2 caracteres";
    if (name.length > 50) return "Máximo 50 caracteres";
    if (existingCategoryNames.includes(name.toLowerCase().trim())) {
      return "Ya existe una categoría con este nombre";
    }
    return "";
  };

  const handleEditCategoryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && editCategoryName.trim()) {
      e.preventDefault();
      handleSaveCategoryEdit();
    }
  };

  const handleSaveCategoryEdit = () => {
    const error = validateCategoryName(editCategoryName);
    if (error) {
      setErrors({ ...errors, category: error });
      return;
    }

    handleEditCategory(category.id, editCategoryName.trim());
    setIsEditingCategory(false);
    setErrors({ ...errors, category: "" });
  };

  const handleCancelCategoryEdit = () => {
    setEditCategoryName(category.name);
    setIsEditingCategory(false);
    setErrors({ ...errors, category: "" });
  };

  const deleteCategory = (categoria: string) => {
    showConfirmation({
      title: "Borrar categoría",
      message: `¿Está seguro de que desea eliminar la categoría ${categoria}?`,
      type: "danger",
      onConfirm: () => {
        handleDeleteCategory(category.id);
      },
    });
  };

  return (
    <motion.div
      layout
      className={styles.container}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className={styles.card}>
        <div
          className={styles.header}
          style={{ borderTopColor: category.color }}
        >
          <div className={styles.categoryInfo}>
            {isEditingCategory ? (
              <div className={styles.editCategoryForm}>
                <Input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  onKeyDown={handleEditCategoryKeyDown}
                  className={`${styles.editInput} ${
                    errors.category ? styles.inputError : ""
                  }`}
                  maxLength={50}
                  autoFocus
                />
                <div className={styles.editActions}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveCategoryEdit}
                    disabled={!editCategoryName.trim()}
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCancelCategoryEdit}
                  >
                    <FaTimes />
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.categoryTitle}>
                <FaTag
                  className={styles.categoryIcon}
                  style={{ color: category.color }}
                />
                <h3 className={styles.categoryName}>{category.name}</h3>
                <Badge variant="secondary" className={styles.conceptCount}>
                  {category.concepts.length} conceptos
                </Badge>
              </div>
            )}
          </div>

          <div className={styles.categoryActions}>
            {!isEditingCategory && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingCategory(true)}
                  className={styles.actionButton}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteCategory(editCategoryName)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                >
                  <FaTrash />
                </Button>
              </>
            )}
          </div>
        </div>

        {errors.category && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.errorMessage}
          >
            <FaExclamationTriangle className={styles.errorIcon} />
            {errors.category}
          </motion.div>
        )}

        {/* LISTXONCEPTO */}
        <ConceptList category={category} />

        <div className={styles.footer}>
          <div className={styles.footerInfo}>
            <span className={styles.footerText}>
              {category.concepts.length}/10 conceptos
            </span>
            {category.concepts.length >= 10 && (
              <Badge variant="warning" className={styles.maxBadge}>
                Límite alcanzado
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;
