export interface EventPayload {
  name: string;
  description: string;
  order: number;
}

export interface OrdenarSecuenciaConfig {
  cantEvents: number;
}

export interface CreateSequencePayload {
  events: EventPayload[];
}

export interface SequenceEvent {
  id: string;
  name: string;
  description: string;
  order: number;
  image?: File | null;
  imagePreview?: string;
}
