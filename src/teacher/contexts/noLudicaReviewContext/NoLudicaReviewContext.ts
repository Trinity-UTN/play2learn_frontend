import { createContext } from "react";
import type { NoLudicaReviewContextType } from "./NoLudicaReviewContext.type";

export const NoLudicaReviewContext = createContext<
  NoLudicaReviewContextType | undefined
>(undefined);
