import qs from "qs";
import type { GetPaginated } from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
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
  const response = await api.get(urls.ActionsPaginated, {
    params: cleanParams,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};

const registerPlazoFijoApi = async (data: RegisterPlazoFijo): Promise<void> => {
  await api.post(urls.CreatePlazoFijo, data);
};

export const PlazoFijoService = {
  getPaginatedPlazoFijosApi,
  registerPlazoFijoApi,
};
