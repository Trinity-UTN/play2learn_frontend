import qs from "qs";
import type { GetPaginated } from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";

import { urls } from "../urls";
import type {
  CajaDeAhorroPaginatedResponseInterface,
  MovimientoCajaDeAhorro,
  RegisterCajaDeAhorro,
} from "../../types/cajaAhorro.type";

const getPaginatedCajaDeAhorroApi = async (
  params: GetPaginated
): Promise<CajaDeAhorroPaginatedResponseInterface> => {
  const cleanParams = {
    ...buildCleanPaginatedParams(params),
    filters: params.filters?.join(","),
    filtersValues: params.filtersValues?.join(","),
  };
  const response = await api.get(urls.CajaDeAhorroPaginated, {
    params: cleanParams,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};

const registerCajaDeAhorroApi = async (
  data: RegisterCajaDeAhorro
): Promise<void> => {
  await api.post(urls.CreatedCajaDeAhorro, data);
};
const depositCajaDeAhorroApi = async (
  data: MovimientoCajaDeAhorro
): Promise<void> => {
  await api.post(urls.DepositCajaDeAhorro, data);
};
const withdrawalCajaDeAhorroApi = async (
  data: MovimientoCajaDeAhorro
): Promise<void> => {
  await api.post(urls.WithdrawalCajaDeAhorro, data);
};
const deleteCajaDeAhorroApi = async (id: number): Promise<void> => {
  await api.delete(`${urls.CreatedCajaDeAhorro}/${id}`);
};

export const CajaDeAhorroService = {
  getPaginatedCajaDeAhorroApi,
  registerCajaDeAhorroApi,
  depositCajaDeAhorroApi,
  withdrawalCajaDeAhorroApi,
  deleteCajaDeAhorroApi,
};
