import api from "../../../shared/utils/apiFormData";
import { urls } from "../urls";

const registerMemoramaApi = async (data: FormData): Promise<void> => {
  await api.post(urls.Memorama, data);
};

export const MemoramaService = {
  registerMemoramaApi,
};
