import api from "../../../shared/utils/api";
import { urls } from "../urls";

export interface CreateYearPayload {
  name: string;
}
export interface GetYearPayload {
  id: number;
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
  content: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Es igual a GetYearPayload pero quería ponerle este nombre para que fuera más claro
export interface YearResponseDto {
  id: number;
  name: string;
}

export interface PaginatedYearResponse {
  data: PaginatedData<YearResponseDto>;
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
    const response = await api.get(urls.YearsPaginated, {
      params: {
        page: params.page ?? 1,
        page_size: params.page_size ?? 10,
        order_by: params.order_by ?? "id",
        order_type: params.order_type ?? "asc",
        search: params.search ?? "",
        filters: params.filters ?? [],
        filtersValues: params.filtersValues ?? [],
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener años paginados:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const deleteYearApi = async (id: number): Promise<void> => {
  try {
    console.log(`Eliminando año con ID: ${id}`);
    console.log(`${urls.Years}/${id}`);
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
