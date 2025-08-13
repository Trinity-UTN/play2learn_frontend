import type { SequenceEvent } from "../../types/OrdenarSecuencia.type"; // Ajustá la ruta según tu estructura

export interface OrdenarSecuenciaContextType {
  // States
  events: SequenceEvent[];
  cantEvents: number;
  showPreview: boolean;
  isSubmitting: boolean;

  // Setters
  setEvents: React.Dispatch<React.SetStateAction<SequenceEvent[]>>;
  setCantEvents: React.Dispatch<React.SetStateAction<number>>;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;

  // Actions
  addEvent: (eventData: Omit<SequenceEvent, "id" | "order">) => void;
  updateEvent: (id: string, updatedEvent: Partial<SequenceEvent>) => void;
  deleteEvent: (id: string) => void;
  reorderEvents: (newOrder: SequenceEvent[]) => void;
  handleSubmit: () => Promise<void>;
}
