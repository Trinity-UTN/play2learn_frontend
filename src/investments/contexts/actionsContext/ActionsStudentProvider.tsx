import { useCallback, useState, type ReactNode } from "react";
import { ActionsContext } from "./ActionsStudentContext";
import type { ActionsContextType } from "./ActionsStudentContext.type";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  CandleStickValuesResponse,
  ActionsResponse,
  RangeValue,
} from "../../types/actions.type";
import { ActionsService } from "../../services/investments/ActionsService";

interface ActionsProviderProps {
  children: ReactNode;
}

export const ActionsProvider: React.FC<ActionsProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const [loading, setLoading] = useState<boolean>(false);
  const [actions, setActions] = useState<PaginatedData<ActionsResponse> | null>(
    null
  );
  const [candleStickValues, setCandleStickValues] = useState<
    CandleStickValuesResponse[]
  >([]);

  // Funciones Principales
  const getPaginatedActions = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await ActionsService.getPaginatedActionsApi(params);
        setActions(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las acciones");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getCandleStickValues = useCallback(
    async (id: number, range: RangeValue): Promise<void> => {
      setLoading(true);
      try {
        const response = await ActionsService.getCandleStickValues(id, range);
        setCandleStickValues(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los valores de vela");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const contextValue: ActionsContextType = {
    // Estados principales
    loading,
    candleStickValues,
    actions,
    getCandleStickValues,
    getPaginatedActions,
  };

  return (
    <ActionsContext.Provider value={contextValue}>
      {children}
    </ActionsContext.Provider>
  );
};
