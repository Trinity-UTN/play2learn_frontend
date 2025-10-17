import { createContext } from "react";
import type { WalletStudentContextType } from "./WalletStudentContext.type";

export const WalletStudentContext = createContext<
  WalletStudentContextType | undefined
>(undefined);
