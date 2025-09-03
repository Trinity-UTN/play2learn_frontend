import type { ConfigurationActivity } from "../../types/Configuration.type";
import type { AhorcadoInterface } from "../../types/Ahorcado.type";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

export interface CreateAhorcadoPayload
  extends ConfigurationActivity,
    AhorcadoInterface {}

const registerAhorcadoApi = async (
  data: CreateAhorcadoPayload
): Promise<void> => {
  await api.post(urls.Ahorcado, data);
};

export const AhorcadoService = {
  registerAhorcadoApi,
};
