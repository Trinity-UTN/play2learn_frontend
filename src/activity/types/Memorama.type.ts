export interface MemoramaPair {
  concept: string;
  image: File | null;
}

export interface MemoramaConfig {
  totalPairs: number;
}

export interface MemoramaInterface {
  concepts: string[];
  images: File[];
}

export interface MemoramaGameConfig {
  couples: MemoramaPair[];
}
