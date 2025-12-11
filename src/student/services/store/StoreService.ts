import qs from "qs";
import { buildCleanPaginatedParams, api, type GetPaginated } from "@/shared";
import type {
  BuyAspect,
  PaginatedAspectResponseInterface,
} from "../../types/AspectStore.type";
import { urls } from "../urls";

const getPaginatedAspectsApi = async (
  params: GetPaginated
): Promise<PaginatedAspectResponseInterface> => {
  const cleanParams = {
    ...buildCleanPaginatedParams(params),
    filters: params.filters?.join(","),
    filtersValues: params.filtersValues?.join(","),
  };
  const response = await api.get(urls.Aspect, {
    params: cleanParams,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};
const buyAspectApi = async (data: BuyAspect) => {
  const response = await api.post(urls.AspectToInventory, data);
  return response.data;
};

export const StoreService = {
  getPaginatedAspectsApi,
  buyAspectApi,
};
