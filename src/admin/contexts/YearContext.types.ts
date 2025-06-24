import type { CreateYearPayload } from "../services/Year/YearService";

export interface YearContextType {
  loading: boolean;
  registerYear: (data: CreateYearPayload) => Promise<void>;
}
