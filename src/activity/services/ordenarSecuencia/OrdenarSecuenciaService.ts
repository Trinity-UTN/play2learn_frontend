import formDataApi from "../../../shared/utils/apiFormData";
import { urls } from "../urls";

const registerOrdenarSecuenciaApi = async (data: FormData): Promise<void> => {
  await formDataApi.post(urls.OrdenarSecuencia, data);
};

export const OrdenarSecuenciaService = {
  registerOrdenarSecuenciaApi,
};
