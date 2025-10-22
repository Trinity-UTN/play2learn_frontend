import { useCallback, useState, type ReactNode } from "react";
import { InvestmentsContext } from "./InvestmentStudentContext";
import type { InvestmentsContextType } from "./InvestmentStudentContext.type";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type {
  CandleStickValuesResponse,
  InvestmentResponse,
  RangeValue,
} from "../../types/investment.type";
import { InvestmentsService } from "../../services/investments/InvestmentsService";

interface InvestmentsProviderProps {
  children: ReactNode;
}

export const InvestmentsProvider: React.FC<InvestmentsProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const [loading, setLoading] = useState<boolean>(false);
  const [investments, setInvestments] =
    useState<PaginatedData<InvestmentResponse> | null>(null);
  const [candleStickValues, setCandleStickValues] = useState<
    CandleStickValuesResponse[]
  >([]);

  // Funciones Principales
  const getPaginatedInvestments = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await InvestmentsService.getPaginatedInvestmentsApi(
          params
        );
        setInvestments(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las estadisticas");
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
        const response = await InvestmentsService.getCandleStickValues(
          id,
          range
        );
        setCandleStickValues(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los valores de vela");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const contextValue: InvestmentsContextType = {
    // Estados principales
    loading,
    candleStickValues,
    investments,
    getCandleStickValues,
    getPaginatedInvestments,
  };

  return (
    <InvestmentsContext.Provider value={contextValue}>
      {children}
    </InvestmentsContext.Provider>
  );
};
