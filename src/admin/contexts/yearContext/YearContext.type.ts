import type {
  CreateYearPayload,
  GetYearPayload,
  GetPaginatedYearPayload,
  PaginatedData,
  YearResponseDto,
} from "../../services/year/YearService";

export interface YearContextType {
  loading: boolean;
  registerYear: (data: CreateYearPayload) => Promise<void>;
  getYear: () => void;
  getPaginatedYear: (params: GetPaginatedYearPayload) => Promise<void>;
  deleteYear: (id: number) => Promise<void>;
  years: GetYearPayload[];
  paginatedYears: PaginatedData<YearResponseDto> | null;
}
