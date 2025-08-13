import type { ClassificationCategory } from "../../types/DesafioClasificacion.type";

export interface ClasificacionContextType {
  // Estados
  categories: ClassificationCategory[];
  showPreview: boolean;
  isSubmitting: boolean;
  canSubmit: boolean;
  totalConcepts: number;

  // Setters (si querés exponerlos, opcional)
  setCategories: React.Dispatch<React.SetStateAction<ClassificationCategory[]>>;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;

  // Getters
  getAllConcepts: () => string[];
  getCategoryNames: () => string[];

  // Mutadores
  handleAddCategory: (name: string) => void;
  handleEditCategory: (categoryId: string, newName: string) => void;
  handleDeleteCategory: (categoryId: string) => void;

  handleAddConcept: (categoryId: string, conceptName: string) => void;
  handleEditConcept: (
    categoryId: string,
    conceptId: string,
    newName: string
  ) => void;
  handleDeleteConcept: (categoryId: string, conceptId: string) => void;

  // Envío
  handleSubmit: () => Promise<void>;
}
