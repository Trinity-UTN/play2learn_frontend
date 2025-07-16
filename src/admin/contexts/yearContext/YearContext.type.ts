import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  CreateYearPayload,
  UpdateYearPayload,
  YearResponseDto,
} from "../../services/year/YearService";

export interface YearContextType {
  loading: boolean;
  registerYear: (data: CreateYearPayload) => Promise<void>;
  updateYear: (data: UpdateYearPayload) => Promise<void>;
  getYear: () => void;
  getYearById: (id: number) => Promise<YearResponseDto>;
  getPaginatedYear: (params: GetPaginated) => Promise<void>;
  deleteYear: (id: number) => Promise<void>;
  years: YearResponseDto[];
  paginatedYears: PaginatedData<YearResponseDto> | null;
}
