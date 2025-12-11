import { BaseBenefitService } from "../../../benefit/services/BaseBenefitService";
import type {
  BenefitStatsApiResponse,
  PaginatedBenefitStudentResponseInterface,
  PaginatedBenefitPurchasedUsedResponse,
} from "../../../benefit/types/benefit.types";
import { api, type GetPaginated } from "@/shared";
import { urls } from "../urls";

export const BenefitStudentService = {
  getPaginatedBenefitStudentApi: (params: GetPaginated) =>
    BaseBenefitService.getPaginated<PaginatedBenefitStudentResponseInterface>(
      urls.PaginatedBenefitStudent,
      params
    ),

  getPaginatedUsedBenefitStudentApi: (params: GetPaginated) =>
    BaseBenefitService.getPaginated<PaginatedBenefitPurchasedUsedResponse>(
      urls.PaginatedUsedBenefitStudent,
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
