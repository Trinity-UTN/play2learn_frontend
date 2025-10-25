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
  FaShoppingBag,
  FaHandPaper,
} from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import type { Category, Color, Icon } from "../types/benefit.types";

// ============================================
// BENEFIT CATEGORIES
// ============================================
export const BENEFIT_CATEGORIES: ReadonlyArray<{
  value: Category;
  label: string;
  icon: IconType;
  color: string;
  textColor: string;
}> = [
  {
    value: "EVALUACION",
    label: "EVALUACIONES",
    icon: FaGraduationCap,
    color: "#929292ff",
    textColor: "#fff",
  },
  {
    value: "TRABAJOS",
    label: "TRABAJOS",
    icon: FaFileAlt,
    color: "#227257ff",
    textColor: "#fff",
  },
  {
    value: "ASISTENCIA",
    label: "ASISTENCIA",
    icon: FaCalendarCheck,
    color: "#053f2cff",
    textColor: "#fff",
  },
  {
    value: "EXTRAS",
    label: "EXTRAS",
    icon: FaStar,
    color: "#929292ff",
    textColor: "#fff",
  },
] as const;

// ============================================
// BENEFIT ICONS
// ============================================
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

// ============================================
// BENEFIT COLORS
// ============================================
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

// ============================================
// BENEFIT STATUS (STUDENT)
// ============================================
export const BENEFIT_STATUS = {
  AVAILABLE: "AVAILABLE",
  PURCHASED: "PURCHASED",
  USE_REQUESTED: "USE_REQUESTED",
  EXPIRED: "EXPIRED",
} as const;

export type BenefitStatus =
  (typeof BENEFIT_STATUS)[keyof typeof BENEFIT_STATUS];

export const BENEFIT_STATUS_FILTERS = [
  {
    key: BENEFIT_STATUS.AVAILABLE,
    label: "Disponibles",
    icon: FaStar,
  },
  {
    key: BENEFIT_STATUS.PURCHASED,
    label: "Comprados",
    icon: FaShoppingBag,
  },
  {
    key: BENEFIT_STATUS.USE_REQUESTED,
    label: "Uso Solicitado",
    icon: FaHandPaper,
  },
  {
    key: BENEFIT_STATUS.EXPIRED,
    label: "Vencidos",
    icon: FiXCircle,
  },
] as const;

// ============================================
// PLACEHOLDERS
// ============================================
export const BENEFIT_PLACEHOLDERS = {
  SEARCH_BENEFITS: "Buscar beneficios...",
  DEFAULT_CATEGORY: "Todas las categorías",
} as const;

export const BENEFIT_FORM_PLACEHOLDERS = {
  NAME: "Ingrese el nombre del beneficio",
  DESCRIPTION:
    "Describe detalladamente qué obtiene el estudiante con este beneficio",
  COST: "Ingrese una cantidad de monedas",
  PURCHASE_LIMIT: "Ingrese un límite de compra",
  PURCHASE_LIMIT_PER_STUDENT: "Ingrese un límite por estudiante",
} as const;

// ============================================
// VALIDATION RULES
// ============================================
export const BENEFIT_VALIDATION = {
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 1000,
  MIN_COST: 1,
} as const;

// ============================================
// TOOLTIPS
// ============================================
export const BENEFIT_TOOLTIP = {
  PURCHASE_LIMIT: "Si no se define, el límite es ilimitado.",
  PURCHASE_LIMIT_PER_STUDENT:
    "Si no se define, el límite por estudiante es ilimitado.",
} as const;

// ============================================
// STUDENT HEADER
// ============================================
export const BENEFIT_HEADER = {
  TITLE: "Mis Beneficios",
  SUBTITLE: "Canjea tus monedas por recompensas",
} as const;

// ============================================
// CATEGORY OPTIONS
// ============================================
export const BENEFIT_CATEGORY_OPTIONS = [
  "ALL",
  "EVALUACION",
  "ASISTENCIA",
  "TRABAJOS",
  "EXTRAS",
] as const;

// ============================================
// STATS CONFIG (STUDENT)
// ============================================
export const BENEFIT_STATS_CONFIG = [
  {
    key: "available",
    label: "Disponibles",
    icon: FaStar,
    color: "#3B82F6",
    bgColor: "#DBEAFE",
  },
  {
    key: "purchased",
    label: "Comprados",
    icon: FaShoppingBag,
    color: "#10B981",
    bgColor: "#D1FAE5",
  },
  {
    key: "use_requested",
    label: "Uso Solicitado",
    icon: FaHandPaper,
    color: "#F59E0B",
    bgColor: "#FEF3C7",
  },
  {
    key: "expired",
    label: "Vencidos",
    icon: FiXCircle,
    color: "#DC2626",
    bgColor: "#FEE2E2",
  },
] as const;
