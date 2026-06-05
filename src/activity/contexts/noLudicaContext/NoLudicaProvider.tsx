import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { NoLudicaContext } from "./NoLudicaContext";
import type { NoLudicaContextType } from "./NoLudicaContext.type";
import { NoLudicaService } from "../../services/noLudica/NoLudicaService";
import type {
  NoLudicaConfig,
  NoLudicaInterface,
} from "../../types/NoLudica.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { makeData } from "../../utils/MakeData";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { useConfigurationForm } from "../../hooks/configuration/useConfigurationForm";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import { useToaster } from "../../../shared/hooks/useToaster";
import { useActividadCreada } from "@/activity/hooks/useActividadCreada";
import { GameType } from "@/shared";
import { useGameConfigEffect } from "@/activity/hooks/useGameConfigEffect";

interface NoLudicaProviderProps {
  children: ReactNode;
}

export const NoLudicaProvider: React.FC<NoLudicaProviderProps> = ({
  children,
}) => {
  const { configurationActivity } = useConfigurationActivity();
  const { actividadCreada } = useActividadCreada();

  const { resetForm } = useConfigurationForm("no_ludica");
  const { showConfirmation } = useConfirmation();
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  // Estados generales
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<"config" | "preview">(
    "config",
  );
  const [config, setConfig] = useState<NoLudicaConfig>({
    exercise: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  useGameConfigEffect({
    actividadCreada,
    handlers: {
      [GameType.NO_LUDICA]: (config: NoLudicaConfig) => {
        setConfig({
          exercise: config.exercise,
        });
      },
    },
  });

  useEffect(() => {
    if (currentStep === "preview") {
      const validationErrors = validateConfig(config);
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
  }, [currentStep, config]);

  // Funciones auxiliares del propio context
  const resetStatesOnly = () => {
    setCurrentStep("config");
    setConfig({
      exercise: "",
    });
    setErrors([]);
  };

  const resetAllStates = () => {
    resetStatesOnly();
    resetForm();
  };

  const isFormValid = errors.length === 0 && config.exercise.trim().length > 0;

  const registrarNoLudica = async (data: NoLudicaInterface): Promise<void> => {
    setLoading(true);

    // console.log("=== NO LÚDICA DEBUG ===");
    // console.log("Datos del juego recibidos:", data);
    // console.log("Configuración de actividad:", configurationActivity);
    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity,
    );
    // console.log("Payload final a enviar:", dataMandar);
    // console.log("=== FIN DEBUG ===");

    try {
      await NoLudicaService.registerNoLudicaApi(dataMandar);
      showToast({
        title: "Actividad creada exitosamente",
        message: "La actividad ha sido creada exitosamente.",
        type: "success",
        position: "bottom-right",
      });
    } catch (error) {
      handleApiError(error, "Error al crear la actividad");
    } finally {
      setLoading(false);
    }
  };

  // Handlers principales
  const handleConfigSubmit = (newConfig: NoLudicaConfig) => {
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
      const gameData: NoLudicaInterface = {
        exercise: config.exercise.trim(),
      };

      await registrarNoLudica(gameData);
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
        resetStatesOnly();
      },
    });
  };

  // Funciones de utilidad
  const validateConfig = (configToValidate: NoLudicaConfig): string[] => {
    const validationErrors: string[] = [];

    // Validar consigna
    if (!configToValidate.exercise.trim()) {
      validationErrors.push("La consigna es obligatoria");
    } else if (configToValidate.exercise.length > 300) {
      validationErrors.push("La consigna no puede superar los 300 caracteres");
    } else if (configToValidate.exercise.length < 10) {
      validationErrors.push("La consigna debe tener al menos 10 caracteres");
    }

    return validationErrors;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "config":
        return "Configuración de la Actividad";
      case "preview":
        return "Vista Previa";
      default:
        return "Crear Actividad No Lúdica";
    }
  };

  const getCurrentStepNumber = () => (currentStep === "config" ? 1 : 2);

  const getStepDescription = () => {
    switch (currentStep) {
      case "config":
        return "Describe la consigna que deben cumplir los estudiantes.";
      case "preview":
        return "Así es como verán la actividad tus estudiantes";
      default:
        return "";
    }
  };

  const contextValue: NoLudicaContextType = {
    // Estados principales
    loading,
    currentStep,
    config,
    errors,
    isFormValid,

    // Funciones principales
    registrarNoLudica,

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
  };

  return (
    <NoLudicaContext.Provider value={contextValue}>
      {children}
    </NoLudicaContext.Provider>
  );
};
