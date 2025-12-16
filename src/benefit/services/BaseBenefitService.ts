import qs from "qs";
import { buildCleanPaginatedParams, api, type GetPaginated } from "@/shared";

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
