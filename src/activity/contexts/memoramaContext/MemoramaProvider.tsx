import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { MemoramaContext } from "./MemoramaContext";
import type { MemoramaContextType } from "./MemoramaContext.type";
import { MemoramaService } from "../../services/memorama/MemoramaService";
import type {
  MemoramaPair,
  MemoramaConfig,
  MemoramaInterface,
} from "../../types/Memorama.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { makeFormData } from "../../utils/MakeData";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useToaster } from "../../../shared/hooks/useToaster";

interface MemoramaProviderProps {
  children: ReactNode;
}

export const MemoramaProvider: React.FC<MemoramaProviderProps> = ({
  children,
}) => {
  const { configurationActivity } = useConfigurationActivity();
  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<
    "config" | "pairs" | "preview"
  >("config");
  const [config, setConfig] = useState<MemoramaConfig>({
    totalPairs: 4,
  });
  const [pairs, setPairs] = useState<MemoramaPair[]>([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [pairErrors, setPairErrorsState] = useState<{
    [pairIndex: number]: { [field: string]: string };
  }>({});

  // Validación del formulario cuando cambiamos al paso de preview
  useEffect(() => {
    if (currentStep === "preview") {
      const validationErrors = validateAllPairs();
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
  }, [currentStep, pairs]);

  // Función para reiniciar todos los estados
  const resetAllStates = () => {
    setConfig({ totalPairs: 4 });
    setPairs([]);
    setCurrentStep("config");
    setCurrentPairIndex(0);
    setErrors([]);
    setPairErrorsState({});
  };

  // Función para determinar el estado de una pareja
  const getPairStatus = (
    pair: MemoramaPair
  ): "complete" | "incomplete" | "empty" => {
    if (!pair.concept.trim() && !pair.image) {
      return "empty";
    }

    const hasConcept = pair.concept.trim() && pair.concept.length <= 50;
    const hasImage = pair.image !== null;

    if (hasConcept && hasImage) {
      return "complete";
    }
    return "incomplete";
  };

  // Función para validar todas las parejas
  const validateAllPairs = (): string[] => {
    const validationErrors: string[] = [];

    if (pairs.length < 4) {
      validationErrors.push("Debe crear al menos 4 parejas");
    }

    if (pairs.length > 8) {
      validationErrors.push("No puede crear más de 8 parejas");
    }

    pairs.forEach((pair, index) => {
      const status = getPairStatus(pair);
      if (status === "empty") {
        validationErrors.push(`La pareja ${index + 1} está vacía`);
      } else if (status === "incomplete") {
        if (!pair.concept.trim()) {
          validationErrors.push(
            `La pareja ${index + 1} debe tener un concepto`
          );
        } else if (pair.concept.length > 50) {
          validationErrors.push(
            `El concepto de la pareja ${
              index + 1
            } no puede tener más de 50 caracteres`
          );
        }

        const conceptPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (pair.concept.trim() && !conceptPattern.test(pair.concept)) {
          validationErrors.push(
            `El concepto de la pareja ${
              index + 1
            } solo puede contener letras y espacios`
          );
        }

        if (!pair.image) {
          validationErrors.push(`La pareja ${index + 1} debe tener una imagen`);
        }
      }
    });

    return validationErrors;
  };

  // Función para verificar si todas las parejas están completas
  const areAllPairsComplete = (): boolean => {
    return pairs.every((pair) => getPairStatus(pair) === "complete");
  };

  // Determinar si el formulario es válido para envío
  const isFormValid = errors.length === 0 && areAllPairsComplete();

  const registrarMemorama = async (data: MemoramaInterface): Promise<void> => {
    setLoading(true);

    // console.log("=== MEMORAMA DEBUG ===");
    // console.log("Datos del memorama recibidos:", data);
    // console.log("Configuración de actividad:", configurationActivity);
    const dataMandar = makeFormData(
      data,
      configurationActivity as ConfigurationActivity
    );
    // console.log("Payload final a enviar:", dataMandar); // Descomentar para debug
    // console.log("=== FIN DEBUG ==="); // Descomentar para debug

    try {
      await MemoramaService.registerMemoramaApi(dataMandar);
      clearAllPairErrors();
    } catch (error) {
      console.error("Error al crear la actividad (memorama):", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handlers principales
  const handleConfigSubmit = (newConfig: MemoramaConfig) => {
    const limitedConfig = {
      ...newConfig,
      totalPairs: Math.min(newConfig.totalPairs, 8),
    };

    setConfig(limitedConfig);
    const emptyPairs: MemoramaPair[] = Array(limitedConfig.totalPairs)
      .fill(null)
      .map(() => ({
        concept: "",
        image: null,
      }));
    setPairs(emptyPairs);
    setCurrentStep("pairs");
    setCurrentPairIndex(0);
  };

  const handlePairSave = (pairData: MemoramaPair) => {
    const updatedPairs = [...pairs];
    updatedPairs[currentPairIndex] = pairData;
    setPairs(updatedPairs);
  };

  const handleNextPair = () => {
    if (currentPairIndex < pairs.length - 1) {
      setCurrentPairIndex(currentPairIndex + 1);
    } else {
      if (!areAllPairsComplete()) {
        const incompletePairs = pairs
          .map((pair, index) => ({
            index,
            status: getPairStatus(pair),
          }))
          .filter((item) => item.status !== "complete");

        const incompleteNumbers = incompletePairs
          .map((item) => item.index + 1)
          .join(", ");

        showToast({
          title: "Parejas incompletas",
          message: `Debes completar todas las parejas antes de continuar. Parejas incompletas o vacías: ${incompleteNumbers}`,
          type: "warning",
          position: "top-center",
        });
        return;
      }
      setCurrentStep("preview");
    }
  };

  const handlePreviousPair = () => {
    if (currentPairIndex > 0) {
      setCurrentPairIndex(currentPairIndex - 1);
    }
  };

  const handleGoToPair = (index: number) => {
    setCurrentPairIndex(index);
  };

  const handleDeletePair = (index: number) => {
    if (pairs.length > 4) {
      const updatedPairs = pairs.filter((_, i) => i !== index);
      setPairs(updatedPairs);
      setConfig((prev) => ({
        ...prev,
        totalPairs: prev.totalPairs - 1,
      }));
      if (currentPairIndex >= updatedPairs.length) {
        setCurrentPairIndex(updatedPairs.length - 1);
      }
    }
  };

  const handleSubmit = async () => {
    const finalValidationErrors = validateAllPairs();
    if (finalValidationErrors.length > 0) {
      setErrors(finalValidationErrors);
      return;
    }

    try {
      const gameData: MemoramaInterface = {
        concepts: pairs.map((pair) => pair.concept),
        images: pairs.map((pair) => pair.image!).filter(Boolean),
      };

      await registrarMemorama(gameData);
      showToast({
        title: "Actividad creada exitosamente",
        message: "La actividad ha sido creada exitosamente.",
        type: "success",
        position: "bottom-right",
      });
      resetAllStates();
      navigate("/dashboard/teacher/actividades/list");
    } catch (error) {
      showToast({
        title: "Error al crear la actividad",
        message: "Hubo un error al crear la actividad",
        type: "error",
        position: "bottom-right",
      });
      console.error("Error al crear la actividad (memorama):", error);
    }
  };

  const handleBack = () => {
    if (currentStep === "preview") {
      setCurrentStep("pairs");
    } else if (currentStep === "pairs") {
      setCurrentStep("config");
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
          type: "info",
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
        return "Configuración del Memorama";
      case "pairs":
        return `Pareja ${currentPairIndex + 1} de ${config.totalPairs}`;
      case "preview":
        return "Vista Previa";
      default:
        return "Crear Actividad";
    }
  };

  const getCompletedPairs = () => {
    return pairs.filter((pair) => getPairStatus(pair) === "complete").length;
  };

  const getIncompletePairs = () => {
    return pairs.filter((pair) => getPairStatus(pair) === "incomplete").length;
  };

  const getEmptyPairs = () => {
    return pairs.filter((pair) => getPairStatus(pair) === "empty").length;
  };

  const setPairErrors = (
    pairIndex: number,
    errors: { [field: string]: string }
  ) => {
    setPairErrorsState((prev) => ({
      ...prev,
      [pairIndex]: errors,
    }));
  };

  const clearPairErrors = (pairIndex: number) => {
    setPairErrorsState((prev) => {
      const newErrors = { ...prev };
      delete newErrors[pairIndex];
      return newErrors;
    });
  };

  const clearAllPairErrors = () => {
    setPairErrorsState({});
  };

  const contextValue: MemoramaContextType = {
    // Estados principales
    loading,
    currentStep,
    config,
    pairs,
    currentPairIndex,
    errors,
    pairErrors,
    isFormValid,

    // Funciones principales
    registrarMemorama,

    // Handlers principales
    handleConfigSubmit,
    handlePairSave,
    handleNextPair,
    handlePreviousPair,
    handleGoToPair,
    handleDeletePair,
    handleSubmit,
    handleBack,
    handleReset,

    // Funciones de utilidad
    getPairStatus,
    getStepTitle,
    getCompletedPairs,
    getIncompletePairs,
    getEmptyPairs,
    setPairErrors,
    clearPairErrors,
    clearAllPairErrors,
  };

  return (
    <MemoramaContext.Provider value={contextValue}>
      {children}
    </MemoramaContext.Provider>
  );
};
