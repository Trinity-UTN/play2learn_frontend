import type { IconType } from "react-icons";
import {
  FaGraduationCap,
  FaFileAlt,
  FaCalendarCheck,
  FaStar,
  FaUsers,
  FaCoins,
  FaChartLine,
  FaGift,
} from "react-icons/fa";
import type { Category, Color, Icon } from "../types/Benefits.type";

export const BENEFIT_CATEGORIES: ReadonlyArray<{
  value: Category;
  label: string;
  icon: IconType;
  color: string;
}> = [
  {
    value: "EVALUACION",
    label: "Evaluaciones",
    icon: FaGraduationCap,
    color: "#007bff",
  },
  {
    value: "TRABAJOS",
    label: "Trabajos",
    icon: FaFileAlt,
    color: "#ff6f3c",
  },
  {
    value: "ASISTENCIA",
    label: "Asistencia",
    icon: FaCalendarCheck,
    color: "#10b981",
  },
  {
    value: "EXTRAS",
    label: "Extras",
    icon: FaStar,
    color: "#8b5cf6",
  },
] as const;

export const BENEFIT_ICON_OPTIONS: ReadonlyArray<{
  value: Icon;
  label: string;
  icon: IconType;
}> = [
  { value: "EXAM", label: "Examen", icon: FaGraduationCap },
  { value: "FILE", label: "Archivo", icon: FaFileAlt },
  { value: "SKIP", label: "Saltar", icon: FaStar },
  { value: "CALENDAR", label: "Calendario", icon: FaCalendarCheck },
  { value: "CHAT", label: "Chat", icon: FaUsers },
  { value: "CLOCK", label: "Reloj", icon: FaCoins },
  { value: "BOOK", label: "Libro", icon: FaChartLine },
  { value: "RETRY", label: "Reintentar", icon: FaGift },
] as const;

export const BENEFIT_COLOR_OPTIONS: ReadonlyArray<{
  value: Color;
  color: string;
}> = [
  { value: "BLUE", color: "#007bff" },
  { value: "ORANGE", color: "#ff6f3c" },
  { value: "LIGHTGREEN", color: "#b9e769" },
  { value: "EMERALD", color: "#10b981" },
  { value: "PURPLE", color: "#8b5cf6" },
  { value: "AMBER", color: "#f59e0b" },
  { value: "RED", color: "#dc2626" },
  { value: "GRAY", color: "#6b7280" },
] as const;

export const BENEFIT_FORM_PLACEHOLDERS = {
  NAME_PLACEHOLDER: "Ingrese el nombre del beneficio",
  DESCRIPTION_PLACEHOLDER:
    "Describe detalladamente qué obtiene el estudiante con este beneficio",
  COST_PLACEHOLDER: "Ingrese una cantidad de monedas",
  PURCHASE_LIMIT_PLACEHOLDER: "Ingrese un límite de compra",
  PURCHASE_LIMIT_PER_STUDENT_PLACEHOLDER: "Ingrese un límite por estudiante",
} as const;

export const BENEFIT_VALIDATION = {
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 1000,
  MIN_COST: 1,
} as const;

export const BENEFIT_VALIDATION_TEXT = {
  PURCHASE_LIMIT_VALIDATION: "Si no se define, el límite es ilimitado.",
  PURCHASE_LIMIT_PER_STUDENT_VALIDATION:
    "Si no se define, el límite por estudiante es ilimitado.",
} as const;
