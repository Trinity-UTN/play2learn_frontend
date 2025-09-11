import type { GetPaginated } from "../../../shared/types/PaginacionType";
import api from "../../../shared/utils/api";
import { urls } from "../urls";
import type {
  PaginatedActivityApprovedResponseInterface,
  PaginatedActivityNotApprovedResponseInterface,
} from "../../types/Activity.type";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
const getActivityNotApprovedApi = async () => {
  const response = await api.get(urls.ActivityNotApproved);
  return response.data;
};

const getActivityApprovedApi = async () => {
  const response = await api.get(urls.ActivityApproved);
  return response.data;
};

const getActivityByIdApi = async (id: number) => {
  const response = await api.get(`${urls.ActivityById}/${id}`);
  return response.data;
};

const getPaginatedActivityApprovedApi = async (
  params: GetPaginated
): Promise<PaginatedActivityApprovedResponseInterface> => {
  const cleanParams = buildCleanPaginatedParams(params);
  const response = await api.get(urls.PaginatedActivityApproved, {
    params: cleanParams,
  });
  return response.data;
};
const getPaginatedActivityNotApprovedApi = async (
  params: GetPaginated
): Promise<PaginatedActivityNotApprovedResponseInterface> => {
  const cleanParams = buildCleanPaginatedParams(params);
  const response = await api.get(urls.PaginatedActivityNotApproved, {
    params: cleanParams,
  });
  return response.data;
};

export const ActivityStudentService = {
  getActivityNotApprovedApi,
  getActivityApprovedApi,
  getActivityByIdApi,
  getPaginatedActivityApprovedApi,
  getPaginatedActivityNotApprovedApi,
};
