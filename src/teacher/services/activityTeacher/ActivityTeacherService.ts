import qs from "qs";
import type { GetPaginated } from "../../../shared/types/PaginacionType";
import type { PaginatedActivityTeacherResponseInterface } from "../../types/TeacherActivity.type";
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
};
