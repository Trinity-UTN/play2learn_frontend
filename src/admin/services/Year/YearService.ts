import api from "../../../shared/utils/api";
import { urls } from "../urls";

export interface CreateYearPayload {
  name: string;
}

export interface GetPaginatedYearPayload {
  page?: number;
  page_size?: number;
  order_by?: string;
  order_type?: "asc" | "desc";
  search?: string;
  filters?: string[];
  filtersValues?: string[];
}

export interface PaginatedData<T> {
  results: T[];
  currentPage: number;
  pageSize: number;
  count: number;
  totalPages: number;
}

export interface YearResponseDto {
  id: number;
  name: string;
}

export interface BaseResponse<T> {
  data: T;
  message: string;
  errors: any;
  timestamp: string;
}

export interface PaginatedYearResponse {
  data: PaginatedData<YearResponseDto>;
  message: string;
  errors: any;
  timestamp: string;
}

const registerYearApi = async (data: CreateYearPayload): Promise<void> => {
  try {
    await api.post(urls.Years, data);
  } catch (error) {
    console.error("Error al crear el año:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getYearApi = async () => {
  try {
    const response = await api.get(urls.Years);
    return response;
  } catch (error) {
    console.error("Error al obtener los años:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getPaginatedYearApi = async (
  params: GetPaginatedYearPayload
): Promise<PaginatedYearResponse> => {
  try {
    // Filtrar parámetros undefined/null para evitar enviar valores vacíos
    const cleanParams: any = {};

    if (params.page !== undefined) cleanParams.page = params.page;
    if (params.page_size !== undefined)
      cleanParams.page_size = params.page_size;
    if (params.order_by !== undefined) cleanParams.order_by = params.order_by;
    if (params.order_type !== undefined)
      cleanParams.order_type = params.order_type;
    if (params.search !== undefined && params.search !== "")
      cleanParams.search = params.search;
    if (params.filters !== undefined && params.filters.length > 0)
      cleanParams.filters = params.filters;
    if (params.filtersValues !== undefined && params.filtersValues.length > 0)
      cleanParams.filtersValues = params.filtersValues;

    //console.log("Params:", cleanParams); // TODO: REMOVE_DEBUG
    const response = await api.get(urls.YearsPaginated, {
      params: cleanParams,
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener años paginados:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const deleteYearApi = async (id: number): Promise<void> => {
  try {
    //console.log(`Eliminando año con ID: ${id}`); // TODO: REMOVE_DEBUG
    await api.delete(`${urls.Years}/${id}`);
  } catch (error) {
    console.error("Error al eliminar el año:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const YearService = {
  registerYearApi,
  getYearApi,
  getPaginatedYearApi,
  deleteYearApi,
};
