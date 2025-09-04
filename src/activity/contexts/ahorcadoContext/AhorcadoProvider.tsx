import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AhorcadoContext } from "./AhorcadoContext";
import type { AhorcadoContextType } from "./AhorcadoContext.type";
import {
  AhorcadoService,
  type CreateAhorcadoPayload,
} from "../../services/ahorcado/AhorcadoService";
import type {
  AhorcadoInterface,
  AhorcadoConfig,
} from "../../types/Ahorcado.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { makeData } from "../../utils/MakeData";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import { useToaster } from "../../../shared/hooks/useToaster";

interface AhorcadoProviderProps {
  children: ReactNode;
}

export const AhorcadoProvider: React.FC<AhorcadoProviderProps> = ({
  children,
}) => {
  const { configurationActivity } = useConfigurationActivity();
  const { showConfirmation } = useConfirmation();
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  // Estados generales
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<"config" | "preview">(
    "config"
  );
  const [config, setConfig] = useState<AhorcadoConfig>({
    word: "",
    errorsPermited: "TRES",
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
    setLoading(false);
    setCurrentStep("config");
    setConfig({
      word: "",
      errorsPermited: "TRES",
    });
    setErrors([]);
  };

  const isFormValid = errors.length === 0 && config.word.trim().length > 0;

  const wordSuggestions = [
    "MATEMATICAS",
    "CIENCIA",
    "HISTORIA",
    "GEOGRAFIA",
    "LITERATURA",
    "QUIMICA",
    "FISICA",
    "BIOLOGIA",
    "ALGEBRA",
    "GEOMETRIA",
  ];

  // Funciones principales
  const registerAhorcado = async (data: AhorcadoInterface): Promise<void> => {
    setLoading(true);
    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity
    );

    try {
      await AhorcadoService.registerAhorcadoApi(
        dataMandar as CreateAhorcadoPayload
      );
      resetAllStates();
    } catch (error) {
      handleApiError(error, "Error al crear la actividad");
    } finally {
      setLoading(false);
    }
  };

  // Handlers principales
  const handleConfigSubmit = (newConfig: AhorcadoConfig) => {
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
      const gameData: AhorcadoInterface = {
        word: config.word.trim().toUpperCase(),
        errorsPermited: config.errorsPermited,
      };

      await registerAhorcado(gameData);
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
        resetAllStates();
      },
    });
  };

  // Funciones de utilidad
  const validateConfig = (configToValidate: AhorcadoConfig): string[] => {
    const validationErrors: string[] = [];

    // Validar palabra
    if (!configToValidate.word.trim()) {
      validationErrors.push("La palabra es obligatoria");
    } else if (configToValidate.word.length < 3) {
      validationErrors.push("La palabra debe tener al menos 3 caracteres");
    } else if (configToValidate.word.length > 50) {
      validationErrors.push("La palabra no puede superar los 50 caracteres");
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(configToValidate.word)) {
      validationErrors.push("La palabra solo puede contener letras");
    }

    // Validar dificultad
    if (!configToValidate.errorsPermited) {
      validationErrors.push("Debe seleccionar un nivel de dificultad");
    }

    return validationErrors;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "config":
        return "Configuración del Juego";
      case "preview":
        return "Vista Previa";
      default:
        return "Crear Actividad Ahorcado";
    }
  };

  const getCurrentStepNumber = () => (currentStep === "config" ? 1 : 2);

  const getStepDescription = () => {
    switch (currentStep) {
      case "config":
        return "Define la palabra a adivinar y el nivel de dificultad para tus estudiantes";
      case "preview":
        return "Así es como verán la actividad tus estudiantes";
      default:
        return "";
    }
  };

  // Funciones específicas de ahorcado
  const renderHangman = (errors: number) => {
    const parts = [
      "  +---+",
      "  |   |",
      errors >= 1 ? "  O   |" : "      |",
      errors >= 3 ? " /|\\  |" : errors >= 2 ? " /|   |" : "      |",
      errors >= 5 ? " / \\  |" : errors >= 4 ? " /    |" : "      |",
      "      |",
      "=========",
    ];
    return parts.join("\n");
  };

  const renderWordDisplay = (letters?: string[]) => {
    if (!config.word) return "_ _ _ _ _";

    const lettersToUse = letters || [];

    return config.word
      .split("")
      .map((letter) =>
        lettersToUse.includes(letter.toLowerCase()) ? letter : "_"
      )
      .join(" ");
  };

  const getDifficultyOptions = () => [
    {
      value: "CINCO",
      label: "Fácil",
      description:
        "Los estudiantes pueden cometer hasta 5 errores antes de perder",
      errors: "5",
    },
    {
      value: "TRES",
      label: "Difícil",
      description:
        "Los estudiantes pueden cometer hasta 3 errores antes de perder",
      errors: "3",
    },
  ];

  const contextValue: AhorcadoContextType = {
    // Estados principales
    loading,
    currentStep,
    config,
    errors,
    isFormValid,
    wordSuggestions,

    // Funciones principales
    registerAhorcado,

    // Handlers principales
    handleConfigSubmit,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,

    // Funciones de utilidad
    validateConfig,
    getStepTitle,
    getCurrentStepNumber,
    getStepDescription,

    // Funciones específicas de ahorcado
    getDifficultyOptions,
    renderHangman,
    renderWordDisplay,
  };

  return (
    <AhorcadoContext.Provider value={contextValue}>
      {children}
    </AhorcadoContext.Provider>
  );
};
