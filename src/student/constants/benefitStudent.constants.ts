import { FaStar, FaShoppingBag, FaHandPaper } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";

// Header de beneficios
export const BENEFIT_HEADER = {
  TITLE: "Mis Beneficios",
  SUBTITLE: "Canjea tus monedas por recompensas",
} as const;

// Status de beneficios
export const BENEFIT_STATUS = {
  AVAILABLE: "AVAILABLE",
  PURCHASED: "PURCHASED",
  USE_REQUESTED: "USE_REQUESTED",
  EXPIRED: "EXPIRED",
} as const;

export type BenefitStatus =
  (typeof BENEFIT_STATUS)[keyof typeof BENEFIT_STATUS];

// Filtros de estado con iconos
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

// Categorías de beneficios (importadas del módulo compartido)
export const BENEFIT_CATEGORY_OPTIONS = [
  "ALL",
  "EVALUACION",
  "ASISTENCIA",
  "TRABAJOS",
  "EXTRAS",
] as const;

// Configuración de stats para estudiantes
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
    key: "useRequested",
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
