import { createContext } from "react";
import type { InvestmentsContextType } from "./InvestmentStudentContext.type";

export const InvestmentsContext = createContext<
  InvestmentsContextType | undefined
>(undefined);
