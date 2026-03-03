import React, { useEffect } from "react";

/**
 * Componente de prueba que lanza un error al renderizarse.
 *
 * @example
 * <ErrorBoundary>
 *   <CrashComponent />
 * </ErrorBoundary>
 */
const CrashComponent: React.FC = () => {
  useEffect(() => {
    throw new Error("Error disparado desde useEffect en CrashComponent");
  }, []);

  throw new Error("Este es un error de prueba disparado por CrashComponent");
};

export default CrashComponent;
