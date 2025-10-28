import { useCallback, useState, type ReactNode } from "react";
import { BenefitTeacherService } from "../../services/benefit/BenefitTeacherService";
import { BenefitAPIContext } from "./BenefitAPIContext";
import type { BenefitAPIContextType } from "./BenefitAPIContext.type";
import type {
  BenefitUseRequestedResponseInterface,
  BenefitResponseInterface,
  BenefitPurchaseSimpleResponse,
  CreateBenefitInterface,
} from "../../../benefit/types/benefit.types";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import { useToaster } from "../../../shared/hooks/useToaster";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";

interface BenefitProviderProps {
  children: ReactNode;
}

export const BenefitAPIProvider: React.FC<BenefitProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();

  // Estados generales
  const [loading, setLoading] = useState<boolean>(false);
  const [benefits, setBenefits] = useState<BenefitResponseInterface[]>([]);
  const [benefitPurchases, setBenefitPurchases] = useState<
    BenefitPurchaseSimpleResponse[]
  >([]);
  const [paginatedBenefits, setPaginatedBenefits] =
    useState<PaginatedData<BenefitResponseInterface> | null>(null);
  const [paginatedBenefitsUseRequested, setPaginatedBenefitsUseRequested] =
    useState<PaginatedData<BenefitUseRequestedResponseInterface> | null>(null);

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

  const registerBenefit = async (
    data: CreateBenefitInterface
  ): Promise<void> => {
    setLoading(true);
    try {
      await BenefitTeacherService.registerBenefitApi(data);
      showToast({
        title: "Beneficio creado exitosamente",
        message: "El beneficio ha sido creado exitosamente.",
        type: "success",
        position: "bottom-right",
      });
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
      showToast({
        title: "Beneficio aceptado exitosamente",
        message: "El beneficio ha sido aceptado exitosamente.",
        type: "success",
        position: "bottom-right",
      });
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
      showToast({
        title: "Beneficio eliminado exitosamente",
        message: "El beneficio ha sido eliminado exitosamente.",
        type: "success",
        position: "bottom-right",
      });
    } catch (error) {
      handleApiError(error, "Error al eliminar el beneficio");
    } finally {
      setLoading(false);
    }
  };

  const contextValue: BenefitAPIContextType = {
    // Estados generales
    loading,
    benefits,
    benefitPurchases,
    paginatedBenefits,
    paginatedBenefitsUseRequested,

    // Funciones principales
    getBenefits,
    getBenefitPurchases,
    getPaginatedBenefits,
    getPaginatedBenefitsUseRequested,
    registerBenefit,
    acceptUseBenefit,
    deleteBenefit,
  };

  return (
    <BenefitAPIContext.Provider value={contextValue}>
      {children}
    </BenefitAPIContext.Provider>
  );
};
