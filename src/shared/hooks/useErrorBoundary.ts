import { useContext } from "react";
import { ErrorBoundaryContext } from "../contexts/errorBoundaryContext/ErrorBoundaryContext";

export const useErrorBoundary = () => {
  const context = useContext(ErrorBoundaryContext);
  if (context === undefined) {
    throw new Error("useErrorBoundary must be used within an ErrorBoundary");
  }
  return context;
};
