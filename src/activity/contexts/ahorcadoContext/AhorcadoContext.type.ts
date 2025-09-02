import type {
  AhorcadoInterface,
  AhorcadoConfig,
} from "../../types/Ahorcado.type";

export interface AhorcadoContextType {
  // Estados principales
  loading: boolean;
  currentStep: "config" | "preview";
  config: AhorcadoConfig;
  errors: string[];
  isFormValid: boolean;
  guessedLetters: string[];
  currentGuess: string;
  wordSuggestions: string[];

  // Funciones principales
  registerAhorcado: (data: AhorcadoInterface) => Promise<void>;

  // Handlers principales
  handleConfigSubmit: (newConfig: AhorcadoConfig) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleNext: () => void;
  handleReset: () => void;

  // Funciones de utilidad
  validateConfig: (config: AhorcadoConfig) => string[];
  getStepTitle: () => string;
  getCurrentStepNumber: () => number;
  getStepDescription: () => string;

  // Funciones específicas de ahorcado
  renderHangman: (errors: number) => string;
  renderWordDisplay: (letters?: string[]) => string;
  getDifficultyOptions: () => Array<{
    value: string;
    label: string;
    description: string;
    errors: string;
  }>;
  setGuessedLettersState: (
    letters: string[] | ((prev: string[]) => string[])
  ) => void;
  setCurrentGuessState: (guess: string) => void;
}
