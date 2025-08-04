export interface MemoramaPair {
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
