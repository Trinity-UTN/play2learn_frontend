import { api } from "@/shared"
import { urls } from "../urls"
import type { ActividadCreadaResponse } from "@/activity/types/ActividadCreada.type";

const getActividadCreada = async <T extends object>(
  id: number
): Promise<ActividadCreadaResponse<T>> => {
  const response = await api.get(
    `${urls.ActividadCreada}/${id}`
  );
  const responseFinal: ActividadCreadaResponse<T> = response.data.data
  return responseFinal;
};

export const ActividadCreadaService = {
  getActividadCreada
}

