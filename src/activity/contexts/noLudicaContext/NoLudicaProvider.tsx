import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { NoLudicaContext } from "./NoLudicaContext";
import type { NoLudicaContextType } from "./NoLudicaContext.type";
import { NoLudicaService } from "../../services/noLudica/NoLudicaService";
import type {
  NoLudicaConfig,
  NoLudicaInterface,
  TipoEntrega,
} from "../../types/NoLudica.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { makeData } from "../../utils/MakeData";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useToaster } from "../../../shared/hooks/useToaster";

interface NoLudicaProviderProps {
  children: ReactNode;
}

export const NoLudicaProvider: React.FC<NoLudicaProviderProps> = ({
  children,
}) => {
  const { configurationActivity } = useConfigurationActivity();
  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<"config" | "preview">(
    "config"
  );
  const [config, setConfig] = useState<NoLudicaConfig>({
    excercise: "",
    tipoEntrega: "ENTREGA",
  });
  const [errors, setErrors] = useState<string[]>([]);

  // Validación automática cuando cambia la configuración
  useEffect(() => {
    if (currentStep === "preview") {
      const validationErrors = validateConfig(config);
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
  }, [currentStep, config]);

  // Función para reiniciar todos los estados
  const resetAllStates = () => {
    setCurrentStep("config");
    setConfig({
      excercise: "",
      tipoEntrega: "ENTREGA",
    });
    setErrors([]);
  };

  // Determinar si el formulario es válido para envío
  const isFormValid = errors.length === 0 && config.excercise.trim().length > 0;

  const registrarNoLudica = async (data: NoLudicaInterface): Promise<void> => {
    setLoading(true);

    // console.log("=== NO LÚDICA DEBUG ===");
    // console.log("Datos del juego recibidos:", data);
    // console.log("Configuración de actividad:", configurationActivity);
    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity
    );
    // console.log("Payload final a enviar:", dataMandar);
    // console.log("=== FIN DEBUG ===");

    try {
      await NoLudicaService.registerNoLudicaApi(dataMandar);
    } catch (error) {
      console.error("Error al crear la actividad (no lúdica):", error);
      throw error;
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
        excercise: config.excercise.trim(),
        tipoEntrega: config.tipoEntrega,
      };

      await registrarNoLudica(gameData);
      showToast({
        title: "Actividad creada exitosamente",
        message: "La actividad ha sido creada exitosamente.",
        type: "success",
        position: "bottom-right",
      });
      navigate("/dashboard/teacher/actividades/list");
    } catch (error) {
      showToast({
        title: "Error al crear la actividad",
        message: "Hubo un error al crear la actividad",
        type: "error",
        position: "bottom-right",
      });
      console.error("Error al crear la actividad (no lúdica):", error);
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
          type: "info",
          position: "bottom-right",
        });
        resetAllStates();
      },
    });
  };

  // Funciones de utilidad
  const validateConfig = (configToValidate: NoLudicaConfig): string[] => {
    const validationErrors: string[] = [];

    // Validar consigna
    if (!configToValidate.excercise.trim()) {
      validationErrors.push("La consigna es obligatoria");
    } else if (configToValidate.excercise.length > 300) {
      validationErrors.push("La consigna no puede superar los 300 caracteres");
    } else if (configToValidate.excercise.length < 10) {
      validationErrors.push("La consigna debe tener al menos 10 caracteres");
    }

    // Validar tipo de entrega
    if (!configToValidate.tipoEntrega) {
      validationErrors.push("Debe seleccionar un tipo de entrega");
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
  // Opciones de tipo de entrega
  const getTipoEntregaOptions = () => [
    {
      value: "ENTREGA" as TipoEntrega,
      label: "Archivo",
      description: "Los estudiantes suben un archivo como respuesta",
      acceptedFormats: [".pdf", ".doc", ".docx", ".txt", ".jpg", ".png"],
    },
    {
      value: "ENLACE" as TipoEntrega,
      label: "Enlace Externo",
      description: "Los estudiantes comparten un enlace como respuesta",
      placeholder: "https://ejemplo.com/mi-trabajo",
    },
    {
      value: "TEXTO" as TipoEntrega,
      label: "Texto Plano",
      description:
        "Los estudiantes escriben su respuesta directamente en la plataforma",
      placeholder: "El estudiante escribirá su respuesta aquí...",
    },
  ];

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

    // Funciones específicas de noLudica
    getTipoEntregaOptions,
  };

  return (
    <NoLudicaContext.Provider value={contextValue}>
      {children}
    </NoLudicaContext.Provider>
  );
};
