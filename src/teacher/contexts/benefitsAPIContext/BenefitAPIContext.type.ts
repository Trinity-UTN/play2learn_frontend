import type {
  BenefitResponseInterface,
  CreateBenefitInterface,
} from "../../types/Benefits.type";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

export interface BenefitAPIContextType {
  loading: boolean;
  benefits: BenefitResponseInterface[];
  paginatedBenefits: PaginatedData<BenefitResponseInterface> | null;
  registerBenefit: (data: CreateBenefitInterface) => void;
  getBenefits: () => void;
  getPaginatedBenefits: (params: GetPaginated) => Promise<void>;
}
