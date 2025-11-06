import type {
  FIXED_TERM_DAYS,
  FIXED_TERM_STATES,
} from "../../types/plazoFijo.type";

export const TERM_OPTIONS: {
  value: FIXED_TERM_DAYS;
  label: string;
  days: number;
  rate: number;
}[] = [
  { value: "SEMANAL", label: "Semanal", days: 7, rate: 2.877 },
  { value: "QUINCENAL", label: "Quincenal", days: 15, rate: 6.165 },
  { value: "MENSUAL", label: "Mensual", days: 30, rate: 12.33 },
];

export const quickAmounts = [
  { label: "1", value: 1 },
  { label: "5", value: 5 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];

// Tipos para filtros
export const FILTER_VALUES = {
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED",
} as const;

export const statusFilters: Array<{
  value: FIXED_TERM_STATES;
  label: string;
  color: string;
  filterValue: string | null;
}> = [
  {
    value: "IN_PROGRESS",
    label: "En Progreso",
    color: "#22c55e",
    filterValue: FILTER_VALUES.IN_PROGRESS,
  },
  {
    value: "FINISHED",
    label: "Finalizados",
    color: "#f59e0b",
    filterValue: FILTER_VALUES.FINISHED,
  },
];
