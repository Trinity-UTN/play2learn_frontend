import type { StoredFileResponseDto } from "@/shared/types";
import type { PaginatedData } from "@/shared";

export type ActivityCompletedState = "APPROVED" | "DISAPPROVED" | "PENDING";

export interface NoLudicaAttemptResponseDto {
  studentId: number;
  plainText: string;
  hasFile: boolean;
  fileData: StoredFileResponseDto | null;
}

export interface NoLudicaPendingActivityDto {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  difficulty: string;
  maxTime: number;
  subject: {
    id: number;
    name: string;
    course: {
      id: number;
      name: string;
      year: {
        id: number;
        name: string;
      };
    };
  };
  attempts: number;
  exercise: string;
}

export interface ActivityCompletedPendingDto {
  activityCompletedId: number;
  state: "PENDING";
  studentName: string;
  studentLastName: string;
  activityDto: NoLudicaPendingActivityDto;
}

export interface ActivityReviewNoLudicaRequestDto {
  activityCompletedId: number;
  studentId: number;
  state: "APPROVED" | "DISAPPROVED";
  score: number;
  comment?: string;
}

export interface AttemptReviewStoredData {
  activityName: string;
  activityDescription: string;
  studentFullName: string;
  attemptDate: string;
  activityCompletedId: number;
  studentId: number;
}

export interface PaginatedPendingNoLudicaResponse {
  data: PaginatedData<ActivityCompletedPendingDto>;
  message: string;
  errors: unknown;
  timestamp: string;
}
