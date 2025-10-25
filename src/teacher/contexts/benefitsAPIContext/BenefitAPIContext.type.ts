import type {
  BenefitResponseInterface,
  CreateBenefitInterface,
} from "../../../benefit/types/benefit.types";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

export interface BenefitAPIContextType {
  // Estados generales
  loading: boolean;
  benefits: BenefitResponseInterface[];
  paginatedBenefits: PaginatedData<BenefitResponseInterface> | null;

  // Funciones principales
  registerBenefit: (data: CreateBenefitInterface) => Promise<void>;
  getBenefits: () => Promise<void>;
  getPaginatedBenefits: (params: GetPaginated) => Promise<void>;
}
