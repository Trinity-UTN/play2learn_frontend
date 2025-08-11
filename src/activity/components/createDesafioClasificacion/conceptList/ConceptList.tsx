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
import Button from "../../../../shared/components/Button/ButtonComponent";
import Input from "../../../../shared/components/Input/InputComponent";
import styles from "./ConceptList.module.css";
import { useCreateDesafioClasificacion } from "../../../hooks/useDesafioClasificacion";
import type { ClassificationCategory } from "../../../types/DesafioClasificacion.type";
import ConfirmationModal from "../../../../shared/components/ConfirmationModal/ConfirmationModal";

type Props = {
  category: ClassificationCategory;
};
const ConceptList = ({ category }: Props) => {
  const [newConceptName, setNewConceptName] = useState("");
  const [editingConceptId, setEditingConceptId] = useState<string | null>(null);
  const [editConceptName, setEditConceptName] = useState("");
  const [showAddConcept, setShowAddConcept] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "warning" as "warning" | "danger",
    isOpen: false,
    showDoubleConfirmation: false,
    onConfirm: () => {},
  });
  const {
    handleAddConcept,
    handleEditConcept,
    handleDeleteConcept,
    getAllConcepts,
  } = useCreateDesafioClasificacion();
  const validateConceptName = (name: string): string => {
    if (!name.trim()) return "El nombre es requerido";
    if (name.length < 2) return "Mínimo 2 caracteres";
    if (name.length > 100) return "Máximo 100 caracteres";
    if (getAllConcepts().includes(name.toLowerCase().trim())) {
      return "Ya existe un concepto con este nombre";
    }
    return "";
  };
  const AddConcept = () => {
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
  const DeleteConcept = (conceptId: string) => {
    const concept = category.concepts.find((c) => c.id === conceptId);
    setAlertConfig({
      title: "Eliminar Concepto",
      message: `¿Está seguro que desea eliminar el concepto ${
        concept && concept.name
      }?`,
      type: "warning",
      isOpen: true,
      showDoubleConfirmation: false,
      onConfirm: () => {
        handleDeleteConcept(category.id, conceptId);
        setAlertConfig((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };
  return (
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
                    <span className={styles.conceptName}>{concept.name}</span>
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
    </div>
  );
};

export default ConceptList;
