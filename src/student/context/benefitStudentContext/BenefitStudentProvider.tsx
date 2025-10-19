import { useState, type ReactNode, useCallback } from "react";
import { BenefitStudentContext } from "./BenefitStudentContext";
import type { BenefitStudentContextType } from "./BenefitStudentContext.type";
import { BenefitService } from "../../services/benefit/BenefitService";
import type { BenefitStudentResponseInterface } from "../../../shared/types/Benefits.type";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";

export const ActivityStudentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { handleApiError } = useHandleApiError();

  const [loading, setLoading] = useState<boolean>(false);
  const [paginatedBenefits, setPaginatedBenefits] =
    useState<PaginatedData<BenefitStudentResponseInterface> | null>(null);

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

  const purchaseBenefitStudent = useCallback(
    async (benefitId: number): Promise<void> => {
      setLoading(true);
      try {
        await BenefitService.purchaseBenefitStudentApi(benefitId);
      } catch (error) {
        handleApiError(error, "Error al comprar el beneficio del estudiante");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const contextValue: BenefitStudentContextType = {
    loading,
    paginatedBenefits,
    getPaginatedBenefitStudent,
    purchaseBenefitStudent,
  };

  return (
    <BenefitStudentContext.Provider value={contextValue}>
      {children}
    </BenefitStudentContext.Provider>
  );
};
