import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
import { urls } from "../urls";
import type { BenefitResponseInterface } from "../../types/BenefitType";
import qs from "qs";
export interface CreateYearPayload {
  name: string;
}

export interface PaginatedBenefitsResponse {
  data: PaginatedData<BenefitResponseInterface>;
  message: string;
  errors: any;
  timestamp: string;
}

const registerBenefitApi = async (data: CreateYearPayload): Promise<void> => {
  await api.post(urls.CreateBenefit, data);
};

const getBenefitsApi = async () => {
  const response = await api.get(urls.Benefits);
  return response;
};

const getPaginatedBenefitsApi = async (
  params: GetPaginated
): Promise<PaginatedBenefitsResponse> => {
  const cleanParams = buildCleanPaginatedParams(params);
  const response = await api.get(urls.BenefitsPaginate, {
    params: cleanParams,
    paramsSerializer: (params) => qs.stringify(params, { indices: false }),
  });
  return response.data;
};

// const deleteBenefitApi = async (id: number): Promise<void> => {
//   await api.delete(`${urls.Benefits}/${id}`);
// };

export const BenefitsService = {
  registerBenefitApi,
  getBenefitsApi,
  getPaginatedBenefitsApi,
};
