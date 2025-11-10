import { FaCheckCircle, FaClock } from "react-icons/fa";
import type { BenefitPurchaseSimpleResponse } from "../../benefit/types/benefit.types";

export type PurchaseVisualState = {
  icon: React.ComponentType<any> | null;
  label: string;
  tooltip: string;
  colorKey: "used" | "purchased" | "requested" | "default";
};

export const getPurchaseVisualState = (
  purchase: BenefitPurchaseSimpleResponse
): PurchaseVisualState => {
  switch (purchase.state) {
    case "USED":
      return {
        icon: FaCheckCircle,
        label: "Beneficio usado",
        tooltip: "El beneficio ya fue utilizado por el estudiante",
        colorKey: "used",
      };
    case "PURCHASED":
      return {
        icon: FaClock,
        label: "Comprado - Esperando Solicitud",
        tooltip:
          "El estudiante compró el beneficio pero aún no solicitó su uso",
        colorKey: "purchased",
      };
    case "USE_REQUESTED":
      return {
        icon: null,
        label: "Uso Solicitado",
        tooltip: "El estudiante solicitó el uso del beneficio",
        colorKey: "requested",
      };
    default:
      return {
        icon: null,
        label: "Desconocido",
        tooltip: "Estado desconocido",
        colorKey: "default",
      };
  }
};

export const formatPurchaseDate = (
  dateString: string | undefined
): string | null => {
  if (!dateString) return null;
  try {
    return new Date(dateString).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return null;
  }
};
