import type { MemoramaPair, MemoramaConfig } from "../../types/Memorama.type";
import type { MemoramaInterface } from "../../types/Memorama.type";

export interface MemoramaContextType {
  // Estados principales
  loading: boolean;
  currentStep: "config" | "pairs" | "preview";
  config: MemoramaConfig;
  errors: string[];
  isFormValid: boolean;
  pairs: MemoramaPair[];
  pairErrors: { [pairIndex: number]: { [field: string]: string } };
  currentPairIndex: number;

  // Funciones principales
  registrarMemorama: (data: MemoramaInterface) => Promise<boolean>;

  // Handlers principales
  handleConfigSubmit: (newConfig: MemoramaConfig) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleNext: () => void;
  handleReset: () => void;

  // Funciones de utilidad
  getPairStatus: (pair: MemoramaPair) => "complete" | "incomplete" | "empty";
  getStepTitle: () => string;
  getCurrentStepNumber: () => number;
  getStepDescription: () => string;

  // Handlers específicos de memorama
  handlePairSave: (pairData: MemoramaPair) => void;
  handleNextPair: () => void;
  handlePreviousPair: () => void;
  handleGoToPair: (index: number) => void;
  handleAddPair: () => void;
  handleDeletePair: (index: number) => void;

  // Funciones específicas de memorama
  getCompletedPairs: () => number;
  getIncompletePairs: () => number;
  getEmptyPairs: () => number;
  setPairErrors: (
    pairIndex: number,
    errors: { [field: string]: string },
  ) => void;
  clearPairErrors: (pairIndex: number) => void;
  clearAllPairErrors: () => void;
}
