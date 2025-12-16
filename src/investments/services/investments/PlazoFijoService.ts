import qs from "qs";
import { api, type GetPaginated, buildCleanPaginatedParams } from "@/shared";
import type {
  PlazoFijoPaginatedResponseInterface,
  RegisterPlazoFijo,
} from "../../types/plazoFijo.type";
import { urls } from "../urls";

const getPaginatedPlazoFijosApi = async (
  params: GetPaginated
): Promise<PlazoFijoPaginatedResponseInterface> => {
  const cleanParams = {
    ...buildCleanPaginatedParams(params),
    filters: params.filters?.join(","),
    filtersValues: params.filtersValues?.join(","),
  };
  const response = await api.get(urls.PlazoFijosPaginated, {
    params: cleanParams,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};

const registerPlazoFijoApi = async (data: RegisterPlazoFijo): Promise<void> => {
  await api.post(urls.CreatePlazoFijo, data);
};

const getStatisticsPlazoFijoApi = async () => {
  const response = await api.get(urls.StatisticsPlazoFijo);
  return response.data;
};

export const PlazoFijoService = {
  getPaginatedPlazoFijosApi,
  registerPlazoFijoApi,
  getStatisticsPlazoFijoApi,
};
