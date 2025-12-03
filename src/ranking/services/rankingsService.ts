import api from "../../shared/utils/api";
import { urls } from "./urls";

const getRankingCoinsInstitucionApi = async () => {
  const response = await api.get(urls.coins_institucion);
  return response.data;
};
const getRankingCoinsCursoApi = async () => {
  const response = await api.get(urls.coins_curso);
  return response.data;
};
const getRankingCoinsMateriaApi = async (id: number) => {
  const response = await api.get(`${urls.coins_materia}/${id}`);
  return response.data;
};

const getRankingActivitiesInstitucionApi = async () => {
  const response = await api.get(urls.activities_institucion);
  return response.data;
};
const getRankingActivitiesCursoApi = async () => {
  const response = await api.get(urls.activities_curso);
  return response.data;
};
const getRankingActivitiesMateriaApi = async (id: number) => {
  const response = await api.get(`${urls.activities_materia}/${id}`);
  return response.data;
};

export const RankingServices = {
  getRankingCoinsInstitucionApi,
  getRankingCoinsCursoApi,
  getRankingCoinsMateriaApi,
  getRankingActivitiesInstitucionApi,
  getRankingActivitiesCursoApi,
  getRankingActivitiesMateriaApi,
};
