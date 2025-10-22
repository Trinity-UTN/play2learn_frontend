import type { PaginatedData } from "../../shared/types/PaginacionType";

export type RiskLevel = "BAJO" | "MEDIO" | "ALTO";
export type RangeValue =
  | "DIARIO"
  | "SEMANAL"
  | "QUINZENAL"
  | "MENSUAL"
  | "HISTORICO";

export interface InvestmentResponse {
  id: number;
  name: string;
  abbreviation: string;
  totalAmount: number;
  availableAmount: number;
  soldAmount: number;
  currentPrice: number;
  initialPrice: number;
  riskLevel: RiskLevel;
}
export interface InvestmentsPaginatedResponseInterface {
  data: PaginatedData<InvestmentResponse>;
  message: string;
  errors: any;
  timestamp: string;
}

export interface CandleStickValuesResponse {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
}
