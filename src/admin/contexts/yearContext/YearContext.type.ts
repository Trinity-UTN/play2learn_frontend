import type {
  CreateYearPayload,
  GetYearPayload,
} from "../../services/year/YearService";

export interface YearContextType {
  loading: boolean;
  registerYear: (data: CreateYearPayload) => Promise<void>;
  getYear: () => void;
  years: GetYearPayload[];
}
