import type {
  ClassificationCategory,
  CreateClassification,
  DesafioClasificacionConfig,
} from "../../types/DesafioClasificacion.type";

export interface ClasificacionContextType {
  // Estados principales
  loading: boolean;
  currentStep: "config" | "preview";
  config: DesafioClasificacionConfig;
  errors: string[];
  isFormValid: boolean;
  categories: ClassificationCategory[];

  // Funciones principales
  registrarDesafioClasificacion: (
    data: CreateClassification,
  ) => Promise<boolean>;

  // Handlers principales
  handleConfigSubmit: (newConfig: DesafioClasificacionConfig) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleNext: () => void;
  handleReset: () => void;

  // Funciones de utilidad
  getStepTitle: () => string;
  getCurrentStepNumber: () => number;
  getStepDescription: () => string;
  validateConfig: (config: DesafioClasificacionConfig) => string[];

  // Funciones específicas de desafio de clasificación
  handleAddCategory: (name: string) => void;
  handleEditCategory: (categoryId: string, newName: string) => void;
  handleDeleteCategory: (categoryId: string) => void;
  handleAddConcept: (categoryId: string, conceptName: string) => void;
  handleEditConcept: (
    categoryId: string,
    conceptId: string,
    newName: string,
  ) => void;
  handleDeleteConcept: (categoryId: string, conceptId: string) => void;
  getAllConcepts: () => string[];
  getCategoryNames: () => string[];
}
