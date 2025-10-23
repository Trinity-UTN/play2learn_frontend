import type { GetPaginated } from "../../../shared/types/PaginacionType";
import type {
  ActivityCompletedInterface,
  ActivityCompletedResponseInterface,
} from "../../types/ActivityCompleted.type";
import api from "../../../shared/utils/api";
import { urls } from "../urls";
import type {
  ActivityStatsApiResponse,
  PaginatedActivityApprovedResponseInterface,
  PaginatedActivityNotApprovedResponseInterface,
} from "../../types/Activity.type";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
import qs from "qs";
import apiFormData from "../../../shared/utils/apiFormData";

const getActivityNotApprovedApi = async () => {
  const response = await api.get(urls.ActivityNotApproved);
  return response.data;
};

const getActivityApprovedApi = async () => {
  const response = await api.get(urls.ActivityApproved);
  return response.data;
};

const getPaginatedActivityNotApprovedApi = async (
  params: GetPaginated
): Promise<PaginatedActivityNotApprovedResponseInterface> => {
  const cleanParams = {
    ...buildCleanPaginatedParams(params),
    filters: params.filters?.join(","),
    filtersValues: params.filtersValues?.join(","),
  };
  const response = await api.get(urls.PaginatedActivityNotApproved, {
    params: cleanParams,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};

const getPaginatedActivityApprovedApi = async (
  params: GetPaginated
): Promise<PaginatedActivityApprovedResponseInterface> => {
  const preParams: GetPaginated = {
    ...params,
    filtersValues: params.filtersValues
      ?.map((value) => (value === "ALL" ? undefined : value))
      .filter((v): v is string => v !== undefined),
    filters: params.filters?.filter(
      (_, index) => params.filtersValues?.[index] !== "ALL"
    ),
  };
  const cleanParams = {
    ...buildCleanPaginatedParams(preParams),
    filters: preParams.filters?.join(","),
    filtersValues: preParams.filtersValues?.join(","),
  };
  const response = await api.get(urls.PaginatedActivityApproved, {
    params: cleanParams,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};

const getActivityByIdApi = async (id: number) => {
  const response = await api.get(`${urls.ActivityById}/${id}`);
  return response.data;
};

const getActivityStudentStatsApi =
  async (): Promise<ActivityStatsApiResponse> => {
    const response = await api.get(urls.ActivityStudentStats);
    return response.data;
  };

const registerActivityStartedApi = async (
  id: number
): Promise<{ data: ActivityCompletedResponseInterface }> => {
  const response = await api.post(urls.ActivityStarted, null, {
    params: { activityId: id },
  });
  return response.data;
};

const registerActivityCompletedApi = async (
  payload: ActivityCompletedInterface
): Promise<{ data: ActivityCompletedResponseInterface }> => {
  const response = await api.post(urls.ActivityCompleted, payload);

  return response.data;
};

const registerActivityNoLudicaCompleteApi = async (data: FormData) => {
  const response = await apiFormData.post(urls.ActivityNoLudicaComplete, data);
  return response.data;
};

export const ActivityStudentService = {
  getActivityNotApprovedApi,
  getActivityApprovedApi,
  getPaginatedActivityNotApprovedApi,
  getPaginatedActivityApprovedApi,
  getActivityByIdApi,
  getActivityStudentStatsApi,
  registerActivityStartedApi,
  registerActivityCompletedApi,
  registerActivityNoLudicaCompleteApi,
};
