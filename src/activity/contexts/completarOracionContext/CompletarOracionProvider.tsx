import { useState, type ReactNode } from "react";
import { CompletarOracionContext } from "./CompletarOracionContext";
import type { CompletarOracionContextType } from "./CompletarOracionContext.type";
import { CompletarOracionService } from "../../services/completarOracion/CompletarOracionService";
import type { CreateCompletarOracionPayload } from "../../services/completarOracion/CompletarOracionService";

interface CompletarOracionProviderProps {
  children: ReactNode;
}

export const CompletarOracionProvider: React.FC<
  CompletarOracionProviderProps
> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const registrarCompletarOracion = async (
    data: CreateCompletarOracionPayload
  ): Promise<void> => {
    setLoading(true);
    try {
      await CompletarOracionService.registerCompletarOracionApi(data);
    } catch (error) {
      console.error("Error al crear la actividad (completar oración):", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: CompletarOracionContextType = {
    loading,
    registrarCompletarOracion,
  };

  return (
    <CompletarOracionContext.Provider value={contextValue}>
      {children}
    </CompletarOracionContext.Provider>
  );
};
