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
import { useConfigurationForm } from "../../hooks/configuration/useConfigurationForm";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import { useToaster } from "../../../shared/hooks/useToaster";

interface MemoramaProviderProps {
  children: ReactNode;
}

export const MemoramaProvider: React.FC<MemoramaProviderProps> = ({
  children,
}) => {
  const { configurationActivity } = useConfigurationActivity();
  const { resetForm } = useConfigurationForm("memorama");
  const { showConfirmation } = useConfirmation();
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  // Estados generales
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

  useEffect(() => {
    if (currentStep === "preview") {
      const validationErrors = validateAllPairs();
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
  }, [currentStep, pairs]);

  // Funciones auxiliares del propio context
  const resetStatesOnly = () => {
    setConfig({ totalPairs: 4 });
    setPairs([]);
    setCurrentStep("config");
    setCurrentPairIndex(0);
    setErrors([]);
    setPairErrorsState({});
  };

  const resetAllStates = () => {
    resetStatesOnly();
    resetForm();
  };

  const getPairStatus = (
    pair: MemoramaPair,
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
            `La pareja ${index + 1} debe tener un concepto`,
          );
        } else if (pair.concept.length > 50) {
          validationErrors.push(
            `El concepto de la pareja ${
              index + 1
            } no puede tener más de 50 caracteres`,
          );
        }

        const conceptPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (pair.concept.trim() && !conceptPattern.test(pair.concept)) {
          validationErrors.push(
            `El concepto de la pareja ${
              index + 1
            } solo puede contener letras y espacios`,
          );
        }

        if (!pair.image) {
          validationErrors.push(`La pareja ${index + 1} debe tener una imagen`);
        }
      }
    });

    return validationErrors;
  };

  const areAllPairsComplete = (): boolean => {
    return pairs.every((pair) => getPairStatus(pair) === "complete");
  };

  const isFormValid = errors.length === 0 && areAllPairsComplete();

  const registrarMemorama = async (
    data: MemoramaInterface,
  ): Promise<boolean> => {
    setLoading(true);

    // console.log("=== MEMORAMA DEBUG ===");
    // console.log("Datos del memorama recibidos:", data);
    // console.log("Configuración de actividad:", configurationActivity);
    const dataMandar = makeFormData(
      data,
      configurationActivity as ConfigurationActivity,
    );
    // console.log("Payload final a enviar:", dataMandar); // Descomentar para debug
    // console.log("=== FIN DEBUG ==="); // Descomentar para debug

    try {
      await MemoramaService.registerMemoramaApi(dataMandar);
      showToast({
        title: "Actividad creada exitosamente",
        message: "La actividad ha sido creada exitosamente.",
        type: "success",
        position: "bottom-right",
      });
      clearAllPairErrors();
      return true;
    } catch (error) {
      handleApiError(error, "Error al crear la actividad");
      return false;
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

      const created = await registrarMemorama(gameData);
      if (!created) return;

      resetAllStates();
      navigate("/dashboard/teacher/actividades/list");
    } catch (error) {
      handleApiError(error, "Error al crear la actividad");
    }
  };

  const handleBack = () => {
    if (currentStep === "preview") {
      setCurrentStep("pairs");
    } else if (currentStep === "pairs") {
      showConfirmation({
        title: "Ir a la configuración",
        message:
          "¿Está seguro que desea ir a la configuración de la actividad? Se perderán los cambios realizados.",
        type: "danger",
        showDoubleConfirmation: true,
        onConfirm: () => {
          setPairs([]);
          setCurrentStep("config");
        },
      });
    }
  };

  const handleNext = () => {
    if (currentStep === "config") {
      const configForm = document.querySelector("form");
      if (configForm) {
        configForm.requestSubmit();
      }
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
        resetStatesOnly();
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

  const getCurrentStepNumber = () => {
    if (currentStep === "config") return 1;
    if (currentStep === "pairs") return 2;
    return 3;
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "config":
        return "Define la cantidad de parejas que tendrá el memorama.";
      case "pairs":
        return "Agrega las parejas que deseas para el memorama.";
      case "preview":
        return "Así es como verán la actividad tus estudiantes.";
      default:
        return "";
    }
  };

  // Handlers específicos de memorama
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

  const handleAddPair = () => {
    const updatedPairs = [...pairs, { concept: "", image: null }];
    setConfig((prev) => ({
      ...prev,
      totalPairs: prev.totalPairs + 1,
    }));
    setPairs(updatedPairs);
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

  // Funciones específicas de memorama
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
    errors: { [field: string]: string },
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
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,

    // Funciones de utilidad
    getPairStatus,
    getStepTitle,
    getCurrentStepNumber,
    getStepDescription,

    // Handlers específicos de memorama
    handlePairSave,
    handleNextPair,
    handlePreviousPair,
    handleGoToPair,
    handleAddPair,
    handleDeletePair,

    // Funciones específicas de memorama
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
