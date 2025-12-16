import type { GetPaginated, PaginatedData } from "@/shared";
import type { BuyAspect } from "../../types/AspectStore.type";
import type { BodyPart } from "../../types/CurrentStudent.type";

export interface StoreContextType {
  // Estados principales
  loading: boolean;
  aspects: PaginatedData<BodyPart> | null;
  getPaginatedAspects: (params: GetPaginated) => Promise<void>;
  buyAspect: (data: BuyAspect) => void;
}
