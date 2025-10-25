import { useState, type ReactNode, useCallback } from "react";
import { BenefitStudentContext } from "./BenefitStudentContext";
import type { BenefitStudentContextType } from "./BenefitStudentContext.type";
import { BenefitStudentService } from "../../services/benefit/BenefitStudentService";
import type {
  BenefitStudentResponseInterface,
  BenefitStatsResponse,
} from "../../../benefit/types/benefit.types";
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
        const response =
          await BenefitStudentService.getPaginatedBenefitStudentApi(params);
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
      const response = await BenefitStudentService.getBenefitStudentStatsApi();
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
        await BenefitStudentService.purchaseBenefitStudentApi(benefitId);
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
        await BenefitStudentService.requestUseBenefitStudentApi(benefitId);
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
