import qs from "qs";
import type { GetPaginated } from "../../../shared/types/PaginacionType";
import type {
  ActivityTeacherDetailsResponse,
  PaginatedActivityTeacherResponseInterface,
  SubjectCoursesYearsTeacherResponse,
} from "../../types/TeacherActivity.type";
import api from "../../../shared/utils/api";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";
import { urls } from "../urls";

export const ActivityTeacherService = {
  getPaginatedActivitiesTeacherApi: async (
    params: GetPaginated
  ): Promise<PaginatedActivityTeacherResponseInterface> => {
    const cleanParams = {
      ...buildCleanPaginatedParams(params),
      filters: params.filters?.join(","),
      filtersValues: params.filtersValues?.join(","),
    };
    const response = await api.get(urls.PaginatedActivitiesTeacher, {
      params: cleanParams,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });
    return response.data;
  },

  getActivityDetailsTeacherApi: async (
    activityId: number
  ): Promise<ActivityTeacherDetailsResponse> => {
    const response = await api.get(urls.DetailsActivityTeacher(activityId));
    return response.data.data;
  },

  getSubjectCoursesYearsTeacherApi:
    async (): Promise<SubjectCoursesYearsTeacherResponse> => {
      const response = await api.get(urls.SubjectCoursesYearsTeacher);
      return response.data.data;
    },
};
