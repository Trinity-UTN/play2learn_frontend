import {
  FaPlay,
  FaCheck,
  FaClock,
  FaStar,
  FaTrophy,
  FaGamepad,
  FaDice,
  FaRocket,
  FaMedal,
  FaFlagCheckered,
  FaBan,
} from "react-icons/fa";
import { FiX, FiXCircle } from "react-icons/fi";
import type { IconType } from "react-icons";

// Header de actividades
export const ACTIVITY_HEADER = {
  TITLE: "Mis Actividades",
  SUBTITLE: "Completa actividades para ganar monedas",
} as const;

// Status de actividades
export const ACTIVITY_STATUS = {
  CREATED: "CREATED",
  PUBLISHED: "PUBLISHED",
  EXPIRED: "EXPIRED",
  APPROVED: "APPROVED",
  DISAPPROVED: "DISAPPROVED",
} as const;

export type ActivityStatus =
  (typeof ACTIVITY_STATUS)[keyof typeof ACTIVITY_STATUS];

// Dificultades
export const ACTIVITY_DIFFICULTIES = {
  ALL: "ALL",
  FACIL: "FACIL",
  MEDIO: "MEDIO",
  DIFICIL: "DIFICIL",
} as const;

export const ACTIVITY_DIFFICULTY_OPTIONS = [
  "ALL",
  "FACIL",
  "MEDIO",
  "DIFICIL",
] as const;

// Filtros de estado con iconos
export const ACTIVITY_STATUS_FILTERS = [
  {
    key: ACTIVITY_STATUS.PUBLISHED,
    label: "Disponibles",
    icon: FaStar,
  },
  {
    key: ACTIVITY_STATUS.APPROVED,
    label: "Aprobadas",
    icon: FaCheck,
  },
  {
    key: ACTIVITY_STATUS.DISAPPROVED,
    label: "Desaprobadas",
    icon: FaBan,
  },
  {
    key: ACTIVITY_STATUS.EXPIRED,
    label: "Vencidas",
    icon: FiXCircle,
  },
] as const;

// Iconos aleatorios para actividades
export const ACTIVITY_RANDOM_ICONS: IconType[] = [
  FaPlay,
  FaGamepad,
  FaDice,
  FaRocket,
  FaTrophy,
  FaStar,
  FaMedal,
  FaFlagCheckered,
];

// Colores para actividades
export const ACTIVITY_COLORS = [
  "var(--color-stat-1)",
  "var(--color-stat-2)",
  "var(--color-stat-3)",
  "var(--color-stat-4)",
  "var(--color-stat-5)",
] as const;

// Configuración de stats
export const ACTIVITY_STATS_CONFIG = [
  {
    key: "pending",
    label: "Disponibles",
    icon: FaClock,
    color: "#F59E0B",
    bgColor: "#FEF3C7",
  },
  {
    key: "approved",
    label: "Aprobadas",
    icon: FaCheck,
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
  },
  {
    key: "disapproved",
    label: "Desaprobadas",
    icon: FaBan,
    color: "#DC2626",
    bgColor: "#FEE2E2",
  },
  {
    key: "expired",
    label: "Vencidas",
    icon: FiX,
    color: "#b92110ff",
    bgColor: "#fadad1ff",
  },
] as const;
