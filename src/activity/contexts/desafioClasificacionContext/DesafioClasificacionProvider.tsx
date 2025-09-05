import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { DesafioClasificacionContext } from "./DesafioClasificacionContext";
import type { ClasificacionContextType } from "./DesafioClasificacionContext.type";
import { DesafioClasificacionService } from "../../services/desafioClasificacion/DesafioClasificacionService";
import type {
  ClassificationCategory,
  CreateClassification,
  DesafioClasificacionConfig,
} from "../../types/DesafioClasificacion.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { makeData } from "../../utils/MakeData";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import { useToaster } from "../../../shared/hooks/useToaster";

interface DesafioClasificacionProviderProps {
  children: ReactNode;
}

export const DesafioClasificacionProvider: React.FC<
  DesafioClasificacionProviderProps
> = ({ children }) => {
  const { configurationActivity } = useConfigurationActivity();
  const { showConfirmation } = useConfirmation();
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  // Estados principales
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<"config" | "preview">(
    "config"
  );
  const [config, setConfig] = useState<DesafioClasificacionConfig>({
    categories: [],
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (currentStep === "preview") {
      const validationErrors = validateConfig(config);
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
  }, [currentStep, config]);

  // Funciones auxiliares del propio context
  const resetAllStates = () => {
    setCurrentStep("config");
    setConfig({
      categories: [],
    });
    setErrors([]);
  };

  const isFormValid = errors.length === 0 && config.categories.length >= 2;

  // Funciones principales
  const registrarDesafioClasificacion = async (
    data: CreateClassification
  ): Promise<void> => {
    setLoading(true);

    // console.log("=== DESAFIO CLASIFICACION DEBUG ===");
    // console.log("Datos del juego recibidos:", data);
    // console.log("Configuración de actividad:", configurationActivity);
    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity
    );
    // console.log("Payload final a enviar:", dataMandar);
    // console.log("=== FIN DEBUG ===");

    try {
      await DesafioClasificacionService.registerDesafioClasificacionApi(
        dataMandar
      );
    } catch (error) {
      handleApiError(error, "Error al crear la actividad");
    } finally {
      setLoading(false);
    }
  };

  // Handlers principales
  const handleConfigSubmit = (newConfig: DesafioClasificacionConfig) => {
    const validationErrors = validateConfig(newConfig);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setConfig(newConfig);
    setCurrentStep("preview");
    setErrors([]);
  };

  const handleSubmit = async () => {
    const finalValidationErrors = validateConfig(config);
    if (finalValidationErrors.length > 0) {
      setErrors(finalValidationErrors);
      return;
    }

    try {
      const gameData: CreateClassification = {
        categories: config.categories.map((category) => ({
          name: category.name,
          concepts: category.concepts.map((concept) => ({
            name: concept.name,
          })),
        })),
      };

      await registrarDesafioClasificacion(gameData);
      showToast({
        title: "Actividad creada exitosamente",
        message: "La actividad ha sido creada exitosamente.",
        type: "success",
        position: "bottom-right",
      });
      resetAllStates();
      navigate("/dashboard/teacher/actividades/list");
    } catch (error) {
      handleApiError(error, "Error al crear la actividad");
    }
  };

  const handleBack = () => {
    if (currentStep === "preview") {
      setCurrentStep("config");
    }
  };

  const handleNext = () => {
    if (currentStep === "config") {
      const validationErrors = validateConfig(config);

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        showToast({
          title: "Configuración incompleta",
          message: "Complete todos los campos requeridos antes de continuar.",
          type: "warning",
          position: "bottom-right",
        });
        return;
      }

      setCurrentStep("preview");
      setErrors([]);
    }
  };

  const handleReset = () => {
    showConfirmation({
      title: "Reiniciar Actividad",
      message: "¿Está seguro que desea reiniciar la creación de la actividad?",
      type: "warning",
      onConfirm: () => {
        showToast({
          title: "Actividad reiniciada",
          type: "success",
          position: "bottom-right",
        });
        resetAllStates();
      },
    });
  };

  // Funciones de utilidad
  const getStepTitle = () => {
    switch (currentStep) {
      case "config":
        return "Configuración de Actividad";
      case "preview":
        return "Vista Previa";
      default:
        return "Crear Actividad de Clasificación";
    }
  };

  const getCurrentStepNumber = () => (currentStep === "config" ? 1 : 2);

  const getStepDescription = () => {
    switch (currentStep) {
      case "config":
        return "Crea categorías y agrega conceptos que pertenezcan a cada una";
      case "preview":
        return "Revisa tu actividad antes de crearla";
      default:
        return "";
    }
  };

  // Función para validar la configuración
  const validateConfig = (
    configToValidate: DesafioClasificacionConfig
  ): string[] => {
    const validationErrors: string[] = [];

    // Validar número de categorías
    if (configToValidate.categories.length < 2) {
      validationErrors.push("Debe agregar al menos 2 categorías");
    } else if (configToValidate.categories.length > 10) {
      validationErrors.push("No puede tener más de 10 categorías");
    }

    // Validar categorías
    configToValidate.categories.forEach((category, index) => {
      if (!category.name.trim()) {
        validationErrors.push(`La categoría ${index + 1} debe tener un nombre`);
      } else if (category.name.length > 50) {
        validationErrors.push(
          `El nombre de la categoría ${
            index + 1
          } no puede superar los 50 caracteres`
        );
      }

      if (category.concepts.length < 1) {
        validationErrors.push(
          `La categoría "${category.name}" debe tener al menos 1 concepto`
        );
      } else if (category.concepts.length > 10) {
        validationErrors.push(
          `La categoría "${category.name}" no puede tener más de 10 conceptos`
        );
      }

      // Validar conceptos
      category.concepts.forEach((concept, conceptIndex) => {
        if (!concept.name.trim()) {
          validationErrors.push(
            `El concepto ${conceptIndex + 1} de la categoría "${
              category.name
            }" debe tener un nombre`
          );
        } else if (concept.name.length > 100) {
          validationErrors.push(
            `El concepto "${concept.name}" no puede superar los 100 caracteres`
          );
        }
      });
    });

    return validationErrors;
  };

  // Funciones auxiliares para manejo de categorías
  const categoryColors = ["var(--color-primary)", "var(--color-secondary)"];

  const getAllConcepts = useCallback(() => {
    return config.categories.flatMap((category) =>
      category.concepts.map((concept) => concept.name.toLowerCase())
    );
  }, [config.categories]);

  const getCategoryNames = useCallback(() => {
    return config.categories.map((category) => category.name.toLowerCase());
  }, [config.categories]);

  const handleAddCategory = useCallback(
    (name: string) => {
      const newCategory: ClassificationCategory = {
        id: `category-${Date.now()}`,
        name,
        concepts: [],
        color: categoryColors[config.categories.length % categoryColors.length],
      };
      setConfig((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory],
      }));
    },
    [config.categories.length, categoryColors]
  );

  const handleEditCategory = useCallback(
    (categoryId: string, newName: string) => {
      setConfig((prev) => ({
        ...prev,
        categories: prev.categories.map((category) =>
          category.id === categoryId ? { ...category, name: newName } : category
        ),
      }));
    },
    []
  );

  const handleDeleteCategory = useCallback((categoryId: string) => {
    setConfig((prev) => ({
      ...prev,
      categories: prev.categories.filter(
        (category) => category.id !== categoryId
      ),
    }));
  }, []);

  const handleAddConcept = useCallback(
    (categoryId: string, conceptName: string) => {
      setConfig((prev) => ({
        ...prev,
        categories: prev.categories.map((category) =>
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
        ),
      }));
    },
    []
  );

  const handleEditConcept = useCallback(
    (categoryId: string, conceptId: string, newName: string) => {
      setConfig((prev) => ({
        ...prev,
        categories: prev.categories.map((category) =>
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
        ),
      }));
    },
    []
  );

  const handleDeleteConcept = useCallback(
    (categoryId: string, conceptId: string) => {
      setConfig((prev) => ({
        ...prev,
        categories: prev.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                concepts: category.concepts.filter(
                  (concept) => concept.id !== conceptId
                ),
              }
            : category
        ),
      }));
    },
    []
  );

  const contextValue: ClasificacionContextType = {
    // Estados principales
    loading,
    currentStep,
    config,
    errors,
    isFormValid,
    categories: config.categories,

    // Funciones principales
    registrarDesafioClasificacion,

    // Handlers principales
    handleConfigSubmit,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,

    // Funciones de utilidad
    getStepTitle,
    getCurrentStepNumber,
    getStepDescription,
    validateConfig,

    // Funciones auxiliares para categorías
    getAllConcepts,
    getCategoryNames,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleAddConcept,
    handleEditConcept,
    handleDeleteConcept,
  };

  return (
    <DesafioClasificacionContext.Provider value={contextValue}>
      {children}
    </DesafioClasificacionContext.Provider>
  );
};
