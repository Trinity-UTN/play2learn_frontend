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
  addDecisionNode: (path: number[], name: string) => void;
  addConsequence: (
    path: number[],
    name: string,
    approvesActivity: boolean
  ) => void;
  removeNode: (path: number[]) => void;
  updateNodeName: (path: number[], name: string) => void;
  updateConsequence: (
    path: number[],
    field: keyof Consequence,
    value: string | boolean
  ) => void;
}
