import { FaClock, FaCheck, FaShoppingCart, FaTimes } from "react-icons/fa";

/**
 * Obtiene la configuración de un estado de compra de beneficio
 */
export const getBenefitPurchaseStatusConfig = (status: string) => {
  switch (status) {
    case "PURCHASED":
      return {
        icon: FaShoppingCart,
        label: "Canjeado",
        color: "#3b82f6",
        bgColor: { bg: "#dbeafe", text: "#3b82f6" },
      };
    case "USE_REQUESTED":
      return {
        icon: FaClock,
        label: "Uso Solicitado",
        color: "#f59e0b",
        bgColor: { bg: "#fef3c7", text: "#f59e0b" },
      };
    case "USED":
      return {
        icon: FaCheck,
        label: "Usado",
        color: "#10b981",
        bgColor: { bg: "#d1fae5", text: "#10b981" },
      };
    case "EXPIRED":
      return {
        icon: FaTimes,
        label: "Vencido",
        color: "#ef4444",
        bgColor: { bg: "#fee2e2", text: "#ef4444" },
      };
    default:
      return {
        icon: FaShoppingCart,
        label: "Desconocido",
        color: "#6b7280",
        bgColor: { bg: "#f3f4f6", text: "#6b7280" },
      };
  }
};

/**
 * Determina si se puede aceptar el uso de un beneficio
 */
export const canAcceptBenefitUse = (status: string): boolean => {
  return status === "USE_REQUESTED";
};

/**
 * Formatea el nombre del estudiante para su visualización
 */
export const formatStudentName = (name: string): string => {
  return name.trim();
};
