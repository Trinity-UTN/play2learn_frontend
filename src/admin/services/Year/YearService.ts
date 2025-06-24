import api from "../../../shared/utils/api";
import { urls } from "../../urls";

export interface CreateYearPayload {
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

export const YearService = {
  registerYearApi,
};
