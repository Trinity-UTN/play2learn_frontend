import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type { BodyPart } from "../../types/CurrentStudent.type";

export interface StoreContextType {
  // Estados principales
  loading: boolean;
  aspects: PaginatedData<BodyPart> | null;
  getPaginatedAspects: (params: GetPaginated) => Promise<void>;
}
