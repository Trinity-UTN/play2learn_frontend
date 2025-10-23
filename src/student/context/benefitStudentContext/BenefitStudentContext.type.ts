import type {
  BenefitStudentResponseInterface,
  BenefitStatsResponse,
} from "../../../shared/types/Benefits.type";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

export interface BenefitStudentContextType {
  // Estados principales
  loading: boolean;
  paginatedBenefits: PaginatedData<BenefitStudentResponseInterface> | null;
  benefitStats: BenefitStatsResponse | null;

  // Funciones Principales
  getPaginatedBenefitStudent: (params: GetPaginated) => Promise<void>;
  purchaseBenefitStudent: (benefitId: number) => Promise<void>;
  requestUseBenefitStudent: (benefitId: number) => Promise<void>;
  getBenefitStudentStats: () => Promise<void>;
}
