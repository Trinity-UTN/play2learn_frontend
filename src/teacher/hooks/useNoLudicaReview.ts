import { useContext } from "react";
import { NoLudicaReviewContext } from "../contexts/noLudicaReviewContext/NoLudicaReviewContext";
import type { NoLudicaReviewContextType } from "../contexts/noLudicaReviewContext/NoLudicaReviewContext.type";

export const useNoLudicaReview = (): NoLudicaReviewContextType => {
  const context = useContext(NoLudicaReviewContext);
  if (!context) {
    throw new Error(
      "useNoLudicaReview must be used within a NoLudicaReviewProvider"
    );
  }
  return context;
};
