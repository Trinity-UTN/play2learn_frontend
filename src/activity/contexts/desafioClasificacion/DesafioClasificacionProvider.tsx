import { useCallback, useState, type ReactNode } from "react";
import type { ClasificacionContextType } from "./DesafioClasificacionContext.type";
import { DesafioClasificacionContext } from "./DesafioClasificacionContext";
import type {
  ClassificationCategory,
  CreateClassification,
} from "../../types/DesafioClasificacion.type";
import { makeData } from "../../utils/MakeData";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
interface DesafioClasificacionProviderProps {
  children: ReactNode;
}

export const DesafioClasificacionProvider: React.FC<
  DesafioClasificacionProviderProps
> = ({ children }) => {
  const [categories, setCategories] = useState<ClassificationCategory[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { configurationActivity } = useConfigurationActivity();

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

  //Devuelve todos los conceptos en minuscula
  const getAllConcepts = useCallback(() => {
    return categories.flatMap((category) =>
      category.concepts.map((concept) => concept.name.toLowerCase())
    );
  }, [categories]);
  //Devuelve todos las categorias en minuscula
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

  const validations = () => {
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
  };

  const payloadCategories = () => {
    let payload: CreateClassification = {
      attempts,
      maxTimePerQuestionInSeconds: 15, //DEBUG
      categories: categories.map((category) => ({
        name: category.name,
        concepts: category.concepts.map((concept) => ({
          name: concept.name,
        })),
      })),
    };
    if (configurationActivity) {
      payload = makeData(payload, configurationActivity);
    }
    return payload;
  };
  const resetForm = () => {
    // Reset form
    //   setCategories([]);
    //   setAttempts(3);
    //   setShowPreview(false);
  };

  const handleSubmit = async () => {
    validations();
    setIsSubmitting(true);
    try {
      const payload = payloadCategories();
      console.log("Enviando clasificación:", payload);
      alert("¡Actividad de clasificación creada exitosamente!");
      resetForm();
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

  const contextValue: ClasificacionContextType = {
    //Estados
    categories,
    attempts,
    showPreview,
    isSubmitting,
    canSubmit,
    totalConcepts,
    //Setters
    setCategories,
    setAttempts,
    setShowPreview,
    //Gets
    getAllConcepts,
    getCategoryNames,
    //Acciones
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleAddConcept,
    handleEditConcept,
    handleDeleteConcept,
    //Envio
    handleSubmit,
  };

  return (
    <DesafioClasificacionContext.Provider value={contextValue}>
      {children}
    </DesafioClasificacionContext.Provider>
  );
};
