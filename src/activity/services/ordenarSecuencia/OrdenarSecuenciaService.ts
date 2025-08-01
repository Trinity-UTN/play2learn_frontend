import api from "../../../shared/utils/api";
import { urls } from "../urls";

const registerOrdenarSecuenciaApi = async (data: FormData): Promise<void> => {
  try {
    await api.post(urls.OrdenarSecuencia, data);
  } catch (error) {
    console.error("Error al crear la actividad (ordenar secuencia):", error);
    throw error;
  }
};

export const OrdenarSecuenciaService = {
  registerOrdenarSecuenciaApi,
};
