import type React from "react";
import type { ReactNode } from "react";
import { ErrorBoundaryContext } from "./ErrorBoundaryContext";
import type { ErrorBoundaryVariant } from "./ErrorBoundaryContext.type";

interface ErrorBoundaryProviderProps {
  children: ReactNode;
  variant: ErrorBoundaryVariant;
}

export const ErrorBoundaryProvider: React.FC<ErrorBoundaryProviderProps> = ({
  children,
  variant,
}) => {
  return (
    <ErrorBoundaryContext.Provider value={variant}>
      {children}
    </ErrorBoundaryContext.Provider>
  );
};
