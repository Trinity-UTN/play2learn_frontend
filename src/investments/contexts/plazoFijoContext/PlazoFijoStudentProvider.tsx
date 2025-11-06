import { useCallback, useState, type ReactNode } from "react";
import { PlazoFijoContext } from "./PlazoFijoStudentContext";
import type { PlazoFijoContextType } from "./PlazoFijoStudentContext.type";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

import { PlazoFijoService } from "../../services/investments/PlazoFijoService";
import { useToaster } from "../../../shared/hooks/useToaster";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";
import type {
  PlazoFijoResponse,
  RegisterPlazoFijo,
  StatisticsPlazoFijoResponse,
} from "../../types/plazoFijo.type";
interface PlazoFijoProviderProps {
  children: ReactNode;
}

export const PlazoFijoProvider: React.FC<PlazoFijoProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const { getWalletByStudent } = useCurrentStudent();
  const [loading, setLoading] = useState<boolean>(false);
  const [plazoFijos, setPlazoFijos] =
    useState<PaginatedData<PlazoFijoResponse> | null>(null);
  const [statistics, setStatistics] =
    useState<StatisticsPlazoFijoResponse | null>(null);

  // Funciones Principales
  const getStatisticsPlazoFijo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await PlazoFijoService.getStatisticsPlazoFijoApi();
      setStatistics(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las estadísticas del plazo fijo");
    } finally {
      setLoading(false);
    }
  }, []);
  const getPaginatedPlazoFijo = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await PlazoFijoService.getPaginatedPlazoFijosApi(
          params
        );
        setPlazoFijos(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los plazos fijos");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const registerPlazoFijo = useCallback(
    async (data: RegisterPlazoFijo): Promise<void> => {
      setLoading(true);
      try {
        await PlazoFijoService.registerPlazoFijoApi(data);
        showToast({
          title: "Plazo fijo registrado con exito",
          type: "success",
        });
        await getWalletByStudent();
        await getStatisticsPlazoFijo();
      } catch (error) {
        handleApiError(error, "Error al registrar el plazo fijo");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const contextValue: PlazoFijoContextType = {
    // Estados principales
    loading,
    plazoFijos,
    getPaginatedPlazoFijo,
    registerPlazoFijo,
    getStatisticsPlazoFijo,
    statistics,
  };

  return (
    <PlazoFijoContext.Provider value={contextValue}>
      {children}
    </PlazoFijoContext.Provider>
  );
};
