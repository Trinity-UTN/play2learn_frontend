import type { RiskLevel } from "../types/actions.type";
import { FaShieldAlt } from "react-icons/fa";

export const getRiskConfig = (risk: RiskLevel) => {
  switch (risk) {
    case "BAJO":
      return { color: "#22c55e", label: "Bajo Riesgo", icon: FaShieldAlt };
    case "MEDIO":
      return { color: "#f59e0b", label: "Riesgo Medio", icon: FaShieldAlt };
    case "ALTO":
      return { color: "#ef4444", label: "Alto Riesgo", icon: FaShieldAlt };
  }
};
