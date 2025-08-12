import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
import { urls } from "../urls";
import type { BenefitResponse } from "../../types/BeneficeType";

export interface CreateYearPayload {
  name: string;
}

export interface PaginatedBenefitsResponse {
  data: PaginatedData<BenefitResponse>;
  message: string;
  errors: any;
  timestamp: string;
}

const registerBenefitApi = async (data: CreateYearPayload): Promise<void> => {
  try {
    await api.post(urls.CreateBenefit, data);
  } catch (error) {
    console.error("Error al crear el beneficio:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getBenefitsApi = async () => {
  try {
    const response = await api.get(urls.Benefits);
    return response;
  } catch (error) {
    console.error("Error al obtener los beneficios:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getPaginatedBenefitsApi = async (
  params: GetPaginated
): Promise<PaginatedBenefitsResponse> => {
  try {
    const cleanParams = buildCleanPaginatedParams(params);

    const response = await api.get(urls.BenefitsPaginate, {
      params: cleanParams,
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener beneficios paginados:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

// const deleteBenefitApi = async (id: number): Promise<void> => {
//   try {
//     //console.log(`Eliminando año con ID: ${id}`); // TODO: REMOVE_DEBUG
//     await api.delete(`${urls.Benefits}/${id}`);
//   } catch (error) {
//     console.error("Error al eliminar el año:", error); // TODO: REMOVE_DEBUG
//     throw error;
//   }
// };

export const BenefitsService = {
  registerBenefitApi,
  getBenefitsApi,
  getPaginatedBenefitsApi,
};
