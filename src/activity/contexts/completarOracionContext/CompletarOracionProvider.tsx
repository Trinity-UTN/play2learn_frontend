import { useState, type ReactNode } from "react";
import { CompletarOracionContext } from "./CompletarOracionContext";
import type { CompletarOracionContextType } from "./CompletarOracionContext.type";
import { CompletarOracionService } from "../../services/completarOracion/CompletarOracionService";
import type { CompletarOracionInterface } from "../../types/CompletarOracion.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { makeData } from "../../utils/MakeData";

interface CompletarOracionProviderProps {
  children: ReactNode;
}

export const CompletarOracionProvider: React.FC<
  CompletarOracionProviderProps
> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { configurationActivity } = useConfigurationActivity();

  const registrarCompletarOracion = async (
    data: CompletarOracionInterface
  ): Promise<void> => {
    setLoading(true);

    console.log("=== COMPLETAR ORACIÓN DEBUG ===");
    console.log("Datos del juego recibidos:", data);
    console.log("Configuración de actividad:", configurationActivity);
    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity
    );
    console.log("Payload final a enviar:", dataMandar);
    console.log("=== FIN DEBUG ===");

    try {
      await CompletarOracionService.registerCompletarOracionApi(dataMandar);
      console.log("Actividad creada exitosamente");
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
