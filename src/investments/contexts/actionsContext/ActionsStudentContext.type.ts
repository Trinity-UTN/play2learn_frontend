import type { GetPaginated, PaginatedData } from "@/shared";
import type {
  CandleStickValuesResponse,
  ActionsResponse,
  RangeValue,
  TradeActionsRequest,
  TradeActionStopLimitRequest,
} from "../../types/actions.type";

export interface ActionsContextType {
  // Estados principales
  loading: boolean;
  actions: PaginatedData<ActionsResponse> | null;
  action: ActionsResponse | null;
  getPaginatedActions: (params: GetPaginated) => Promise<void>;
  getActionById: (id: number) => Promise<void>;
  candleStickValues: CandleStickValuesResponse[];
  getCandleStickValues: (id: number, range: RangeValue) => void;
  sellActions: (data: TradeActionsRequest) => void;
  buyActions: (data: TradeActionsRequest) => void;
  stopActions: (data: TradeActionStopLimitRequest) => void;
}
