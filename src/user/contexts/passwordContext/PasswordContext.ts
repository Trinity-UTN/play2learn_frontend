import { createContext } from "react";
import type { PasswordContextType } from "./PasswordContext.type";

export const PasswordContext = createContext<PasswordContextType | undefined>(
  undefined
);
