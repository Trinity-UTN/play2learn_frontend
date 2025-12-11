import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import type { ClassificationCategory } from "../../../types/DesafioClasificacion.type";
import { Button, Input, useConfirmation } from "@/shared";
import { useCreateDesafioClasificacion } from "../../../hooks/useCreateDesafioClasificacion";
import styles from "./ConceptList.module.css";

type Props = {
  category: ClassificationCategory;
};

const ConceptList = ({ category }: Props) => {
  const {
    handleAddConcept,
    handleEditConcept,
    handleDeleteConcept,
    getAllConcepts,
  } = useCreateDesafioClasificacion();
  const { showConfirmation } = useConfirmation();

  const [newConceptName, setNewConceptName] = useState("");
  const [editingConceptId, setEditingConceptId] = useState<string | null>(null);
  const [editConceptName, setEditConceptName] = useState("");
  const [editOriginalName, setEditOriginalName] = useState("");
  const [showAddConcept, setShowAddConcept] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateConceptName = (
    name: string,
    isEdit: boolean = false,
    originalName: string = ""
  ): string => {
    if (!name.trim()) return "El nombre es requerido";
    if (name.length < 2) return "Mínimo 2 caracteres";
    if (name.length > 100) return "Máximo 100 caracteres";

    if (
      isEdit &&
      name.toLowerCase().trim() === originalName.toLowerCase().trim()
    ) {
      return "";
    }

    if (getAllConcepts().includes(name.toLowerCase().trim())) {
      return "Ya existe un concepto con este nombre";
    }
    return "";
  };

  const addConcept = () => {
    const error = validateConceptName(newConceptName);
    if (error) {
      setErrors({ ...errors, newConcept: error });
      return;
    }

    if (category.concepts.length >= 10) {
      setErrors({
        ...errors,
        newConcept: "Máximo 10 conceptos por categoría",
      });
      return;
    }

    handleAddConcept(category.id, newConceptName.trim());
    setNewConceptName("");
    setShowAddConcept(false);
    setErrors({ ...errors, newConcept: "" });
  };

  const handleAddConceptKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newConceptName.trim()) {
      e.preventDefault();
      addConcept();
    }
  };

  const editConcept = (conceptId: string) => {
    const concept = category.concepts.find((c) => c.id === conceptId);
    if (concept) {
      setEditingConceptId(conceptId);
      setEditConceptName(concept.name);
      setEditOriginalName(concept.name);
    }
  };

  const handleSaveConceptEdit = () => {
    if (!editingConceptId) return;

    const error = validateConceptName(editConceptName, true, editOriginalName);
    if (error) {
      setErrors({ ...errors, [editingConceptId]: error });
      return;
    }

    handleEditConcept(category.id, editingConceptId, editConceptName.trim());
    setEditingConceptId(null);
    setEditConceptName("");
    setEditOriginalName("");
    setErrors({ ...errors, [editingConceptId]: "" });
  };

  const handleEditConceptKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && editConceptName.trim()) {
      e.preventDefault();
      handleSaveConceptEdit();
    }
  };

  const handleCancelConceptEdit = () => {
    setEditingConceptId(null);
    setEditConceptName("");
    setEditOriginalName("");
    setErrors({ ...errors, [editingConceptId || ""]: "" });
  };

  const deleteConcept = (conceptId: string) => {
    const concept = category.concepts.find((c) => c.id === conceptId);
    showConfirmation({
      title: "Borrar concepto",
      message: `¿Está seguro de que desea eliminar el concepto ${concept?.name}?`,
      type: "warning",
      onConfirm: () => {
        handleDeleteConcept(category.id, conceptId);
      },
    });
  };

  const isAddingOrEditing = showAddConcept || editingConceptId !== null;

  return (
    <div className={styles.content}>
      <div className={styles.conceptsSection}>
        <div className={styles.conceptsHeader}>
          <h4 className={styles.conceptsTitle}>Conceptos</h4>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddConcept(!showAddConcept)}
            disabled={category.concepts.length >= 10 || isAddingOrEditing}
            className={styles.addConceptButton}
          >
            <FaPlus />
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
                onKeyDown={handleAddConceptKeyDown}
                className={`${styles.conceptInput} ${
                  errors.newConcept ? styles.inputError : ""
                }`}
                maxLength={100}
                autoFocus
              />
              <div className={styles.addConceptActions}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={addConcept}
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
                      onKeyDown={handleEditConceptKeyDown}
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
                    <div className={styles.conceptBadge}>
                      <span className={styles.conceptNumber}>{index + 1}</span>
                    </div>
                    <span className={styles.conceptName}>{concept.name}</span>
                    <div className={styles.conceptActions}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editConcept(concept.id)}
                        className={styles.conceptActionButton}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteConcept(concept.id)}
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
  );
};

export default ConceptList;
