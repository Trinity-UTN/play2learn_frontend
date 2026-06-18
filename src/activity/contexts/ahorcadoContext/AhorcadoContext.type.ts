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
  wordSuggestions: string[];

  // Funciones principales
  registerAhorcado: (data: AhorcadoInterface) => Promise<boolean>;

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
  getDifficultyOptions: () => Array<{
    value: string;
    label: string;
    description: string;
    errors: string;
  }>;
}
