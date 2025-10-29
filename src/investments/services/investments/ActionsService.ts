import qs from "qs";
import type { GetPaginated } from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
import { urls } from "../urls";
import type {
  ActionsPaginatedResponseInterface,
  RangeValue,
  TradeActionsRequest,
  TradeActionStopLimitRequest,
} from "../../types/actions.type";

const getPaginatedActionsApi = async (
  params: GetPaginated
): Promise<ActionsPaginatedResponseInterface> => {
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

const getCandleStickValues = async (id: number, range: RangeValue) => {
  const response = await api.get(urls.CandleStickValues, {
    params: { stockId: id, rangeValue: range },
  });
  return response.data;
};

const buyActionsApi = async (data: TradeActionsRequest) => {
  const response = await api.post(urls.BuyActions, data);
  return response.data;
};
const sellActionsApi = async (data: TradeActionsRequest) => {
  const response = await api.post(urls.SellActions, data);
  return response.data;
};

const stopActionApi = async (data: TradeActionStopLimitRequest) => {
  const response = await api.post(urls.StopActions, data);
  return response.data;
};

export const ActionsService = {
  getPaginatedActionsApi,
  getCandleStickValues,
  buyActionsApi,
  sellActionsApi,
  stopActionApi,
};
