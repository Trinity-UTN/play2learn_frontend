import { useCallback, useState, type ReactNode } from "react";
import { BenefitsService } from "../../services/benefitsService/BenefitsService";
import { BenefitAPIContext } from "./BenefitAPIContext";
import type { BenefitAPIContextType } from "./BenefitAPIContext.type";
import type {
  BenefitResponseInterface,
  CreateBenefitInterface,
} from "../../types/Benefits.type";
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

  const [loading, setLoading] = useState<boolean>(false);
  const [benefits, setBenefits] = useState<BenefitResponseInterface[]>([]);
  const { showToast } = useToaster();
  const [paginatedBenefits, setPaginatedBenefits] =
    useState<PaginatedData<BenefitResponseInterface> | null>(null);

  const registerBenefit = async (
    data: CreateBenefitInterface
  ): Promise<void> => {
    setLoading(true);
    try {
      await BenefitsService.registerBenefitApi(data);
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

  const getBenefits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await BenefitsService.getBenefitsApi();

      setBenefits(response.data.data);
    } catch (error) {
      handleApiError(error, "Error al obtener los beneficios");
    } finally {
      setLoading(false);
    }
  }, []);

  const getPaginatedBenefits = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await BenefitsService.getPaginatedBenefitsApi(params);

        setPaginatedBenefits(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los beneficios");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const contextValue: BenefitAPIContextType = {
    loading,
    benefits,
    paginatedBenefits,
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
