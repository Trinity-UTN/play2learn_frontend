import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { OrdenarSecuenciaContextType } from "./OrdenarSecuenciaContext.type";
import { OrdenarSecuenciaContext } from "./OrdenarSecuenciaContext";
import type {
  CreateSequencePayload,
  EventPayload,
  SequenceEvent,
} from "../../types/OrdenarSecuencia.type";
import { useToaster } from "../../../shared/hooks/useToaster";
import { OrdenarSecuenciaService } from "../../services/ordenarSecuencia/OrdenarSecuenciaService";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";

interface OrdenarSecuenciaProviderProps {
  children: ReactNode;
}

export const OrdenarSecuenciaProvider: React.FC<
  OrdenarSecuenciaProviderProps
> = ({ children }) => {
  //CONST y SETTERS
  const [events, setEvents] = useState<SequenceEvent[]>([]);
  const [cantEvents, setCantEvents] = useState<number>(5);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [eventImages, setEventImages] = useState<(File | null)[]>([]);
  const { showToast } = useToaster();
  const { configurationActivity } = useConfigurationActivity();
  const navigate = useNavigate();

  //ACTIONS
  const registrarOrdernarSecuencia = async (formData: FormData) => {
    await OrdenarSecuenciaService.registerOrdenarSecuenciaApi(formData);
  };

  //Agregar un nuevo evento
  const addEvent = (eventData: Omit<SequenceEvent, "id" | "order">) => {
    if (events.length >= cantEvents) return;

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

  //modificar evento
  const updateEvent = (id: string, updatedEvent: Partial<SequenceEvent>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    );
  };

  //borrar elemento
  const deleteEvent = (id: string) => {
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

  //reordenar eventos
  const reorderEvents = (newOrder: SequenceEvent[]) => {
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
  //Resetear formulario
  const resetForm = () => {
    setEvents([]);
    setEventImages([]);
    setShowPreview(false);
  };
  //Mandar enventos
  const handleSubmit = async () => {
    if (events.length < 2) {
      showToast({
        title: "Debe agregar al menos 2 eventos para crear la secuencia",
        type: "warning",
        position: "top-center",
      });
      return;
    }
    setIsSubmitting(true);
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

      await registrarOrdernarSecuencia(formData);
      showToast({
        title: "Secuencia creada exitosamente!",
        type: "success",
        position: "top-center",
      });

      // Reset del formulario
      resetForm();

      navigate("/dashboard/teacher/actividades/list");
    } catch (error) {
      console.error("Error al crear la secuencia:", error);
      showToast({
        title: "Error al crear la secuencia. Intente nuevamente.",
        type: "warning",
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contextValue: OrdenarSecuenciaContextType = {
    //STATES
    events,
    cantEvents,
    showPreview,
    isSubmitting,
    //SETTERS
    setEvents,
    setCantEvents,
    setShowPreview,
    setIsSubmitting,
    //ACTIONS
    addEvent,
    updateEvent,
    deleteEvent,
    reorderEvents,
    handleSubmit,
  };

  return (
    <OrdenarSecuenciaContext.Provider value={contextValue}>
      {children}
    </OrdenarSecuenciaContext.Provider>
  );
};
