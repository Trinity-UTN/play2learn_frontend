import type { PaginatedData } from "../../shared/types/PaginacionType";

export type RiskLevel = "BAJO" | "MEDIO" | "ALTO";
export type RangeValue =
  | "DIARIO"
  | "SEMANAL"
  | "QUINZENAL"
  | "MENSUAL"
  | "HISTORICO";

export interface ActionsResponse {
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
export interface ActionsPaginatedResponseInterface {
  data: PaginatedData<ActionsResponse>;
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

export interface TradeActionsRequest {
  stockId: number;
  quantity: number;
}

export interface TradeActionStopLimitRequest {
  stockId: number;
  quantity: number;
  pricePerUnit: number;
  orderStop: "PROFIT" | "LOSS";
}
