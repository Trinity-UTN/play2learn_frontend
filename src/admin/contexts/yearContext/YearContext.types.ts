import type {
  CreateYearPayload,
  GetYearPayload,
} from "../../services/Year/YearService";

export interface YearContextType {
  loading: boolean;
  registerYear: (data: CreateYearPayload) => Promise<void>;
  getYear: () => void;
  years: GetYearPayload[];
}
