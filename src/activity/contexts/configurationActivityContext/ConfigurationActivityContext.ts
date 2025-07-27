import { createContext } from "react";
import type { ConfigurationActivityContextType } from "./ConfigurationActivityContext.type";

export const ConfigurationActivityContext = createContext<ConfigurationActivityContextType| undefined>(
  undefined
);
