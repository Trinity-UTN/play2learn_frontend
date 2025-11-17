import api from "../../../shared/utils/api";
import { urls } from "../urls";

const getStatisticsApi = async () => {
  const response = await api.get(urls.statistics);
  return response;
};

export const StatisticsService = {
  getStatisticsApi,
};
