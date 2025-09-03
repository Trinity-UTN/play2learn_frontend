import { urls } from "../urls";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";

export interface CreateYearPayload {
  name: string;
}

export interface UpdateYearPayload {
  id: number;
  name: string;
}

export interface YearResponseDto {
  id: number;
  name: string;
}

export interface PaginatedYearResponse {
  data: PaginatedData<YearResponseDto>;
  message: string;
  errors: any;
  timestamp: string;
}

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
