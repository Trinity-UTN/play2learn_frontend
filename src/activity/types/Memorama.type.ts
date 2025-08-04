export interface MemoraPair {
  concept: string;
  image: File | null;
}

export interface MemoramaConfig {
  totalPairs: number;
  maxTimeInSeconds: number;
}

export interface MemoramaInterface {
  attempts: number; //TODO: ATTEMPTS REMOVAL
  concepts: string[];
  images: File[];
}

export interface MemoramaFormData {
  description: string;
  startDate: string;
  endDate: string;
  dificulty: string;
  maxTime: string;
  subjectId: string;
  attempts: string;
  concepts: string[];
  images: File[];
}
