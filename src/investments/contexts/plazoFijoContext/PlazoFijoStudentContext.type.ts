import type { GetPaginated, PaginatedData } from "@/shared";
import type {
  PlazoFijoResponse,
  RegisterPlazoFijo,
  StatisticsPlazoFijoResponse,
} from "../../types/plazoFijo.type";

export interface PlazoFijoContextType {
  // Estados principales
  loading: boolean;
  plazoFijos: PaginatedData<PlazoFijoResponse> | null;
  getPaginatedPlazoFijo: (params: GetPaginated) => Promise<void>;
  registerPlazoFijo: (data: RegisterPlazoFijo) => Promise<void>;
  getStatisticsPlazoFijo: () => Promise<void>;
  statistics: StatisticsPlazoFijoResponse | null;
}
