import type { GetPaginated, PaginatedData } from "@/shared";
import type {
  CajaDeAhorroResponse,
  CajaDeAhorroStats,
  MovimientoCajaDeAhorro,
  RegisterCajaDeAhorro,
} from "../../types/cajaAhorro.type";

export interface CajaDeAhorroContextType {
  // Estados principales
  loading: boolean;
  cajaDeAhorro: PaginatedData<CajaDeAhorroResponse> | null;
  statsView: CajaDeAhorroStats | undefined;

  getPaginatedCajaDeAhorro: (params: GetPaginated) => Promise<void>;
  getCajaDeAhorroStats: () => Promise<void>;
  registerCajaDeAhorro: (data: RegisterCajaDeAhorro) => Promise<void>;
  depositCajaDeAhorro: (data: MovimientoCajaDeAhorro) => Promise<void>;
  withdrawalCajaDeAhorro: (data: MovimientoCajaDeAhorro) => Promise<void>;
  deleteCajaDeAhorro: (id: number) => Promise<void>;
}
