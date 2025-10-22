import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  CandleStickValuesResponse,
  InvestmentResponse,
  RangeValue,
} from "../../types/investment.type";

export interface InvestmentsContextType {
  // Estados principales
  loading: boolean;
  investments: PaginatedData<InvestmentResponse> | null;
  getPaginatedInvestments: (params: GetPaginated) => Promise<void>;

  candleStickValues: CandleStickValuesResponse[];
  getCandleStickValues: (id: number, range: RangeValue) => void;
}
