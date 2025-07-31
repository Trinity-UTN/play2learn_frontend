import { createContext } from "react";
import type { ConfirmationContextType } from "./ConfirmationContext.type";

export const ConfirmationContext = createContext<
  ConfirmationContextType | undefined
>(undefined);
