import { urls } from "../urls";

import { api, buildCleanPaginatedParams, type GetPaginated } from "@/shared";
import type {
  CreateYearPayload,
  PaginatedYearResponse,
  UpdateYearPayload,
  YearResponseDto,
} from "../../types/year.types";

const registerYearApi = async (data: CreateYearPayload): Promise<void> => {
  await api.post(urls.Years, data);
};

const updateYearApi = async (data: UpdateYearPayload): Promise<void> => {
  await api.put(`${urls.Years}/${data.id}`, data);
};

const getYearApi = async () => {
  const response = await api.get(urls.Years);
  return response;
};

const getYearByIdApi = async (id: number): Promise<YearResponseDto> => {
  const response = await api.get(`${urls.Years}/${id}`);
  return response.data;
};

const getPaginatedYearApi = async (
  params: GetPaginated
): Promise<PaginatedYearResponse> => {
  const cleanParams = buildCleanPaginatedParams(params);
  const response = await api.get(urls.YearsPaginated, {
    params: cleanParams,
  });
  return response.data;
};

const deleteYearApi = async (id: number): Promise<void> => {
  await api.delete(`${urls.Years}/${id}`);
};

export const YearService = {
  registerYearApi,
  updateYearApi,
  getYearApi,
  getYearByIdApi,
  getPaginatedYearApi,
  deleteYearApi,
};
