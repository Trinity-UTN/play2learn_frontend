import api from "../../../shared/utils/api";
import { urls } from "../../urls";

export interface CreateYearPayload {
  name: string;
}
export interface GetYearPayload {
  id: number;
  name: string;
}

const registerYearApi = async (data: CreateYearPayload): Promise<void> => {
  try {
    await api.post(urls.Years, data);
  } catch (error) {
    console.error("Error al crear el año:", error);
    throw error;
  }
};

const getYearApi = async () => {
  try {
    const response = await api.get(urls.Years);
    return response;
  } catch (error) {
    console.error("Error al obtener los años:", error);
    throw error;
  }
};

export const YearService = {
  registerYearApi,
  getYearApi,
};
