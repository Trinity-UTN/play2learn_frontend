import { useCallback, useState, type ReactNode } from "react";
import { StoreContext } from "./StoreStudentContext";
import type { StoreContextType } from "./StoreStudentContext.type";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import type { BodyPart } from "../../types/CurrentStudent.type";
import { StoreService } from "../../services/store/StoreService";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import type { BuyAspect } from "../../types/AspectStore.type";
import { useToaster } from "../../../shared/hooks/useToaster";
interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const [loading, setLoading] = useState<boolean>(false);
  const [aspects, setAspects] = useState<PaginatedData<BodyPart> | null>(null);

  // Funciones Principales
  const getPaginatedAspects = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await StoreService.getPaginatedAspectsApi(params);
        setAspects(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las actividades paginadas");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const buyAspect = async (data: BuyAspect): Promise<void> => {
    setLoading(true);
    try {
      await StoreService.buyAspectApi(data);
      showToast({
        title: "Aspecto comprado exitosamente",
        message: "El aspecto se ha agregado en perfil.",
        type: "success",
        position: "bottom-right",
      });
    } catch (error) {
      handleApiError(error, "Error al comprar el aspecto");
    } finally {
      setLoading(false);
    }
  };
  const contextValue: StoreContextType = {
    // Estados principales
    loading,
    aspects,
    getPaginatedAspects,
    buyAspect,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
