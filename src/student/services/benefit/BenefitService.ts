import qs from "qs";
import type { GetPaginated } from "../../../shared/types/PaginacionType";
import type { PaginatedBenefitStudentResponseInterface } from "../../../shared/types/Benefits.type";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

const getPaginatedBenefitStudentApi = async (
  params: GetPaginated
): Promise<PaginatedBenefitStudentResponseInterface> => {
  const cleanParams = {
    ...buildCleanPaginatedParams(params),
    filters: params.filters?.join(","),
    filtersValues: params.filtersValues?.join(","),
  };
  const response = await api.get(urls.PaginatedBenefitStudent, {
    params: cleanParams,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};

const purchaseBenefitStudentApi = async (benefitId: number): Promise<void> => {
  await api.post(urls.PurchaseBenefitStudent, { benefitId });
};

const requestUseBenefitStudentApi = async (
  benefitId: number
): Promise<void> => {
  await api.patch(urls.RequestUseBenefitStudent(benefitId));
};

export const BenefitService = {
  getPaginatedBenefitStudentApi,
  purchaseBenefitStudentApi,
  requestUseBenefitStudentApi,
};
