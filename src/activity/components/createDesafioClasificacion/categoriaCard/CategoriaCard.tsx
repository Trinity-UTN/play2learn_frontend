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
import type { ClassificationCategory } from "../../../types/DesafioClasificacion.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Input from "../../../../shared/components/Input/InputComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import styles from "./CategoriaCard.module.css";
import { useCreateDesafioClasificacion } from "../../../hooks/useDesafioClasificacion";
import ConfirmationModal from "../../../../shared/components/ConfirmationModal/ConfirmationModal";
import ConceptList from "../conceptList/ConceptList";
type Props = {
  category: ClassificationCategory;
};
const CategoryCard = ({ category }: Props) => {
  const { handleEditCategory, handleDeleteCategory, getCategoryNames } =
    useCreateDesafioClasificacion();

  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState(category.name);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "warning" as "warning" | "danger",
    isOpen: false,
    showDoubleConfirmation: false,
    onConfirm: () => {},
  });

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

  const DeleteCategory = (categoria: string) => {
    setAlertConfig({
      title: "Eliminar Categoría",
      message: `¿Está seguro que desea eliminar la categoría ${categoria}?`,
      type: "warning",
      isOpen: true,
      showDoubleConfirmation: false,
      onConfirm: () => {
        handleDeleteCategory(category.id);
        setAlertConfig((prev) => ({ ...prev, isOpen: false }));
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
                  onClick={() => DeleteCategory(editCategoryName)}
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
      <ConfirmationModal
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        isOpen={alertConfig.isOpen}
        showDoubleConfirmation={alertConfig.showDoubleConfirmation}
        doubleConfirmationText="¿Está completamente seguro?"
        onConfirm={alertConfig.onConfirm}
        onClose={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </motion.div>
  );
};

export default CategoryCard;
