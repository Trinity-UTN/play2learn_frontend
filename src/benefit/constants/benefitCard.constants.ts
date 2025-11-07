export const BENEFIT_PURCHASE_STATE_CONFIG = {
  USED: {
    label: "Usado",
    color: { bg: "#d1fae5", text: "#065f46" },
  },
  USE_REQUESTED: {
    label: "Uso Solicitado",
    color: { bg: "#dbeafe", text: "#1e40af" },
  },
  PURCHASED: {
    label: "Comprado",
    color: { bg: "#fef3c7", text: "#92400e" },
  },
  DEFAULT: {
    label: "Desconocido",
    color: { bg: "#f3f4f6", text: "#6b7280" },
  },
} as const;
