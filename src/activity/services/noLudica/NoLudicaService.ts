import type { NewActivityConfiguration } from "../../types/Configuration.type";
import type { NoLudicaInterface } from "../../types/NoLudica.type";
import { api } from "@/shared";
import { urls } from "../urls";

export interface CreateNoLudicaPayload
  extends NewActivityConfiguration, NoLudicaInterface {}

const registerNoLudicaApi = async (
  data: CreateNoLudicaPayload,
): Promise<void> => {
  await api.post(urls.NoLudica, data);
};

export const NoLudicaService = {
  registerNoLudicaApi,
};
