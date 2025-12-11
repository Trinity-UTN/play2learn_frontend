import { api } from "@/shared";
import { urls } from "../urls";

const getStatisticsApi = async () => {
  const response = await api.get(urls.Statistics);
  return response;
};

export const StatisticsService = {
  getStatisticsApi,
};
