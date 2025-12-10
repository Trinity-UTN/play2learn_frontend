import type { PaginatedData } from "../../shared/types/PaginacionType";

export interface CreateYearPayload {
  name: string;
}

export interface UpdateYearPayload {
  id: number;
  name: string;
}

export interface YearResponseDto {
  id: number;
  name: string;
}

export interface PaginatedYearResponse {
  data: PaginatedData<YearResponseDto>;
  message: string;
  errors: any;
  timestamp: string;
}
