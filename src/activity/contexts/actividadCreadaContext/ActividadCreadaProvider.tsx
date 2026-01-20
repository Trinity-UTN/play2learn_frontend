import { useState, type ReactNode } from "react";
import { ActividadCreadaContext } from "./ActividadCreadaContext";
import type { ActividadCreadaContextType } from "./ActividadCreadaContext.type";

import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import { ActividadCreadaService } from "@/activity/services/actividadCreada/actividadCreadaService";
import type { ActividadCreadaResponse } from "@/activity/types/ActividadCreada.type";
import { createGameConfig, getGameTypeFromActivityName } from "@/shared";



interface ActividadCreadaProviderProps {
  children: ReactNode;
}
export const ActividadCreadaProvider: React.FC<ActividadCreadaProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();

  const [loading, setLoading] = useState(false);
  const [actividadBase, setActividadBase] =
    useState<ActividadCreadaResponse | null>(null);
  const [actividadCreada, setActividadCreada] = useState<ActividadCreadaResponse | null>(null)


  const getActividadCreada = async (id: number) => {
    setLoading(true);
    try {
      const response =
        await ActividadCreadaService.getActividadCreada(id);

      const data = response;
      const gameType = getGameTypeFromActivityName(data.name);
      if (!gameType) {
        throw new Error(`Tipo de juego desconocido para: "${data.name}"`);
      }
      const transformedActivity: ActividadCreadaResponse = {
        ...data,
        gameConfig: createGameConfig(gameType, data),
      };

      setActividadBase(response)
      setActividadCreada(transformedActivity);

    } catch (error) {
      handleApiError(error, "Error al obtener la actividad");
    } finally {
      setLoading(false);
    }
  };

  const contextValue: ActividadCreadaContextType = {
    loading,
    actividadBase,
    actividadCreada,
    setActividadBase,
    getActividadCreada,
  };

  return (
    <ActividadCreadaContext.Provider value={contextValue}>
      {children}
    </ActividadCreadaContext.Provider>
  );
};

