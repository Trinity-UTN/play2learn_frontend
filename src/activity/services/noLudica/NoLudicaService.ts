import type { ConfigurationActivity } from "../../types/Configuration.type";
import type { NoLudicaInterface } from "../../types/NoLudica.type";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

export interface CreateNoLudicaPayload
  extends ConfigurationActivity,
    NoLudicaInterface {}

const registerNoLudicaApi = async (
  data: CreateNoLudicaPayload
): Promise<void> => {
  await api.post(urls.NoLudica, data);
};

export const NoLudicaService = {
  registerNoLudicaApi,
};
