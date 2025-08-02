import formDataApi from "../../../shared/utils/apiFormData";
import { urls } from "../urls";

const registerOrdenarSecuenciaApi = async (data: FormData): Promise<void> => {
  try {
    await formDataApi.post(urls.OrdenarSecuencia, data);
  } catch (error) {
    console.error("Error al crear la actividad (ordenar secuencia):", error);
    throw error;
  }
};

export const OrdenarSecuenciaService = {
  registerOrdenarSecuenciaApi,
};
