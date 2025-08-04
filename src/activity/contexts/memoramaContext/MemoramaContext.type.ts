import type { MemoraPair, MemoramaConfig } from "../../types/Memorama.type";
import type { MemoramaInterface } from "../../types/Memorama.type";

export interface MemoramaContextType {
  // Estados principales
  loading: boolean;
  currentStep: "config" | "pairs" | "preview";
  config: MemoramaConfig;
  pairs: MemoraPair[];
  currentPairIndex: number;
  errors: string[];
  pairErrors: { [pairIndex: number]: { [field: string]: string } };
  isFormValid: boolean;

  // Funciones principales
  registrarMemorama: (data: MemoramaInterface) => Promise<void>;

  // Handlers principales
  handleConfigSubmit: (newConfig: MemoramaConfig) => void;
  handlePairSave: (pairData: MemoraPair) => void;
  handleNextPair: () => void;
  handlePreviousPair: () => void;
  handleGoToPair: (index: number) => void;
  handleDeletePair: (index: number) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleReset: () => void;

  // Funciones de utilidad
  getPairStatus: (pair: MemoraPair) => "complete" | "incomplete" | "empty";
  getStepTitle: () => string;
  getCompletedPairs: () => number;
  getIncompletePairs: () => number;
  getEmptyPairs: () => number;
  setPairErrors: (
    pairIndex: number,
    errors: { [field: string]: string }
  ) => void;
  clearPairErrors: (pairIndex: number) => void;
  clearAllPairErrors: () => void;
}
