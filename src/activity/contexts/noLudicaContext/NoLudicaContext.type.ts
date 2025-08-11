import type {
  NoLudicaInterface,
  NoLudicaConfig,
  TipoEntrega,
} from "../../types/NoLudica.type";

export interface NoLudicaContextType {
  // Estados principales
  loading: boolean;
  currentStep: "config" | "preview";
  config: NoLudicaConfig;
  errors: string[];
  isFormValid: boolean;

  // Funciones principales
  registrarNoLudica: (data: NoLudicaInterface) => Promise<void>;

  // Handlers principales
  handleConfigSubmit: (newConfig: NoLudicaConfig) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleReset: () => void;

  // Funciones de utilidad
  getStepTitle: () => string;
  validateConfig: (config: NoLudicaConfig) => string[];
  getTipoEntregaOptions: () => Array<{
    value: TipoEntrega;
    label: string;
    description: string;
    acceptedFormats?: string[];
    placeholder?: string;
  }>;
}
