import api from "../../../shared/utils/api";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import type { CreateClassification } from "../../types/DesafioClasificacion.type";
import { urls } from "../urls";

export interface CreateDesafioClasificacionPayload
  extends ConfigurationActivity,
    CreateClassification {}

const registerDesafioClasificacionApi = async (
  data: CreateDesafioClasificacionPayload
): Promise<void> => {
  try {
    await api.post(urls.DesafioClasificacion, data);
  } catch (error) {
    console.error(
      "Error al crear la actividad (desafio clasificacion):",
      error
    );
    throw error;
  }
};

export const DesafioClasificacionService = {
  registerDesafioClasificacionApi,
};
