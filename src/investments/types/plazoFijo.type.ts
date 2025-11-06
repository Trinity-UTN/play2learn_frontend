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
