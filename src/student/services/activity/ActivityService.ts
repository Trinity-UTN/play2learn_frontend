import api from "../../../shared/utils/api";
import { urls } from "../urls";

const getActivityNotApprovedApi = async () => {
  const response = await api.get(urls.ActivityNotApproved);
  return response.data;
};

const getActivityApprovedApi = async () => {
  const response = await api.get(urls.ActivityApproved);
  return response.data;
};

export const ActivityStudentService = {
  getActivityNotApprovedApi,
  getActivityApprovedApi,
};
