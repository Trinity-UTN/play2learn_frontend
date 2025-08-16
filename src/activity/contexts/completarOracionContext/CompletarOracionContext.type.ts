import type {
  CompletarOracionInterface,
  Sentence,
} from "../../types/CompletarOracion.type";

export interface CompletarOracionContextType {
  // Estados principales
  loading: boolean;
  currentStep: "config" | "words" | "preview";
  sentences: Sentence[];
  errors: string[];
  isFormValid: boolean;

  // Funciones principales
  registrarCompletarOracion: (data: CompletarOracionInterface) => Promise<void>;

  // Handlers principales
  handleConfigSubmit: (newSentences: Sentence[]) => void;
  handleAddSentence: (sentenceText: string) => void;
  handleEditSentence: (index: number, sentenceText: string) => void;
  handleRemoveSentence: (index: number) => void;
  handleWordToggle: (sentenceIndex: number, wordIndex: number) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleNext: () => void;
  handleReset: () => void;

  // Funciones de utilidad
  getStepTitle: () => string;
  getCurrentStepNumber: () => number;
  validateConfig: () => boolean;
  validateWords: () => boolean;
}
