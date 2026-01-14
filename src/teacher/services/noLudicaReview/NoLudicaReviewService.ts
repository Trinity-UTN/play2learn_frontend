import qs from "qs";
import { api, buildCleanPaginatedParams, type GetPaginated } from "@/shared";
import { urls } from "../urls";
import type {
  NoLudicaAttemptResponseDto,
  ActivityReviewNoLudicaRequestDto,
  PaginatedPendingNoLudicaResponse,
} from "../../types/NoLudicaReview.type";

export const NoLudicaReviewService = {
  getPendingPaginatedApi: async (
    params: GetPaginated
  ): Promise<PaginatedPendingNoLudicaResponse> => {
    const cleanParams = buildCleanPaginatedParams(params);
    const response = await api.get(urls.PendingNoLudicaPaginated, {
      params: cleanParams,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });
    return response.data;
  },

  getAttemptApi: async (
    activityCompletedId: number
  ): Promise<NoLudicaAttemptResponseDto> => {
    const response = await api.get(urls.NoLudicaAttempt(activityCompletedId));
    return response.data.data;
  },

  submitReviewApi: async (
    data: ActivityReviewNoLudicaRequestDto
  ): Promise<void> => {
    await api.post(urls.ReviewNoLudica, data);
  },
};
