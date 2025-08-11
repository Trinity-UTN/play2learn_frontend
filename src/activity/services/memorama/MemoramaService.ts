import api from "../../../shared/utils/apiFormData";
import { urls } from "../urls";

const registerMemoramaApi = async (data: FormData): Promise<void> => {
  try {
    await api.post(urls.Memorama, data);
  } catch (error) {
    console.error("Error al crear la actividad (memorama):", error);
    throw error;
  }
};

export const MemoramaService = {
  registerMemoramaApi,
};
