import type { IconType } from "react-icons";
import { FaGift } from "react-icons/fa";
import type { Category, Color, Icon } from "../../shared/types/Benefits.type";
import {
  BENEFIT_CATEGORIES,
  BENEFIT_COLOR_OPTIONS,
  BENEFIT_ICON_OPTIONS,
} from "../constants/benefits.constants";

/**
 * Obtiene el icono correspondiente a un valor de icono dado
 */
export const getIconByValue = (icon: Icon): IconType => {
  const selected = BENEFIT_ICON_OPTIONS.find((option) => option.value === icon);
  return selected ? selected.icon : FaGift;
};

/**
 * Devuelve la categoría correspondiente a un valor de categoría dado
 */
export const getCategoryByValue = (
  category: Category
):
  | { value: Category; label: string; icon: IconType; color: string }
  | undefined => {
  return BENEFIT_CATEGORIES.find((cat) => cat.value === category);
};

/**
 * Devuelve el color de una categoría
 * @param category
 * @returns
 */
export const getCategoryColor = (category: Category) => {
  const categoryConfig = BENEFIT_CATEGORIES.find(
    (cat) => cat.value === category
  );
  return categoryConfig
    ? { bg: `${categoryConfig.color}20`, text: categoryConfig.textColor }
    : { bg: "#f3f4f6", text: "#374151" };
};

/**
 * Obtiene el hex color correspondiente a un valor de color dado
 */
export const getColorByValue = (color: Color): string | undefined => {
  const colorResult = BENEFIT_COLOR_OPTIONS.find((co) => co.value === color);
  return colorResult?.color;
};

/**
 * Formatea una fecha en formato legible para el usuario (DD/MM/AAAA HH:MM)
 */
export const formatBenefitDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

/**
 * Calcula el porcentaje de uso de un beneficio
 */
export const calculateUsagePercentage = (
  used: number,
  total: number
): number => {
  if (total === 0) return 0;
  return Math.min((used / total) * 100, 100);
};
