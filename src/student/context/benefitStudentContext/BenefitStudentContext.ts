import { createContext } from "react";
import type { BenefitStudentContextType } from "./BenefitStudentContext.type";

export const BenefitStudentContext = createContext<
  BenefitStudentContextType | undefined
>(undefined);
