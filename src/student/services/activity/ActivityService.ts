import api from "../../../shared/utils/api";
import { urls } from "../urls";

const getActivityNotApprovedApi = async () => {
  try {
    const response = await api.get(urls.ActivityNotApproved);

    return response.data;
  } catch (error) {
    console.error("Error al obtener las actividades:", error);
    throw error;
  }
};

const getActivityApprovedApi = async () => {
  try {
    const response = await api.get(urls.ActivityApproved);

    return response.data;
  } catch (error) {
    console.error("Error al obtener las actividades:", error);
    throw error;
  }
};

export const ActivityStudentService = {
  getActivityNotApprovedApi,
  getActivityApprovedApi,
};
