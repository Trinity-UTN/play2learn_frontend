import { createContext } from "react";
import type { ToasterContextType } from "./ToasterContext.type";

export const ToasterContext = createContext<ToasterContextType | undefined>(
  undefined
);
