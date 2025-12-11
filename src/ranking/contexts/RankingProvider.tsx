import { useCallback, useMemo, useState, type ReactNode } from "react";
import { RankingContext } from "./RankingContext";
import type { RankingContextType } from "./RankingContext.type";
import { useHandleApiError } from "@/shared";
import type { RankingResponseApi, RankingType } from "../types/ranking.type";
import { RankingServices } from "../services/rankingsService";
interface RankingProviderProps {
  children: ReactNode;
}

export const RankingProvider: React.FC<RankingProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const [loading, setLoading] = useState<boolean>(false);
  const [ranking, setRanking] = useState<RankingResponseApi | undefined>();

  const rankingServices: Record<
    RankingType,
    { fn: Function; requiresId: boolean }
  > = {
    coinsInstitucion: {
      fn: RankingServices.getRankingCoinsInstitucionApi,
      requiresId: false,
    },
    coinsCurso: {
      fn: RankingServices.getRankingCoinsCursoApi,
      requiresId: false,
    },
    coinsMateria: {
      fn: RankingServices.getRankingCoinsMateriaApi,
      requiresId: true,
    },
    activitiesInstitucion: {
      fn: RankingServices.getRankingActivitiesInstitucionApi,
      requiresId: false,
    },
    activitiesCurso: {
      fn: RankingServices.getRankingActivitiesCursoApi,
      requiresId: false,
    },
    activitiesMateria: {
      fn: RankingServices.getRankingActivitiesMateriaApi,
      requiresId: true,
    },
  };

  const getRanking = useCallback(
    async (type: RankingType, materia_id?: number) => {
      setLoading(true);
      try {
        const service = rankingServices[type];
        if (!service) {
          throw new Error("Tipo de ranking no válido");
        }
        if (service.requiresId && !materia_id) {
          throw new Error("Este ranking requiere un ID de materia");
        }

        const response = service.requiresId
          ? await service.fn(materia_id)
          : await service.fn();

        setRanking(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener el ranking");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Objeto de acciones - ESTABLE (no cambia entre renders)
   * Solo se recalcula si las funciones cambian (cosa que no debería pasar)
   */
  const actions = useMemo(
    () => ({
      getRanking,
      setRanking,
    }),
    [getRanking, setRanking]
  );
  /**
   * Objeto de estado - CAMBIA cuando los datos cambian
   * Se recalcula solo cuando loading cambian
   */
  const state = useMemo(
    () => ({
      loading,
      ranking,
    }),
    [loading, ranking]
  );

  const contextValue: RankingContextType = useMemo(
    () => ({
      ...state,
      ...actions,
    }),
    [state, actions]
  );

  return (
    <RankingContext.Provider value={contextValue}>
      {children}
    </RankingContext.Provider>
  );
};
