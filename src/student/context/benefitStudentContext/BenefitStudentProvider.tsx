import { useState, type ReactNode, useCallback } from "react";
import { BenefitStudentContext } from "./BenefitStudentContext";
import type { BenefitStudentContextType } from "./BenefitStudentContext.type";
import { BenefitStudentService } from "../../services/benefit/BenefitStudentService";
import type {
  BenefitStudentResponseInterface,
  BenefitPurchasedUsedResponse,
  BenefitStatsResponse,
} from "../../../benefit/types/benefit.types";
import type { GetPaginated, PaginatedData } from "@/shared";
import { useHandleApiError } from "@/shared";

export const BenefitStudentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { handleApiError } = useHandleApiError();

  // Estados Generales
  const [pendingRequests, setPendingRequests] = useState(0);
  const startLoading = () => setPendingRequests((prev) => prev + 1);
  const stopLoading = () => setPendingRequests((prev) => Math.max(0, prev - 1));
  const loading = pendingRequests > 0;
  const [paginatedBenefits, setPaginatedBenefits] = useState<
    | PaginatedData<BenefitStudentResponseInterface>
    | PaginatedData<BenefitPurchasedUsedResponse>
    | null
  >(null);
  const [benefitStats, setBenefitStats] = useState<BenefitStatsResponse | null>(
    null,
  );
  // Funciones Principales
  const getPaginatedBenefitStudent = useCallback(
    async (params: GetPaginated): Promise<void> => {
      startLoading();
      try {
        const response =
          await BenefitStudentService.getPaginatedBenefitStudentApi(params);
        setPaginatedBenefits(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los beneficios del estudiante");
      } finally {
        stopLoading();
      }
    },
    [],
  );

  const getPaginatedUsedBenefitStudent = useCallback(
    async (params: GetPaginated): Promise<void> => {
      startLoading();
      try {
        const response =
          await BenefitStudentService.getPaginatedUsedBenefitStudentApi(params);
        setPaginatedBenefits(response.data);
      } catch (error) {
        handleApiError(
          error,
          "Error al obtener los beneficios usados del estudiante",
        );
      } finally {
        stopLoading();
      }
    },
    [],
  );

  const getBenefitStudentStats = useCallback(async (): Promise<void> => {
    startLoading();
    try {
      const response = await BenefitStudentService.getBenefitStudentStatsApi();
      setBenefitStats(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las estadísticas de beneficios");
    } finally {
      stopLoading();
    }
  }, []);

  const purchaseBenefitStudent = useCallback(
    async (benefitId: number): Promise<void> => {
      startLoading();
      try {
        await BenefitStudentService.purchaseBenefitStudentApi(benefitId);
      } catch (error) {
        handleApiError(error, "Error al comprar el beneficio del estudiante");
        throw error;
      } finally {
        stopLoading();
      }
    },
    [],
  );

  const requestUseBenefitStudent = useCallback(
    async (benefitId: number): Promise<void> => {
      startLoading();
      try {
        await BenefitStudentService.requestUseBenefitStudentApi(benefitId);
      } catch (error) {
        handleApiError(error, "Error al solicitar el beneficio del estudiante");
        throw error;
      } finally {
        stopLoading();
      }
    },
    [],
  );

  const contextValue: BenefitStudentContextType = {
    // Estados Generales
    loading,
    paginatedBenefits,
    benefitStats,

    // Funciones Principales
    getPaginatedBenefitStudent,
    getPaginatedUsedBenefitStudent,
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
