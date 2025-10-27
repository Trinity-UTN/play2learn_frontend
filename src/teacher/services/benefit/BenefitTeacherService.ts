import { BaseBenefitService } from "../../../benefit/services/BaseBenefitService";
import type {
  CreateBenefitInterface,
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

  getBenefitDataByIdApi: async (benefitId: number) => {
    const response = await api.get(urls.BenefitById(benefitId));
    return response;
  },

  getPaginatedBenefitsApi: (params: GetPaginated) =>
    BaseBenefitService.getPaginated<PaginatedBenefitResponseInterface>(
      urls.PaginatedBenefitTeacher,
      params
    ),

  getPaginatedUBenefitsUseRequestedApi: (params: GetPaginated) =>
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
