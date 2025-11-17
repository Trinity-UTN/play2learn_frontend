import { createContext } from "react";
import type { BenefitAPIContextType } from "./BenefitAPIContext.type";

export const BenefitAPIContext = createContext<
  BenefitAPIContextType | undefined
>(undefined);
