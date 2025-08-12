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
  handleReset: () => void;

  // Funciones de utilidad
  getStepTitle: () => string;
  validateConfig: (config: ArbolDecisionConfig) => ValidationError[];
  validateInitialConfig: (config: ArbolDecisionConfig) => ValidationError[];
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
