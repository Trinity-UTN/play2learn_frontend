import { useEffect, useCallback, useState, type ReactNode } from "react";
import { BenefitTeacherService } from "../../services/benefit/BenefitTeacherService";
import { BenefitAPIContext } from "./BenefitAPIContext";
import type { BenefitAPIContextType } from "./BenefitAPIContext.type";
import type {
  BenefitUseRequestedResponseInterface,
  BenefitResponseInterface,
  BenefitPurchaseSimpleResponse,
  CreateBenefitInterface,
  TeacherBenefitType,
} from "../../../benefit/types/benefit.types";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import usePaginateParams from "../../../shared/hooks/usePaginateParams";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";

interface BenefitProviderProps {
  children: ReactNode;
}

const SELECTED_BENEFIT_KEY = "teacher_selected_benefit";

export const BenefitAPIProvider: React.FC<BenefitProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { paginationParams } = usePaginateParams();

  // Estados generales
  const [loading, setLoading] = useState<boolean>(false);
  const [benefits, setBenefits] = useState<BenefitResponseInterface[]>([]);
  const [selectedBenefit, setSelectedBenefit] =
    useState<TeacherBenefitType | null>(() => {
      try {
        const stored = localStorage.getItem(SELECTED_BENEFIT_KEY);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.warn("Error al leer selectedBenefit de localStorage", error);
        return null;
      }
    });
  const [benefitPurchases, setBenefitPurchases] = useState<
    BenefitPurchaseSimpleResponse[]
  >([]);
  const [paginatedBenefits, setPaginatedBenefits] =
    useState<PaginatedData<BenefitResponseInterface> | null>(null);
  const [paginatedBenefitsUseRequested, setPaginatedBenefitsUseRequested] =
    useState<PaginatedData<BenefitUseRequestedResponseInterface> | null>(null);
  const [paginatedBenefitsPurchases, setPaginatedBenefitsPurchases] =
    useState<PaginatedData<BenefitPurchaseSimpleResponse> | null>(null);

  useEffect(() => {
    if (selectedBenefit === null) {
      localStorage.removeItem(SELECTED_BENEFIT_KEY);
    } else {
      try {
        localStorage.setItem(
          SELECTED_BENEFIT_KEY,
          JSON.stringify(selectedBenefit)
        );
      } catch (error) {
        console.warn(
          "No se pudo guardar selectedBenefit en localStorage",
          error
        );
      }
    }
  }, [selectedBenefit]);

  // Funciones principales
  const getBenefits = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await BenefitTeacherService.getBenefitsApi();
      setBenefits(response.data.data);
    } catch (error) {
      handleApiError(error, "Error al obtener los beneficios");
    } finally {
      setLoading(false);
    }
  }, []);

  const getBenefitPurchases = useCallback(
    async (benefitId: number): Promise<BenefitPurchaseSimpleResponse[]> => {
      setLoading(true);
      try {
        const response = await BenefitTeacherService.getBenefitPurchasesApi(
          benefitId
        );
        setBenefitPurchases(response.data.data);
        return response.data.data;
      } catch (error) {
        handleApiError(error, "Error al obtener las compras del beneficio");
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getPaginatedBenefits = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await BenefitTeacherService.getPaginatedBenefitsApi(
          params
        );
        setPaginatedBenefits(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los beneficios paginados");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getPaginatedBenefitsUseRequested = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response =
          await BenefitTeacherService.getPaginatedBenefitsUseRequestedApi(
            params
          );
        setPaginatedBenefitsUseRequested(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los beneficios paginados");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getPaginatedBenefitsPurchases = useCallback(
    async (benefitId: number, params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response =
          await BenefitTeacherService.getPaginatedBenefitPurchasesApi(
            benefitId,
            params
          );
        setPaginatedBenefitsPurchases(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las compras del beneficio");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const registerBenefit = async (
    data: CreateBenefitInterface
  ): Promise<void> => {
    setLoading(true);
    try {
      await BenefitTeacherService.registerBenefitApi(data);
    } catch (error) {
      handleApiError(error, "Error al crear el beneficio");
    } finally {
      setLoading(false);
    }
  };

  const acceptUseBenefit = async (benefitId: number) => {
    setLoading(true);
    try {
      await BenefitTeacherService.acceptUseBenefitApi(benefitId);
    } catch (error) {
      handleApiError(error, "Error al aceptar el beneficio");
    } finally {
      setLoading(false);
    }
  };

  const deleteBenefit = async (benefitId: number) => {
    setLoading(true);
    try {
      await BenefitTeacherService.deleteBenefitApi(benefitId);
    } catch (error) {
      handleApiError(error, "Error al eliminar el beneficio");
    } finally {
      setLoading(false);
    }
  };

  const refreshBenefitsAfterDeletion = async () => {
    await getPaginatedBenefits(paginationParams);
  };

  const refreshBenefitsAfterAcceptance = async () => {
    await getPaginatedBenefitsUseRequested(paginationParams);
  };

  const contextValue: BenefitAPIContextType = {
    // Estados generales
    loading,
    benefits,
    selectedBenefit,
    benefitPurchases,
    paginatedBenefits,
    paginatedBenefitsUseRequested,
    paginatedBenefitsPurchases,

    // Funciones principales
    getBenefits,
    getBenefitPurchases,
    getPaginatedBenefits,
    getPaginatedBenefitsUseRequested,
    getPaginatedBenefitsPurchases,
    registerBenefit,
    acceptUseBenefit,
    deleteBenefit,

    // Funciones auxiliares
    setSelectedBenefit,
    refreshBenefitsAfterDeletion,
    refreshBenefitsAfterAcceptance,
  };

  return (
    <BenefitAPIContext.Provider value={contextValue}>
      {children}
    </BenefitAPIContext.Provider>
  );
};
