import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  PlazoFijoResponse,
  RegisterPlazoFijo,
} from "../../types/plazoFijo.type";

export interface PlazoFijoContextType {
  // Estados principales
  loading: boolean;
  plazoFijos: PaginatedData<PlazoFijoResponse> | null;
  getPaginatedPlazoFijo: (params: GetPaginated) => Promise<void>;
  registerPlazoFijo: (data: RegisterPlazoFijo) => Promise<void>;
}
