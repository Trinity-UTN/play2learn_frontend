import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { OrdenarSecuenciaContextType } from "./OrdenarSecuenciaContext.type";
import { OrdenarSecuenciaContext } from "./OrdenarSecuenciaContext";
import type {
  CreateSequencePayload,
  EventPayload,
  SequenceEvent,
  OrdenarSecuenciaConfig,
} from "../../types/OrdenarSecuencia.type";
import { useToaster } from "../../../shared/hooks/useToaster";
import { OrdenarSecuenciaService } from "../../services/ordenarSecuencia/OrdenarSecuenciaService";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";

interface OrdenarSecuenciaProviderProps {
  children: ReactNode;
}

export const OrdenarSecuenciaProvider: React.FC<
  OrdenarSecuenciaProviderProps
> = ({ children }) => {
  const { showToast } = useToaster();
  const { showConfirmation } = useConfirmation();
  const { configurationActivity } = useConfigurationActivity();
  const navigate = useNavigate();

  // Estados generales
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<
    "config" | "sequence" | "preview"
  >("config");
  const [config, setConfig] = useState<OrdenarSecuenciaConfig>({
    cantEvents: 5,
  });
  const [events, setEvents] = useState<SequenceEvent[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [eventImages, setEventImages] = useState<(File | null)[]>([]);

  useEffect(() => {
    if (currentStep === "preview") {
      const validationErrors = validateAllEvents();
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
  }, [currentStep, events]);

  // Función para reiniciar todos los estados
  const resetAllStates = () => {
    setCurrentStep("config");
    setConfig({ cantEvents: 5 });
    setEvents([]);
    setErrors([]);
    setEventImages([]);
  };

  const validateAllEvents = (): string[] => {
    const validationErrors: string[] = [];

    if (events.length < 2) {
      validationErrors.push(
        "Debe agregar al menos 2 eventos para crear la secuencia"
      );
    }

    events.forEach((event, index) => {
      if (!event.name.trim()) {
        validationErrors.push(`El evento ${index + 1} debe tener un nombre`);
      } else if (event.name.length > 50) {
        validationErrors.push(
          `El nombre del evento ${index + 1} no puede superar los 50 caracteres`
        );
      }

      if (!event.description.trim()) {
        validationErrors.push(
          `El evento ${index + 1} debe tener una descripción`
        );
      } else if (event.description.length > 100) {
        validationErrors.push(
          `La descripción del evento ${
            index + 1
          } no puede superar los 100 caracteres`
        );
      }
    });

    return validationErrors;
  };

  const getCompletedEvents = (): number => {
    return events.filter(
      (event) =>
        event.name.trim() &&
        event.description.trim() &&
        event.name.length <= 50 &&
        event.description.length <= 100
    ).length;
  };

  const getIncompleteEvents = (): number => {
    return events.length - getCompletedEvents();
  };

  const isFormValid =
    currentStep === "config"
      ? true
      : errors.length === 0 &&
        events.length >= config.cantEvents &&
        getIncompleteEvents() === 0;

  const registrarOrdenarSecuencia = async (
    formData: FormData
  ): Promise<void> => {
    setLoading(true);
    try {
      await OrdenarSecuenciaService.registerOrdenarSecuenciaApi(formData);
    } catch (error) {
      console.error("Error al crear la actividad (ordenar secuencia):", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleConfigSubmit = (newConfig: OrdenarSecuenciaConfig) => {
    setConfig(newConfig);
    // Initialize empty events array based on config
    const emptyEvents: SequenceEvent[] = [];
    setEvents(emptyEvents);
    setEventImages([]);
    setCurrentStep("sequence");
  };

  const handleBack = () => {
    if (currentStep === "preview") {
      setCurrentStep("sequence");
    } else if (currentStep === "sequence") {
      setCurrentStep("config");
    }
  };

  const handleNext = () => {
    if (currentStep === "config") {
      const configForm = document.querySelector("form");
      if (configForm) {
        configForm.requestSubmit();
      }
    } else if (currentStep === "sequence") {
      if (events.length < 2) {
        showToast({
          title: "Eventos insuficientes",
          message: "Debe agregar al menos 2 eventos antes de continuar",
          type: "warning",
          position: "top-center",
        });
        return;
      }

      const incompleteEvents = getIncompleteEvents();
      if (incompleteEvents > 0) {
        showToast({
          title: "Eventos incompletos",
          message: `Debe completar todos los eventos antes de continuar. ${incompleteEvents} evento(s) incompleto(s)`,
          type: "warning",
          position: "top-center",
        });
        return;
      }

      setCurrentStep("preview");
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

  const handleSubmit = async () => {
    const finalValidationErrors = validateAllEvents();
    if (finalValidationErrors.length > 0) {
      setErrors(finalValidationErrors);
      return;
    }

    try {
      const formData = new FormData();

      // Crear el payload de la secuencia
      const eventPayloads: EventPayload[] = events.map((event) => ({
        name: event.name,
        description: event.description,
        order: event.order,
      }));

      const sequencePayload: CreateSequencePayload = {
        events: eventPayloads,
      };

      //Anidamos los atributos de la configuracion general con la de la actividad particular
      const sequenceDataFinal = {
        ...sequencePayload,
        ...configurationActivity,
      };
      // Agregar el payload como JSON
      formData.append("payload", JSON.stringify(sequenceDataFinal));

      // Agregar las imágenes
      eventImages.forEach((image, index) => {
        if (image) {
          formData.append(`${index}`, image);
        }
      });

      await registrarOrdenarSecuencia(formData);
      showToast({
        title: "Actividad creada exitosamente",
        message: "La secuencia ha sido creada exitosamente.",
        type: "success",
      });
      resetAllStates();
      navigate("/dashboard/teacher/actividades/list");
    } catch (error) {
      showToast({
        title: "Error al crear la actividad",
        message: "Hubo un error al crear la actividad",
        type: "error",
      });
      console.error("Error al crear la secuencia:", error);
    }
  };

  // Funciones de utilidad
  const validateConfig = (configData: OrdenarSecuenciaConfig): string[] => {
    const validationErrors: string[] = [];

    if (configData.cantEvents < 3) {
      validationErrors.push("Debe crear al menos 3 eventos");
    } else if (configData.cantEvents > 10) {
      validationErrors.push("No puede crear más de 10 eventos");
    }

    return validationErrors;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "config":
        return "Configuración General";
      case "sequence":
        return "Crear Secuencia de Eventos";
      case "preview":
        return "Vista Previa";
      default:
        return "Crear Actividad";
    }
  };

  const getCurrentStepNumber = () => {
    if (currentStep === "config") return 1;
    if (currentStep === "sequence") return 2;
    return 3;
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "config":
        return "Configure los parámetros básicos de la actividad";
      case "sequence":
        return "Agregue y ordene los eventos de la secuencia";
      case "preview":
        return "Revise la actividad antes de crearla";
      default:
        return "";
    }
  };

  // Handlers especificos de ordenarSecuencia
  const handleAddEvent = (eventData: Omit<SequenceEvent, "id" | "order">) => {
    if (events.length >= config.cantEvents) return;

    const newEvent: SequenceEvent = {
      ...eventData,
      id: `event-${Date.now()}-${Math.random()}`,
      order: events.length,
    };

    setEvents((prev) => [...prev, newEvent]);

    if (eventData.image) {
      setEventImages((prev): (File | null)[] => [
        ...prev,
        eventData.image ?? null,
      ]);
    } else {
      setEventImages((prev): (File | null)[] => [...prev, null]);
    }
  };

  const handleUpdateEvent = (
    id: string,
    updatedEvent: Partial<SequenceEvent>
  ) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    );
  };

  const handleDeleteEvent = (id: string) => {
    const indexToRemove = events.findIndex((event) => event.id === id);
    if (indexToRemove === -1) return;

    setEvents((prev) => {
      const filtered = prev.filter((event) => event.id !== id);
      return filtered.map((event, index) => ({
        ...event,
        order: index,
      }));
    });
    setEventImages((prev) => {
      const newImages = [...prev];
      newImages.splice(indexToRemove, 1);
      return newImages;
    });
  };

  const handleReorderEvents = (newOrder: SequenceEvent[]) => {
    const reorderedEvents = newOrder.map((event, index) => ({
      ...event,
      order: index,
    }));
    const reorderedImages = newOrder.map((event) => {
      const originalIndex = events.findIndex((e) => e.id === event.id);
      return eventImages[originalIndex] ?? null;
    });

    setEvents(reorderedEvents);
    setEventImages(reorderedImages);
  };

  const contextValue: OrdenarSecuenciaContextType = {
    // Estados principales
    loading,
    currentStep,
    config,
    errors,
    isFormValid,
    events,

    // Funciones principales
    registrarOrdenarSecuencia,

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

    // Handlers especificos de ordenarSecuencia
    handleAddEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    handleReorderEvents,

    // Funciones auxiliares específicas de ordenar secuencia
    getCompletedEvents,
    getIncompleteEvents,
  };

  return (
    <OrdenarSecuenciaContext.Provider value={contextValue}>
      {children}
    </OrdenarSecuenciaContext.Provider>
  );
};
