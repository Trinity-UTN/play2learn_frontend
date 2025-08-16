import type {
  Consequence,
  ArbolDecisionInterface,
  ArbolDecisionConfig,
  ValidationError,
} from "../../types/ArbolDecision.type";

export interface ArbolDecisionContextType {
  // Estados principales
  loading: boolean;
  currentStep: "config" | "preview";
  config: ArbolDecisionConfig;
  errors: ValidationError[];
  isFormValid: boolean;

  // Funciones Principales
  registrarArbolDecision: (data: ArbolDecisionInterface) => Promise<void>;

  // Handlers principales
  handleConfigSubmit: (newConfig: ArbolDecisionConfig) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleNext: () => void;
  handleReset: () => void;

  // Funciones de utilidad
  validateConfig: (config: ArbolDecisionConfig) => ValidationError[];
  validateInitialConfig: (config: ArbolDecisionConfig) => ValidationError[];
  getStepTitle: () => string;
  getCurrentStepNumber: () => number;
  getStepDescription: () => string;

  // Funciones específicas de arbolDecision
  updateNodeName: (path: number[], name: string) => void;
  addSubOptions: (path: number[]) => void;
  addConsequence: (path: number[]) => void;
  removeContent: (path: number[]) => void;
  updateConsequence: (
    path: number[],
    field: keyof Consequence,
    value: string | boolean
  ) => void;
}
