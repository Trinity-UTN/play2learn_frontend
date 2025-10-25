import { BaseBenefitService } from "../../../benefit/services/BaseBenefitService";
import type {
  CreateBenefitInterface,
  PaginatedBenefitResponseInterface,
} from "../../../benefit/types/benefit.types";
import type { GetPaginated } from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

export const BenefitTeacherService = {
  registerBenefitApi: async (data: CreateBenefitInterface): Promise<void> => {
    await api.post(urls.CreateBenefit, data);
  },

  getPaginatedBenefitsApi: (params: GetPaginated) =>
    BaseBenefitService.getPaginated<PaginatedBenefitResponseInterface>(
      urls.BenefitsPaginate,
      params
    ),

  getBenefitsApi: async () => {
    const response = await api.get(urls.Benefits);
    return response;
  },
};
