import { BaseBenefitService } from "../../../benefit/services/BaseBenefitService";
import type {
  CreateBenefitInterface,
  BenefitPurchaseSimpleResponse,
  PaginatedBenefitResponseInterface,
  PaginatedBenefitUseRequestedResponseInterface,
} from "../../../benefit/types/benefit.types";
import type { GetPaginated } from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

export const BenefitTeacherService = {
  getBenefitsApi: async () => {
    const response = await api.get(urls.Benefits);
    return response;
  },

  getBenefitPurchasesApi: async (benefitId: number) => {
    const response = await api.get<{
      data: BenefitPurchaseSimpleResponse[];
      message: string;
      errors: any;
      timestamp: string;
    }>(urls.BenefitPurchases(benefitId));
    return response;
  },

  getPaginatedBenefitsApi: (params: GetPaginated) =>
    BaseBenefitService.getPaginated<PaginatedBenefitResponseInterface>(
      urls.PaginatedBenefitTeacher,
      params
    ),

  getPaginatedBenefitsUseRequestedApi: (params: GetPaginated) =>
    BaseBenefitService.getPaginated<PaginatedBenefitUseRequestedResponseInterface>(
      urls.PaginatedBenefitUseRequested,
      params
    ),

  registerBenefitApi: async (data: CreateBenefitInterface): Promise<void> => {
    await api.post(urls.CreateBenefit, data);
  },

  acceptUseBenefitApi: async (benefitId: number): Promise<void> => {
    await api.patch(urls.AcceptUseBenefit(benefitId));
  },

  deleteBenefitApi: async (benefitId: number): Promise<void> => {
    await api.delete(urls.DeleteBenefit(benefitId));
  },
};
