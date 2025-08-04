import type { ConfigurationActivity } from "../../types/Configuration.type";
import type { MemoramaInterface } from "../../types/Memorama.type";
import api from "../../../shared/utils/apiFormData";
import { urls } from "../urls";

export interface CreateMemoramaPayload
  extends ConfigurationActivity,
    MemoramaInterface {}

const registerMemoramaApi = async (
  data: CreateMemoramaPayload
): Promise<void> => {
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
