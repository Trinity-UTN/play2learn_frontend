import type { ConfigurationActivity } from "../../types/Configuration.type";
import type { PreguntadosInterface } from "../../types/Preguntados.type";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

export interface CreatePreguntadosPayload
  extends ConfigurationActivity,
    PreguntadosInterface {}

const registerPreguntadosApi = async (
  data: CreatePreguntadosPayload
): Promise<void> => {
  try {
    await api.post(urls.Preguntados, data);
  } catch (error) {
    console.error("Error al crear la actividad (preguntados):", error);
    throw error;
  }
};

export const PreguntadosService = {
  registerPreguntadosApi,
};
