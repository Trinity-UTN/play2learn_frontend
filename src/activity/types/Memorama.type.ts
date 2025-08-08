export interface MemoramaPair {
  concept: string;
  image: File | null;
}

export interface MemoramaConfig {
  totalPairs: number;
}

export interface MemoramaInterface {
  attempts: number; //TODO: ATTEMPTS REMOVAL
  concepts: string[];
  images: File[];
}
