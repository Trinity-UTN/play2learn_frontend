import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaPlus,
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
type Props = {
  category: ClassificationCategory;
};
const CategoryCard = ({ category }: Props) => {
  const {
    handleEditCategory,
    handleDeleteCategory,
    handleAddConcept,
    handleEditConcept,
    handleDeleteConcept,
    getAllConcepts,
    getCategoryNames,
  } = useCreateDesafioClasificacion();

  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState(category.name);
  const [newConceptName, setNewConceptName] = useState("");
  const [editingConceptId, setEditingConceptId] = useState<string | null>(null);
  const [editConceptName, setEditConceptName] = useState("");
  const [showAddConcept, setShowAddConcept] = useState(false);
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

  const validateConceptName = (name: string): string => {
    if (!name.trim()) return "El nombre es requerido";
    if (name.length < 2) return "Mínimo 2 caracteres";
    if (name.length > 100) return "Máximo 100 caracteres";
    if (getAllConcepts().includes(name.toLowerCase().trim())) {
      return "Ya existe un concepto con este nombre";
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

  const AddConcept = () => {
    const error = validateConceptName(newConceptName);
    if (error) {
      setErrors({ ...errors, newConcept: error });
      return;
    }

    if (category.concepts.length >= 10) {
      setErrors({ ...errors, newConcept: "Máximo 10 conceptos por categoría" });
      return;
    }

    handleAddConcept(category.id, newConceptName.trim());
    setNewConceptName("");
    setShowAddConcept(false);
    setErrors({ ...errors, newConcept: "" });
  };

  const EditConcept = (conceptId: string) => {
    const concept = category.concepts.find((c) => c.id === conceptId);
    if (concept) {
      setEditingConceptId(conceptId);
      setEditConceptName(concept.name);
    }
  };

  const handleSaveConceptEdit = () => {
    if (!editingConceptId) return;

    const error = validateConceptName(editConceptName);
    if (error) {
      setErrors({ ...errors, [editingConceptId]: error });
      return;
    }

    handleEditConcept(category.id, editingConceptId, editConceptName.trim());
    setEditingConceptId(null);
    setEditConceptName("");
    setErrors({ ...errors, [editingConceptId]: "" });
  };

  const handleCancelConceptEdit = () => {
    setEditingConceptId(null);
    setEditConceptName("");
    setErrors({ ...errors, [editingConceptId || ""]: "" });
  };

  const DeleteCategory = () => {
    if (
      window.confirm(
        `¿Estás seguro de eliminar la categoría "${category.name}"?`
      )
    ) {
      handleDeleteCategory(category.id);
    }
  };

  const DeleteConcept = (conceptId: string) => {
    const concept = category.concepts.find((c) => c.id === conceptId);
    if (concept && window.confirm(`¿Eliminar el concepto "${concept.name}"?`)) {
      handleDeleteConcept(category.id, conceptId);
    }
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
                  onClick={DeleteCategory}
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

        <div className={styles.content}>
          <div className={styles.conceptsSection}>
            <div className={styles.conceptsHeader}>
              <h4 className={styles.conceptsTitle}>Conceptos</h4>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAddConcept(!showAddConcept)}
                disabled={category.concepts.length >= 10}
                className={styles.addConceptButton}
              >
                <FaPlus />
                Agregar
              </Button>
            </div>

            <AnimatePresence>
              {showAddConcept && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={styles.addConceptForm}
                >
                  <Input
                    type="text"
                    placeholder="Nombre del concepto"
                    value={newConceptName}
                    onChange={(e) => setNewConceptName(e.target.value)}
                    className={`${styles.conceptInput} ${
                      errors.newConcept ? styles.inputError : ""
                    }`}
                    maxLength={100}
                  />
                  <div className={styles.addConceptActions}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={AddConcept}
                      disabled={!newConceptName.trim()}
                    >
                      <FaCheck />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setShowAddConcept(false);
                        setNewConceptName("");
                        setErrors({ ...errors, newConcept: "" });
                      }}
                    >
                      <FaTimes />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {errors.newConcept && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={styles.errorMessage}
              >
                <FaExclamationTriangle className={styles.errorIcon} />
                {errors.newConcept}
              </motion.div>
            )}

            <div className={styles.conceptsList}>
              <AnimatePresence>
                {category.concepts.map((concept, index) => (
                  <motion.div
                    key={concept.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: index * 0.05 }}
                    className={styles.conceptItem}
                  >
                    {editingConceptId === concept.id ? (
                      <div className={styles.editConceptForm}>
                        <Input
                          type="text"
                          value={editConceptName}
                          onChange={(e) => setEditConceptName(e.target.value)}
                          className={`${styles.editInput} ${
                            errors[concept.id] ? styles.inputError : ""
                          }`}
                          maxLength={100}
                          autoFocus
                        />
                        <div className={styles.editActions}>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSaveConceptEdit}
                            disabled={!editConceptName.trim()}
                          >
                            <FaCheck />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleCancelConceptEdit}
                          >
                            <FaTimes />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.conceptContent}>
                        <span className={styles.conceptName}>
                          {concept.name}
                        </span>
                        <div className={styles.conceptActions}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => EditConcept(concept.id)}
                            className={styles.conceptActionButton}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => DeleteConcept(concept.id)}
                            className={`${styles.conceptActionButton} ${styles.deleteButton}`}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    )}

                    {errors[concept.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={styles.errorMessage}
                      >
                        <FaExclamationTriangle className={styles.errorIcon} />
                        {errors[concept.id]}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {category.concepts.length === 0 && (
                <div className={styles.emptyConcepts}>
                  <p className={styles.emptyConceptsText}>
                    No hay conceptos en esta categoría
                  </p>
                  <p className={styles.emptyConceptsHint}>
                    Agrega conceptos que pertenezcan a "{category.name}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

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
