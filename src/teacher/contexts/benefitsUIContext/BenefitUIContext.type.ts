import type { IconType } from "react-icons";
import type {
  Category,
  Color,
  CreateBenefitInterface,
  Icon,
} from "../../types/BenefitType";

export interface BenefitUIContextType {
  // Estados
  formData: CreateBenefitInterface;
  setFormData: React.Dispatch<React.SetStateAction<CreateBenefitInterface>>;
  previewMode: boolean;
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;

  // Datos externos
  subjects: any[]; // Si tenés un tipo específico para subject, ponelo aquí
  getSubject: () => void;

  // Listas de opciones
  categories: {
    value: Category;
    label: string;
    icon: IconType;
    color: string;
  }[];
  iconOptions: {
    value: Icon;
    label: string;
    icon: IconType;
  }[];
  colorOptions: {
    value: Color;
    color: string;
  }[];

  // Métodos utilitarios
  getSelectedIcon: (icon: Icon) => IconType;
  getSelectedCategory: () =>
    | { value: Category; label: string; icon: IconType; color: string }
    | undefined;
  getColor: (color: Color) => string | undefined;

  // Handlers
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (field: string, value: string | boolean | number) => void;
}
