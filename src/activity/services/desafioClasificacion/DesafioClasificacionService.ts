import { api } from "@/shared";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import type { CreateClassification } from "../../types/DesafioClasificacion.type";
import { urls } from "../urls";

export interface CreateDesafioClasificacionPayload
  extends ConfigurationActivity,
    CreateClassification {}

const registerDesafioClasificacionApi = async (
  data: CreateDesafioClasificacionPayload
): Promise<void> => {
  await api.post(urls.DesafioClasificacion, data);
};

export const DesafioClasificacionService = {
  registerDesafioClasificacionApi,
};
