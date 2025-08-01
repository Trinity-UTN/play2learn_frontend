export interface EventPayload {
  name: string;
  description: string;
  order: number;
}

export interface CreateSequencePayload {
  attempts: number;
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
