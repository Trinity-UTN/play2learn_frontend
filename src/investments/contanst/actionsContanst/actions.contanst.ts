import type { RiskLevel } from "../../types/actions.type";

export const FILTER_TYPES = {
  TYPE: "riskLevel",
} as const;
export const FILTER_VALUES = {
  BAJO: "BAJO",
  MEDIO: "MEDIO",
  ALTO: "ALTO",
} as const;

export const riskFilters: Array<{
  value: RiskLevel | "TODOS";
  label: string;
  color: string;
  filterValue: string | null;
}> = [
  { value: "TODOS", label: "Todas", color: "#8b5cf6", filterValue: null },
  {
    value: "BAJO",
    label: "Bajo Riesgo",
    color: "#22c55e",
    filterValue: FILTER_VALUES.BAJO,
  },
  {
    value: "MEDIO",
    label: "Riesgo Medio",
    color: "#f59e0b",
    filterValue: FILTER_VALUES.MEDIO,
  },
  {
    value: "ALTO",
    label: "Alto Riesgo",
    color: "#ef4444",
    filterValue: FILTER_VALUES.ALTO,
  },
];
