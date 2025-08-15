import { useCallback, useState, type ReactNode } from "react";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import { BenefitsService } from "../../services/benefitsService/BenefitsService";
import type { BenefitAPIContextType } from "./BenefitAPIContext.type";
import type {
  BenefitResponseInterface,
  CreateBenefitInterface,
} from "../../types/BenefitType";
import { BenefitAPIContext } from "./BenefitAPIContext";
import { useToaster } from "../../../shared/hooks/useToaster";
interface BenefitProviderProps {
  children: ReactNode;
}

export const BenefitAPIProvider: React.FC<BenefitProviderProps> = ({
  children,
}) => {
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
      console.log(data);
      await BenefitsService.registerBenefitApi(data);
      showToast({
        title: "Beneficio creado exitosamente",
        message: "El beneficio ha sido creado exitosamente.",
        type: "success",
        position: "bottom-right",
      });
    } catch (error) {
      showToast({
        title: "Error",
        message: "Error al crear el beneficion.",
        type: "error",
        position: "bottom-right",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getBenefits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await BenefitsService.getBenefitsApi();
      console.log(response.data);
      setBenefits(response.data.data);
    } catch (error) {
      console.error("Error al obtener los beneficios:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPaginatedBenefits = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await BenefitsService.getPaginatedBenefitsApi(params);
        console.log(response.data);
        setPaginatedBenefits(response.data);
      } catch (error) {
        console.error("Error al obtener los beneficios paginados:", error); // TODO: REMOVE_DEBUG
        throw error;
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
