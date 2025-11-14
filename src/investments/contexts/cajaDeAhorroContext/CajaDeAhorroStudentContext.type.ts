import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  CajaDeAhorroResponse,
  MovimientoCajaDeAhorro,
  RegisterCajaDeAhorro,
} from "../../types/cajaAhorro.type";

export interface CajaDeAhorroContextType {
  // Estados principales
  loading: boolean;
  cajaDeAhorro: PaginatedData<CajaDeAhorroResponse> | null;

  getPaginatedCajaDeAhorro: (params: GetPaginated) => Promise<void>;
  registerCajaDeAhorro: (data: RegisterCajaDeAhorro) => Promise<void>;
  depositCajaDeAhorro: (data: MovimientoCajaDeAhorro) => Promise<void>;
  withdrawalCajaDeAhorro: (data: MovimientoCajaDeAhorro) => Promise<void>;
  deleteCajaDeAhorro: (id: number) => Promise<void>;
}
