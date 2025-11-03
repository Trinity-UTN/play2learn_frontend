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
  TradeActionsRequest,
  TradeActionStopLimitRequest,
} from "../../types/actions.type";
import { ActionsService } from "../../services/investments/ActionsService";
import { useToaster } from "../../../shared/hooks/useToaster";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";
interface ActionsProviderProps {
  children: ReactNode;
}

export const ActionsProvider: React.FC<ActionsProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const { getWalletByStudent } = useCurrentStudent();
  const [loading, setLoading] = useState<boolean>(false);
  const [actions, setActions] = useState<PaginatedData<ActionsResponse> | null>(
    null
  );
  const [action, setAction] = useState<ActionsResponse | null>(null);
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
  const getActionById = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const response = await ActionsService.getActionGetById(id);
      setAction(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener la acción");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

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
  const buyActions = useCallback(async (data: TradeActionsRequest) => {
    setLoading(true);
    try {
      await ActionsService.buyActionsApi(data);

      getCandleStickValues(data.stockId, "HISTORICO");
      await getWalletByStudent();

      showToast({ title: "Compra realizada con éxito", type: "success" });
    } catch (error) {
      handleApiError(error, "Error al comprar acciones");
    } finally {
      setLoading(false);
    }
  }, []);

  const sellActions = useCallback(async (data: TradeActionsRequest) => {
    setLoading(true);
    try {
      await ActionsService.sellActionsApi(data);

      getCandleStickValues(data.stockId, "HISTORICO");
      await getWalletByStudent();

      showToast({ title: "Venta realizada con éxito", type: "success" });
    } catch (error) {
      handleApiError(error, "Error al vender acciones");
    } finally {
      setLoading(false);
    }
  }, []);

  const stopActions = useCallback(async (data: TradeActionStopLimitRequest) => {
    setLoading(true);
    try {
      await ActionsService.stopActionApi(data);

      showToast({
        title: "Configuracion registrada con exito",
        type: "success",
      });
    } catch (error) {
      handleApiError(error, "Error al vender acciones");
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue: ActionsContextType = {
    // Estados principales
    loading,
    candleStickValues,
    actions,
    action,
    getCandleStickValues,
    getActionById,
    getPaginatedActions,
    buyActions,
    sellActions,
    stopActions,
  };

  return (
    <ActionsContext.Provider value={contextValue}>
      {children}
    </ActionsContext.Provider>
  );
};
