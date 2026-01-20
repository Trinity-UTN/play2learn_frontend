import { api } from "@/shared"
import { urls } from "../urls"
import type { ActividadCreadaResponse } from "@/activity/types/ActividadCreada.type";

const getActividadCreada = async (
  id: number
): Promise<ActividadCreadaResponse> => {
  const response = await api.get(
    `${urls.ActividadCreada}/${id}`
  );
  const responseFinal: ActividadCreadaResponse = response.data.data
  return responseFinal;
};

export const ActividadCreadaService = {
  getActividadCreada
}

