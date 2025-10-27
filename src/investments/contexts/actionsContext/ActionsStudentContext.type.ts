import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  CandleStickValuesResponse,
  ActionsResponse,
  RangeValue,
} from "../../types/actions.type";

export interface ActionsContextType {
  // Estados principales
  loading: boolean;
  actions: PaginatedData<ActionsResponse> | null;
  getPaginatedActions: (params: GetPaginated) => Promise<void>;

  candleStickValues: CandleStickValuesResponse[];
  getCandleStickValues: (id: number, range: RangeValue) => void;
}
