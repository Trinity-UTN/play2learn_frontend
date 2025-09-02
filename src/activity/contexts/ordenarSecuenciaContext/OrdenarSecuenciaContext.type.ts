import type {
  SequenceEvent,
  OrdenarSecuenciaConfig,
} from "../../types/OrdenarSecuencia.type";

export interface OrdenarSecuenciaContextType {
  // Estados principales
  loading: boolean;
  currentStep: "config" | "sequence" | "preview";
  config: OrdenarSecuenciaConfig;
  errors: string[];
  isFormValid: boolean;
  events: SequenceEvent[];

  // Funciones principales
  registrarOrdenarSecuencia: (formData: FormData) => Promise<void>;

  // Handlers principales
  handleConfigSubmit: (newConfig: OrdenarSecuenciaConfig) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleNext: () => void;
  handleReset: () => void;

  // Funciones de utilidad
  validateConfig: (config: OrdenarSecuenciaConfig) => string[];
  getStepTitle: () => string;
  getCurrentStepNumber: () => number;
  getStepDescription: () => string;

  // Handlers especificos de ordenarSecuencia
  handleAddEvent: (eventData: Omit<SequenceEvent, "id" | "order">) => void;
  handleUpdateEvent: (id: string, updatedEvent: Partial<SequenceEvent>) => void;
  handleDeleteEvent: (id: string) => void;
  handleReorderEvents: (newOrder: SequenceEvent[]) => void;

  // Funciones auxiliares específicas de ordenarSecuencia
  getCompletedEvents: () => number;
  getIncompleteEvents: () => number;
}
