import { createContext } from "react";
import type { ErrorBoundaryVariant } from "./ErrorBoundaryContext.type";

export const ErrorBoundaryContext =
  createContext<ErrorBoundaryVariant>("default");
