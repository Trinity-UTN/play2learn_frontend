import { useCallback, useState, type ReactNode } from "react";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import { BenefitsService } from "../../services/benefitsService/BenefitsService";
import type { BenefitContextType } from "./BenefitContext.type";
import type { BenefitResponse } from "../../types/BeneficeType";
import { BenefitContext } from "./BenefitContext";

interface BenefitProviderProps {
  children: ReactNode;
}

export const BenefitProvider: React.FC<BenefitProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [benefits, setBenefits] = useState<BenefitResponse[]>([]);
  const [paginatedBenefits, setPaginatedBenefits] =
    useState<PaginatedData<BenefitResponse> | null>(null);

  //   const registerBenefit= async (data: CreateBenefitPayload): Promise<void> => {
  //     setLoading(true);
  //     try {
  //       await YearService.registerYearApi(data);
  //     } catch (error) {
  //       console.error("Error al crear el año:", error);
  //       throw error;
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

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

  const contextValue: BenefitContextType = {
    loading,
    benefits,
    paginatedBenefits,
    getBenefits,
    getPaginatedBenefits,
  };

  return (
    <BenefitContext.Provider value={contextValue}>
      {children}
    </BenefitContext.Provider>
  );
};
