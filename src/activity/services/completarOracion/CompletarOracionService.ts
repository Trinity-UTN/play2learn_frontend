import type { ConfigurationActivity } from "../../types/Configuration.type";
import type { CompletarOracionInterface } from "../../types/CompletarOracion.type";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

export interface CreateCompletarOracionPayload
  extends ConfigurationActivity,
    CompletarOracionInterface {}

const registerCompletarOracionApi = async (
  data: CreateCompletarOracionPayload
): Promise<void> => {
  try {
    await api.post(urls.CompletarOracion, data);
  } catch (error) {
    console.error("Error al crear la actividad (completar oración):", error);
    throw error;
  }
};

export const CompletarOracionService = {
  registerCompletarOracionApi,
};
