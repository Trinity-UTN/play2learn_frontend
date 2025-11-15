import { useCallback, useState, type ReactNode } from "react";
import { CajaDeAhorroContext } from "./CajaDeAhorroStudentContext";
import type { CajaDeAhorroContextType } from "./CajaDeAhorroStudentContext.type";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

import { useToaster } from "../../../shared/hooks/useToaster";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";

import type {
  CajaDeAhorroResponse,
  CajaDeAhorroStats,
  MovimientoCajaDeAhorro,
  RegisterCajaDeAhorro,
} from "../../types/cajaAhorro.type";
import { CajaDeAhorroService } from "../../services/investments/CajaDeAhorroService";
interface CajaDeAhorroProviderProps {
  children: ReactNode;
}

export const CajaDeAhorroProvider: React.FC<CajaDeAhorroProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const { getWalletByStudent } = useCurrentStudent();
  const [loading, setLoading] = useState<boolean>(false);
  const [cajaDeAhorro, setCajaDeAhorro] =
    useState<PaginatedData<CajaDeAhorroResponse> | null>(null);
  const [statsView, setStatsView] = useState<CajaDeAhorroStats>();
  // Funciones Principales
  const getPaginatedCajaDeAhorro = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await CajaDeAhorroService.getPaginatedCajaDeAhorroApi(
          params
        );
        setCajaDeAhorro(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las cajas de ahorro");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const getCajaDeAhorroStats = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await CajaDeAhorroService.getStats();
      setStatsView(response.data);
    } catch (error) {
      handleApiError(error, "Error al traer los stats");
    } finally {
      setLoading(false);
    }
  }, []);
  const registerCajaDeAhorro = useCallback(
    async (data: RegisterCajaDeAhorro): Promise<void> => {
      setLoading(true);
      try {
        await CajaDeAhorroService.registerCajaDeAhorroApi(data);
        showToast({
          title: "Caja de Ahorro registrada con exito",
          type: "success",
        });
        await getWalletByStudent();
      } catch (error) {
        handleApiError(error, "Error al registrar la caja de ahorro");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const depositCajaDeAhorro = useCallback(
    async (data: MovimientoCajaDeAhorro): Promise<void> => {
      setLoading(true);
      try {
        await CajaDeAhorroService.depositCajaDeAhorroApi(data);
        showToast({
          title: "Deposito realizado con exito.",
          type: "success",
        });
        await getWalletByStudent();
      } catch (error) {
        handleApiError(error, "Error al depositar");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const withdrawalCajaDeAhorro = useCallback(
    async (data: MovimientoCajaDeAhorro): Promise<void> => {
      setLoading(true);
      try {
        await CajaDeAhorroService.withdrawalCajaDeAhorroApi(data);
        showToast({
          title: "Retiro realizado con exito.",
          type: "success",
        });
        await getWalletByStudent();
      } catch (error) {
        handleApiError(error, "Error al retirar");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const deleteCajaDeAhorro = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await CajaDeAhorroService.deleteCajaDeAhorroApi(id);
      showToast({
        title: "Caja de ahorro eliminada con exito.",
        type: "success",
      });
      await getWalletByStudent();
    } catch (error) {
      handleApiError(error, "Error al eliminar caja de ahorro");
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue: CajaDeAhorroContextType = {
    // Estados principales
    loading,
    cajaDeAhorro,
    statsView,
    deleteCajaDeAhorro,
    depositCajaDeAhorro,
    getPaginatedCajaDeAhorro,
    registerCajaDeAhorro,
    withdrawalCajaDeAhorro,
    getCajaDeAhorroStats,
  };

  return (
    <CajaDeAhorroContext.Provider value={contextValue}>
      {children}
    </CajaDeAhorroContext.Provider>
  );
};
