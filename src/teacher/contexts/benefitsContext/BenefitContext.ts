import { createContext } from "react";
import type { BenefitContextType } from "./BenefitContext.type";

export const BenefitContext = createContext<BenefitContextType | undefined>(
  undefined
);
