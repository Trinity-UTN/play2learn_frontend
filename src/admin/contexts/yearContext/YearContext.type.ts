import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  CreateYearPayload,
  UpdateYearPayload,
  YearResponseDto,
} from "../../services/Year/YearService";

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
