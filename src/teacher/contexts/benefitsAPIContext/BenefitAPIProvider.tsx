import { useCallback, useState, type ReactNode } from "react";
import { BenefitTeacherService } from "../../services/benefit/BenefitTeacherService";
import { BenefitAPIContext } from "./BenefitAPIContext";
import type { BenefitAPIContextType } from "./BenefitAPIContext.type";
import type {
  BenefitResponseInterface,
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
  const [paginatedBenefits, setPaginatedBenefits] =
    useState<PaginatedData<BenefitResponseInterface> | null>(null);

  // Funciones principales
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

  // Obtener beneficios paginados
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

  const contextValue: BenefitAPIContextType = {
    // Estados generales
    loading,
    benefits,
    paginatedBenefits,

    // Funciones principales
    getBenefits,
    getPaginatedBenefits,
    registerBenefit,
  };

  return (
    <BenefitAPIContext.Provider value={contextValue}>
      {children}
    </BenefitAPIContext.Provider>
  );
};
