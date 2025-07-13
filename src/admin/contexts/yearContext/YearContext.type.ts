import type {
  CreateYearPayload,
  UpdateYearPayload,
  GetPaginatedYearPayload,
  PaginatedData,
  YearResponseDto,
} from "../../services/year/YearService";

export interface YearContextType {
  loading: boolean;
  registerYear: (data: CreateYearPayload) => Promise<void>;
  updateYear: (data: UpdateYearPayload) => Promise<void>;
  getYear: () => void;
  getPaginatedYear: (params: GetPaginatedYearPayload) => Promise<void>;
  deleteYear: (id: number) => Promise<void>;
  years: YearResponseDto[];
  paginatedYears: PaginatedData<YearResponseDto> | null;
}
