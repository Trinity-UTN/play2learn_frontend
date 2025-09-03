import type { ConfigurationActivity } from "../../types/Configuration.type";
import type { ArbolDecisionInterface } from "../../types/ArbolDecision.type";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

export interface CreateArbolDeDecisionPayload
  extends ConfigurationActivity,
    ArbolDecisionInterface {}

const registerArbolDecisionApi = async (
  data: CreateArbolDeDecisionPayload
): Promise<void> => {
  await api.post(urls.ArbolDecision, data);
};

export const ArbolDecisionService = {
  registerArbolDecisionApi,
};
