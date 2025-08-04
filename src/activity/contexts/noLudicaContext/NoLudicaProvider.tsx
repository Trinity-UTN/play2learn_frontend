import { useState, type ReactNode } from "react";
import { NoLudicaContext } from "./NoLudicaContext";
import type { NoLudicaContextType } from "./NoLudicaContext.type";
import { NoLudicaService } from "../../services/noLudica/NoLudicaService";
import type { NoLudicaInterface } from "../../types/NoLudica.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { makeData } from "../../utils/MakeData";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { useToaster } from "../../../shared/hooks/useToaster";

interface NoLudicaProviderProps {
  children: ReactNode;
}

export const NoLudicaProvider: React.FC<NoLudicaProviderProps> = ({
  children,
}) => {
  const { configurationActivity } = useConfigurationActivity();
  const { showToast } = useToaster();

  const [loading, setLoading] = useState<boolean>(false);

  const registrarNoLudica = async (data: NoLudicaInterface): Promise<void> => {
    setLoading(true);

    // console.log("=== NO LÚDICA DEBUG ===");
    // console.log("Datos del juego recibidos:", data);
    // console.log("Configuración de actividad:", configurationActivity);
    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity
    );
    // console.log("Payload final a enviar:", dataMandar);
    // console.log("=== FIN DEBUG ===");

    try {
      await NoLudicaService.registerNoLudicaApi(dataMandar);
      showToast({
        title: "Actividad creada exitosamente",
        message: "La actividad ha sido creada exitosamente.",
        type: "success",
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error al crear la actividad (no lúdica):", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: NoLudicaContextType = {
    loading,
    registrarNoLudica,
  };

  return (
    <NoLudicaContext.Provider value={contextValue}>
      {children}
    </NoLudicaContext.Provider>
  );
};
