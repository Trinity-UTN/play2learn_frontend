import type {
  BenefitResponseInterface,
  BenefitUseRequestedResponseInterface,
  BenefitPurchaseSimpleResponse,
  CreateBenefitInterface,
  TeacherBenefitType,
} from "../../../benefit/types/benefit.types";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

export interface BenefitAPIContextType {
  // Estados generales
  loading: boolean;
  benefits: BenefitResponseInterface[];
  selectedBenefit: TeacherBenefitType | null;
  benefitPurchases: BenefitPurchaseSimpleResponse[];
  paginatedBenefits: PaginatedData<BenefitResponseInterface> | null;
  paginatedBenefitsUseRequested: PaginatedData<BenefitUseRequestedResponseInterface> | null;
  paginatedBenefitsPurchases: PaginatedData<BenefitPurchaseSimpleResponse> | null;

  // Funciones principales
  getBenefits: () => Promise<void>;
  getBenefitPurchases: (
    benefitId: number
  ) => Promise<BenefitPurchaseSimpleResponse[]>;
  getPaginatedBenefits: (params: GetPaginated) => Promise<void>;
  getPaginatedBenefitsUseRequested: (params: GetPaginated) => Promise<void>;
  getPaginatedBenefitsPurchases: (
    benefitId: number,
    params: GetPaginated
  ) => Promise<void>;
  registerBenefit: (data: CreateBenefitInterface) => Promise<void>;
  acceptUseBenefit: (benefitId: number) => Promise<void>;
  deleteBenefit: (benefitId: number) => Promise<void>;

  // Funciones auxiliares
  setSelectedBenefit: (benefit: TeacherBenefitType | null) => void;
  refreshBenefitsAfterDeletion: () => Promise<void>;
  refreshBenefitsAfterAcceptance: () => Promise<void>;
}
