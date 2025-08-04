import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaLayerGroup,
  FaEye,
  FaEyeSlash,
  FaPaperPlane,
  FaPlus,
} from "react-icons/fa";
import type {
  ClassificationCategory,
  CreateClassificationPayload,
} from "../../types/DesafioClasificacion.type";
import Button from "../../../shared/components/Button/ButtonComponent";
import Card from "../../../shared/components/Card/CardComponent";
import CategoryForm from "../../components/createDesafioClasificacion/categoriaForm/CategoriaForm";
import CategoryList from "../../components/createDesafioClasificacion/categoriaList/CategoriaList";
import ClassificationPreview from "../../components/createDesafioClasificacion/clasificacionPreview/ClasificacionPreview";
import styles from "./CreateDesafioClasificacion.module.css";

const CreateDesafioClasificacionView = () => {
  const [categories, setCategories] = useState<ClassificationCategory[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryColors = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#6366F1",
  ];

  const getAllConcepts = useCallback(() => {
    return categories.flatMap((category) =>
      category.concepts.map((concept) => concept.name.toLowerCase())
    );
  }, [categories]);

  const getCategoryNames = useCallback(() => {
    return categories.map((category) => category.name.toLowerCase());
  }, [categories]);

  const handleAddCategory = useCallback(
    (name: string) => {
      const newCategory: ClassificationCategory = {
        id: `category-${Date.now()}`,
        name,
        concepts: [],
        color: categoryColors[categories.length % categoryColors.length],
      };
      setCategories((prev) => [...prev, newCategory]);
    },
    [categories.length, categoryColors]
  );

  const handleEditCategory = useCallback(
    (categoryId: string, newName: string) => {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryId ? { ...category, name: newName } : category
        )
      );
    },
    []
  );

  const handleDeleteCategory = useCallback((categoryId: string) => {
    setCategories((prev) =>
      prev.filter((category) => category.id !== categoryId)
    );
  }, []);

  const handleAddConcept = useCallback(
    (categoryId: string, conceptName: string) => {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                concepts: [
                  ...category.concepts,
                  {
                    id: `concept-${Date.now()}`,
                    name: conceptName,
                    categoryId,
                  },
                ],
              }
            : category
        )
      );
    },
    []
  );

  const handleEditConcept = useCallback(
    (categoryId: string, conceptId: string, newName: string) => {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                concepts: category.concepts.map((concept) =>
                  concept.id === conceptId
                    ? { ...concept, name: newName }
                    : concept
                ),
              }
            : category
        )
      );
    },
    []
  );

  const handleDeleteConcept = useCallback(
    (categoryId: string, conceptId: string) => {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                concepts: category.concepts.filter(
                  (concept) => concept.id !== conceptId
                ),
              }
            : category
        )
      );
    },
    []
  );

  const handleSubmit = async () => {
    if (categories.length < 2) {
      alert("Debe agregar al menos 2 categorías");
      return;
    }

    const hasEmptyCategories = categories.some(
      (category) => category.concepts.length === 0
    );
    if (hasEmptyCategories) {
      alert("Todas las categorías deben tener al menos un concepto");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: CreateClassificationPayload = {
        attempts,
        maxTimePerQuestionInSeconds: 15, //DEBUG
        categories: categories.map((category) => ({
          id: category.id,
          name: category.name,
          concepts: category.concepts.map((concept) => ({
            name: concept.name,
            categoryId: concept.categoryId,
          })),
        })),
      };

      const formData = new FormData();
      formData.append("classificationData", JSON.stringify(payload));

      console.log("Enviando clasificación:", payload);

      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("¡Actividad de clasificación creada exitosamente!");

      // Reset form
      setCategories([]);
      setAttempts(3);
      setShowPreview(false);
    } catch (error) {
      console.error("Error al crear clasificación:", error);
      alert("Error al crear la actividad. Intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    categories.length >= 2 &&
    categories.every((category) => category.concepts.length > 0) &&
    !isSubmitting;

  const totalConcepts = categories.reduce(
    (total, category) => total + category.concepts.length,
    0
  );

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.header}
      >
        <div className={styles.titleSection}>
          <FaLayerGroup className={styles.titleIcon} />
          <div>
            <h1 className={styles.title}>Crear Actividad de Clasificación</h1>
            <p className={styles.subtitle}>
              Crea una actividad donde los estudiantes clasifiquen conceptos en
              categorías
            </p>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{categories.length}</span>
            <span className={styles.statLabel}>Categorías</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{totalConcepts}</span>
            <span className={styles.statLabel}>Conceptos</span>
          </div>
        </div>
      </motion.div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className={styles.formCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  <FaPlus className={styles.cardIcon} />
                  Agregar Categoría
                </h2>
                <p className={styles.cardDescription}>
                  Crea categorías y agrega conceptos que pertenezcan a cada una
                </p>
              </div>

              <CategoryForm
                onAddCategory={handleAddCategory}
                existingNames={getCategoryNames()}
                maxCategories={10}
                currentCount={categories.length}
              />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CategoryList
              categories={categories}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
              onAddConcept={handleAddConcept}
              onEditConcept={handleEditConcept}
              onDeleteConcept={handleDeleteConcept}
              existingConcepts={getAllConcepts()}
              existingCategoryNames={getCategoryNames()}
            />
          </motion.div>
        </div>

        <div className={styles.sidebar}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.sidebarContent}
          >
            <Card className={styles.configCard}>
              <h3 className={styles.configTitle}>Configuración</h3>

              <div className={styles.configSection}>
                <label className={styles.configLabel}>Número de intentos</label>
                <select
                  value={attempts}
                  onChange={(e) => setAttempts(Number(e.target.value))}
                  className={styles.configSelect}
                >
                  <option value={1}>1 intento</option>
                  <option value={2}>2 intentos</option>
                  <option value={3}>3 intentos</option>
                  <option value={4}>4 intentos</option>
                  <option value={5}>5 intentos</option>
                </select>
              </div>

              <div className={styles.configSection}>
                <Button
                  variant={showPreview ? "secondary" : "primary"}
                  fullWidth
                  onClick={() => setShowPreview(!showPreview)}
                  disabled={categories.length === 0}
                >
                  {showPreview ? <FaEyeSlash /> : <FaEye />}
                  {showPreview ? "Ocultar Vista Previa" : "Ver Vista Previa"}
                </Button>
              </div>

              <div className={styles.configSection}>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  <FaPaperPlane />
                  {isSubmitting ? "Creando..." : "Crear Actividad"}
                </Button>
              </div>

              <div className={styles.requirements}>
                <h4 className={styles.requirementsTitle}>Requisitos:</h4>
                <ul className={styles.requirementsList}>
                  <li
                    className={
                      categories.length >= 2 ? styles.fulfilled : styles.pending
                    }
                  >
                    Mínimo 2 categorías ({categories.length}/2)
                  </li>
                  <li
                    className={
                      categories.every((cat) => cat.concepts.length > 0)
                        ? styles.fulfilled
                        : styles.pending
                    }
                  >
                    Cada categoría debe tener conceptos
                  </li>
                  <li
                    className={
                      categories.length <= 10
                        ? styles.fulfilled
                        : styles.pending
                    }
                  >
                    Máximo 10 categorías ({categories.length}/10)
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {showPreview && categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.previewSection}
        >
          <ClassificationPreview
            categories={categories}
            attempts={attempts}
            onClose={() => setShowPreview(false)}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CreateDesafioClasificacionView;
