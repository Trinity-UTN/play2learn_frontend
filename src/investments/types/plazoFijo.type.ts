import type { PaginatedData } from "../../shared/types/PaginacionType";

export type FIXED_TERM_STATES = "IN_PROGRESS" | "FINISHED";
export type FIXED_TERM_DAYS = "SEMANAL" | "QUINCENAL" | "MENSUAL";

export interface RegisterPlazoFijo {
  amountInvested: number;
  fixedTermDays: FIXED_TERM_DAYS;
}

export interface PlazoFijoResponse {
  id: number;
  amountInvested: number;
  amountReward: number;
  fixedTermDays: FIXED_TERM_DAYS;
  startDate: string;
  endDate: string;
  fixedTermState: FIXED_TERM_STATES;
}

export interface PlazoFijoPaginatedResponseInterface {
  data: PaginatedData<PlazoFijoResponse>;
  message: string;
  errors: any;
  timestamp: string;
}

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
