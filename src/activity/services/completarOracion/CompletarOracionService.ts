import type { ConfigurationActivity } from "../../types/Configuration.type";
import type { CompletarOracionInterface } from "../../types/CompletarOracion.type";
import { api } from "@/shared";
import { urls } from "../urls";

export interface CreateCompletarOracionPayload
  extends ConfigurationActivity,
    CompletarOracionInterface {}

const registerCompletarOracionApi = async (
  data: CreateCompletarOracionPayload
): Promise<void> => {
  await api.post(urls.CompletarOracion, data);
};

export const CompletarOracionService = {
  registerCompletarOracionApi,
};
