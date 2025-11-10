import qs from "qs";
import { buildCleanPaginatedParams } from "../../shared/utils/apiUtils";
import api from "../../shared/utils/api";
import type { GetPaginated } from "../../shared/types/PaginacionType";

export const BaseBenefitService = {
  async getPaginated<T>(url: string, params: GetPaginated): Promise<T> {
    const cleanParams = buildCleanPaginatedParams(params);
    const response = await api.get(url, {
      params: cleanParams,
      paramsSerializer: (params) => qs.stringify(params, { indices: false }),
    });
    return response.data;
  },
};
