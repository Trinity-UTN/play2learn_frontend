import type { GetPaginated, PaginatedData } from "@/shared";
import type {
  CreateYearPayload,
  UpdateYearPayload,
  YearResponseDto,
} from "../../types/year.types";

export interface YearContextType {
  loading: boolean;
  years: YearResponseDto[];
  paginatedYears: PaginatedData<YearResponseDto> | null;
  selectedYear: YearResponseDto | null;
  registerYear: (data: CreateYearPayload) => Promise<void>;
  updateYear: (data: UpdateYearPayload) => Promise<void>;
  getYear: () => void;
  getYearById: (id: number) => Promise<YearResponseDto | undefined>;
  getPaginatedYear: (params: GetPaginated) => Promise<void>;
  deleteYear: (id: number) => Promise<void>;
  setSelectedYear: React.Dispatch<React.SetStateAction<YearResponseDto | null>>;
}
