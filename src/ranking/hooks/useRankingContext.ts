import { useContext } from "react";
import { RankingContext } from "../contexts/RankingContext";

export const useRankingContext = () => {
  const context = useContext(RankingContext);
  if (!context) {
    throw new Error("useRanking must be used within an RankingProvider");
  }
  return context;
};
