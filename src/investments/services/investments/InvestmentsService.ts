import qs from "qs";
import type { GetPaginated } from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
import { urls } from "../urls";
import type { InvestmentsPaginatedResponseInterface } from "../../types/investment.type";

const getPaginatedInvestmentsApi = async (
  params: GetPaginated
): Promise<InvestmentsPaginatedResponseInterface> => {
  const cleanParams = {
    ...buildCleanPaginatedParams(params),
    filters: params.filters?.join(","),
    filtersValues: params.filtersValues?.join(","),
  };
  const response = await api.get(urls.InvestmentsPaginated, {
    params: cleanParams,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};

const getCandleStickValues = async (id: number) => {
  const response = await api.get(`${urls.CandleStickValues}${id}`);
  return response.data;
};

export const InvestmentsService = {
  getPaginatedInvestmentsApi,
  getCandleStickValues,
};
