import type { RankingResponseApi, RankingType } from "../types/ranking.type";

export interface RankingContextType {
  loading: boolean;
  ranking: RankingResponseApi | undefined;
  getRanking: (type: RankingType, materia_id?: number) => Promise<void>;
  setRanking: (data: RankingResponseApi | undefined) => void;
}
