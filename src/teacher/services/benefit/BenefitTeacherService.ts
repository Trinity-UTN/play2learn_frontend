import { BaseBenefitService } from "../../../benefit/services/BaseBenefitService";
import type {
  CreateBenefitInterface,
  BenefitPurchaseSimpleResponse,
  PaginatedBenefitResponseInterface,
  PaginatedBenefitUseRequestedResponseInterface,
  PaginatedBenefitPurchaseSimpleResponse,
} from "../../../benefit/types/benefit.types";
import { api, type GetPaginated } from "@/shared";
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

  getPaginatedBenefitPurchasesApi: (benefitId: number, params: GetPaginated) =>
    BaseBenefitService.getPaginated<PaginatedBenefitPurchaseSimpleResponse>(
      urls.PaginatedBenefitPurchases(benefitId),
      params
    ),

  registerBenefitApi: async (data: CreateBenefitInterface): Promise<void> => {
    await api.post(urls.CreateBenefit, data);
  },

  acceptUseBenefitApi: async (id: number): Promise<void> => {
    await api.patch(urls.AcceptUseBenefit(id));
  },

  deleteBenefitApi: async (benefitId: number): Promise<void> => {
    await api.delete(urls.DeleteBenefit(benefitId));
  },
};
