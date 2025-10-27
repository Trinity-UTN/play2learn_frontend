import type {
  BenefitResponseInterface,
  BenefitUseRequestedResponseInterface,
  BenefitPurchaseSimpleResponse,
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
  selectedBenefit: BenefitPurchaseSimpleResponse | null;
  paginatedBenefits: PaginatedData<BenefitResponseInterface> | null;
  paginatedBenefitsUseRequested: PaginatedData<BenefitUseRequestedResponseInterface> | null;

  // Funciones principales
  getBenefits: () => Promise<void>;
  getBenefitDataById: (benefitId: number) => Promise<void>;
  getPaginatedBenefits: (params: GetPaginated) => Promise<void>;
  getPaginatedUBenefitsUseRequested: (params: GetPaginated) => Promise<void>;
  registerBenefit: (data: CreateBenefitInterface) => Promise<void>;
  acceptUseBenefit: (benefitId: number) => Promise<void>;
  deleteBenefit: (benefitId: number) => Promise<void>;
}
