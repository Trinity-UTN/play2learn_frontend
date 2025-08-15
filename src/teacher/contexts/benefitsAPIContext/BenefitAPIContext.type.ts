import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  BenefitResponseInterface,
  CreateBenefitInterface,
} from "../../types/BenefitType";

export interface BenefitAPIContextType {
  loading: boolean;
  getBenefits: () => void;
  getPaginatedBenefits: (params: GetPaginated) => Promise<void>;
  benefits: BenefitResponseInterface[];
  paginatedBenefits: PaginatedData<BenefitResponseInterface> | null;
  registerBenefit: (data: CreateBenefitInterface) => void;
}
