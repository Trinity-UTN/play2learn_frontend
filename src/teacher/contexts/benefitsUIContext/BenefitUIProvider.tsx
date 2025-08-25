import { useEffect, useState, type ReactNode } from "react";
import { BenefitUIContext } from "./BenefitUIContext";
import type { BenefitUIContextType } from "./BenefitUIContext.type";
import type {
  Category,
  Color,
  CreateBenefitInterface,
  Icon,
} from "../../types/BenefitType";
import { useBenefitAPI } from "../../hooks/useBenefitAPI";
import {
  FaGift,
  FaCoins,
  FaGraduationCap,
  FaFileAlt,
  FaCalendarCheck,
  FaStar,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { useSubject } from "../../../admin/hooks/useSubject";
import type { IconType } from "react-icons";

interface BenefitUIProviderProps {
  children: ReactNode;
}

export const BenefitUIProvider: React.FC<BenefitUIProviderProps> = ({
  children,
}) => {
  const [formData, setFormData] = useState<CreateBenefitInterface>({
    name: "",
    description: "",
    cost: "",
    totalRedeemableAmount: null,
    redeemableAmountPerStudent: null,
    subjectId: 0,
    endAt: "",
    color: "BLUE",
    category: "EVALUACION",
    icon: "EXAM",
  });

  const [previewMode, setPreviewMode] = useState(false);
  const { subjects, getSubjectByTeacher } = useSubject();
  const { registerBenefit } = useBenefitAPI();

  useEffect(() => {
    getSubjectByTeacher();
  }, []);

  const categories: {
    value: Category;
    label: string;
    icon: any;
    color: string;
  }[] = [
    {
      value: "EVALUACION",
      label: "Evaluaciones",
      icon: FaGraduationCap,
      color: "#007bff",
    },
    { value: "TRABAJOS", label: "Trabajos", icon: FaFileAlt, color: "#ff6f3c" },
    {
      value: "ASISTENCIA",
      label: "Asistencia",
      icon: FaCalendarCheck,
      color: "#10b981",
    },
    { value: "EXTRAS", label: "Extras", icon: FaStar, color: "#8b5cf6" },
  ];

  const iconOptions: { value: Icon; label: string; icon: any }[] = [
    { value: "EXAM", label: "Examen", icon: FaGraduationCap },
    { value: "FILE", label: "Archivo", icon: FaFileAlt },
    { value: "SKIP", label: "Saltar", icon: FaStar },
    { value: "CALENDAR", label: "Calendario", icon: FaCalendarCheck },
    { value: "CHAT", label: "Chat", icon: FaUsers },
    { value: "CLOCK", label: "Reloj", icon: FaCoins },
    { value: "BOOK", label: "Libro", icon: FaChartLine },
    { value: "RETRY", label: "Reintentar", icon: FaGift },
  ];

  const colorOptions: { value: Color; color: string }[] = [
    { value: "BLUE", color: "#007bff" },
    { value: "ORANGE", color: "#ff6f3c" },
    { value: "LIGHTGREEN", color: "#b9e769" },
    { value: "EMERALD", color: "#10b981" },
    { value: "PURPLE", color: "#8b5cf6" },
    { value: "AMBER", color: "#f59e0b" },
    { value: "RED", color: "#dc2626" },
    { value: "GRAY", color: "#6b7280" },
  ];

  const getSelectedIcon = (icon: Icon): IconType => {
    const selected = iconOptions.find((option) => option.value === icon);

    return selected ? selected.icon : FaGift;
  };

  const getSelectedCategory = ():
    | { value: Category; label: string; icon: IconType; color: string }
    | undefined => {
    return categories.find((cat) => cat.value === formData.category);
  };
  const getColor = (color: Color): string | undefined => {
    const colorResult = colorOptions.find((co) => co.value === color);
    return colorResult?.color;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    registerBenefit(formData);
    resetForm();
  };

  const handleChange = (
    field: string,
    value: string | boolean | number
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      cost: "",
      totalRedeemableAmount: null,
      redeemableAmountPerStudent: null,
      subjectId: 0,
      endAt: "",
      color: "BLUE",
      category: "EVALUACION",
      icon: "EXAM",
    });
  };
  // const addRestriction = (): void => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     restrictions: [...prev.restrictions, ""],
  //   }));
  // };

  // const removeRestriction = (index: number): void => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     restrictions: prev.restrictions.filter((_, i) => i !== index),
  //   }));
  // };

  // const updateRestriction = (index: number, value: string): void => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     restrictions: prev.restrictions.map((restriction, i) =>
  //       i === index ? value : restriction
  //     ),
  //   }));
  // };
  const contextValue: BenefitUIContextType = {
    categories,
    colorOptions,
    formData,
    getColor,
    getSelectedCategory,
    getSelectedIcon,
    getSubjectByTeacher,
    handleChange,
    handleSubmit,
    iconOptions,
    previewMode,
    setFormData,
    setPreviewMode,
    subjects,
  };

  return (
    <BenefitUIContext.Provider value={contextValue}>
      {children}
    </BenefitUIContext.Provider>
  );
};
