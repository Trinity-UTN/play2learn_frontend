import { BaseBenefitService } from "../../../benefit/services/BaseBenefitService";
import type {
  BenefitStatsApiResponse,
  PaginatedBenefitStudentResponseInterface,
} from "../../../benefit/types/benefit.types";
import type { GetPaginated } from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

export const BenefitStudentService = {
  getPaginatedBenefitStudentApi: (params: GetPaginated) =>
    BaseBenefitService.getPaginated<PaginatedBenefitStudentResponseInterface>(
      urls.PaginatedBenefitStudent,
      params
    ),

  getBenefitStudentStatsApi: async (): Promise<BenefitStatsApiResponse> => {
    const response = await api.get(urls.BenefitStudentStats);
    return response.data;
  },

  purchaseBenefitStudentApi: async (benefitId: number): Promise<void> => {
    await api.post(urls.PurchaseBenefitStudent, { benefitId });
  },

  requestUseBenefitStudentApi: async (benefitId: number): Promise<void> => {
    await api.patch(urls.RequestUseBenefitStudent(benefitId));
  },
};
