import type React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorBoundary.fallback";
import { ErrorBoundaryProvider } from "../../contexts/errorBoundaryContext/ErrorBoundaryProvider";
import type { ErrorBoundaryVariant } from "../../contexts/errorBoundaryContext/ErrorBoundaryContext.type";

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
  variant?: ErrorBoundaryVariant;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  onReset,
  variant = "default",
}) => {
  return (
    <ErrorBoundaryProvider variant={variant}>
      <ReactErrorBoundary FallbackComponent={ErrorFallback} onReset={onReset}>
        {children}
      </ReactErrorBoundary>
    </ErrorBoundaryProvider>
  );
};

export default ErrorBoundary;
