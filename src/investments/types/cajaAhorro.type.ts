import type { PaginatedData } from "../../shared/types/PaginacionType";

export interface RegisterCajaDeAhorro {
  initialAmount: number;
  name: string;
}

// Depositar y Retirar
export interface MovimientoCajaDeAhorro {
  id: number;
  amount: number;
}
export interface CajaDeAhorroResponse {
  id: number;
  name: string;
  initialAmount: number;
  currentAmount: number;
  accumulatedInterest: number;
  startDate: string;
  lastUpdate: string;
}

export interface CajaDeAhorroPaginatedResponseInterface {
  data: PaginatedData<CajaDeAhorroResponse>;
  message: string;
  errors: any;
  timestamp: string;
}

export interface CajaDeAhorroStats {
  totalInvested: number;
  quantityInProgress: number;
  totalReward: number;
}
