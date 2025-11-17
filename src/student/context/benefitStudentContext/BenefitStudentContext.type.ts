import type {
  BenefitStudentResponseInterface,
  BenefitPurchasedUsedResponse,
  BenefitStatsResponse,
} from "../../../benefit/types/benefit.types";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

export interface BenefitStudentContextType {
  // Estados principales
  loading: boolean;
  paginatedBenefits:
    | PaginatedData<BenefitStudentResponseInterface>
    | PaginatedData<BenefitPurchasedUsedResponse>
    | null;
  benefitStats: BenefitStatsResponse | null;

  // Funciones Principales
  getPaginatedBenefitStudent: (params: GetPaginated) => Promise<void>;
  getPaginatedUsedBenefitStudent: (params: GetPaginated) => Promise<void>;
  purchaseBenefitStudent: (benefitId: number) => Promise<void>;
  requestUseBenefitStudent: (benefitId: number) => Promise<void>;
  getBenefitStudentStats: () => Promise<void>;
}
