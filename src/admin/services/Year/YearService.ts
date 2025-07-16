import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
import { urls } from "../urls";

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
  try {
    await api.post(urls.Years, data);
  } catch (error) {
    console.error("Error al crear el año:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const updateYearApi = async (data: UpdateYearPayload): Promise<void> => {
  try {
    await api.put(`${urls.Years}/${data.id}`, data);
  } catch (error) {
    console.error("Error al actualizar el año:", error); // TODO: REMOVE_DEBUG
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
  params: GetPaginated
): Promise<PaginatedYearResponse> => {
  try {
    const cleanParams = buildCleanPaginatedParams(params);

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
  updateYearApi,
  getYearApi,
  getPaginatedYearApi,
  deleteYearApi,
};
