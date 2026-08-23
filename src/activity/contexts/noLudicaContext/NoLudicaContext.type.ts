import type {
  NoLudicaInterface,
  NoLudicaConfig,
} from "../../types/NoLudica.type";

export interface NoLudicaContextType {
  // Estados principales
  loading: boolean;
  currentStep: "config" | "preview";
  config: NoLudicaConfig;
  errors: string[];
  isFormValid: boolean;

  // Funciones principales
  registrarNoLudica: (data: NoLudicaInterface) => Promise<boolean>;

  // Handlers principales
  handleConfigSubmit: (newConfig: NoLudicaConfig) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleNext: () => void;
  handleReset: () => void;

  // Funciones de utilidad
  validateConfig: (config: NoLudicaConfig) => string[];
  getStepTitle: () => string;
  getCurrentStepNumber: () => number;
  getStepDescription: () => string;
}
