import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type { BenefitResponse } from "../../types/BeneficeType";

export interface BenefitContextType {
  loading: boolean;
  getBenefits: () => void;
  getPaginatedBenefits: (params: GetPaginated) => Promise<void>;
  benefits: BenefitResponse[];
  paginatedBenefits: PaginatedData<BenefitResponse> | null;
}
