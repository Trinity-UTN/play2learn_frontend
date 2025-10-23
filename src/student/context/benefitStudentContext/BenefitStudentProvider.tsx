import { useState, type ReactNode, useCallback } from "react";
import { BenefitStudentContext } from "./BenefitStudentContext";
import type { BenefitStudentContextType } from "./BenefitStudentContext.type";
import { BenefitService } from "../../services/benefit/BenefitService";
import type {
  BenefitStudentResponseInterface,
  BenefitStatsResponse,
} from "../../../shared/types/Benefits.type";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";

export const BenefitStudentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { handleApiError } = useHandleApiError();

  // Estados Generales
  const [loading, setLoading] = useState<boolean>(false);
  const [paginatedBenefits, setPaginatedBenefits] =
    useState<PaginatedData<BenefitStudentResponseInterface> | null>(null);
  const [benefitStats, setBenefitStats] = useState<BenefitStatsResponse | null>(
    null
  );

  // Funciones Principales
  const getPaginatedBenefitStudent = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await BenefitService.getPaginatedBenefitStudentApi(
          params
        );
        setPaginatedBenefits(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los beneficios del estudiante");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getBenefitStudentStats = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await BenefitService.getBenefitStudentStatsApi();
      setBenefitStats(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las estadísticas de beneficios");
    } finally {
      setLoading(false);
    }
  }, []);

  const purchaseBenefitStudent = useCallback(
    async (benefitId: number): Promise<void> => {
      setLoading(true);
      try {
        await BenefitService.purchaseBenefitStudentApi(benefitId);
      } catch (error) {
        handleApiError(error, "Error al comprar el beneficio del estudiante");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const requestUseBenefitStudent = useCallback(
    async (benefitId: number): Promise<void> => {
      setLoading(true);
      try {
        await BenefitService.requestUseBenefitStudentApi(benefitId);
      } catch (error) {
        handleApiError(error, "Error al solicitar el beneficio del estudiante");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const contextValue: BenefitStudentContextType = {
    // Estados Generales
    loading,
    paginatedBenefits,
    benefitStats,

    // Funciones Principales
    getPaginatedBenefitStudent,
    getBenefitStudentStats,
    purchaseBenefitStudent,
    requestUseBenefitStudent,
  };

  return (
    <BenefitStudentContext.Provider value={contextValue}>
      {children}
    </BenefitStudentContext.Provider>
  );
};
