import { createContext } from "react";
import type { BenefitUIContextType } from "./BenefitUIContext.type";

export const BenefitUIContext = createContext<BenefitUIContextType | undefined>(
  undefined
);
