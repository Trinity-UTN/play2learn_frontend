import type { ConfigurationActivity } from "../../types/Configuration.type";
import type { PreguntadosInterface } from "../../types/Preguntados.type";
import { api } from "@/shared";
import { urls } from "../urls";

export interface CreatePreguntadosPayload
  extends ConfigurationActivity,
    PreguntadosInterface {}

const registerPreguntadosApi = async (
  data: CreatePreguntadosPayload
): Promise<void> => {
  await api.post(urls.Preguntados, data);
};

export const PreguntadosService = {
  registerPreguntadosApi,
};
