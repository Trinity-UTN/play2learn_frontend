import { useCallback, useState, useEffect, type ReactNode } from "react";
import { CurrentStudentContext } from "./CurrentStudentContext";
import type { CurrentStudentContextType } from "./CurrentStudentContext.type";
import { CurrentStudentService } from "../../services/student/CurrentStudentService";
import type {
  CurrentStudent,
  AvatarComponents,
  StatisticsStudentResponse,
} from "../../types/CurrentStudent.type";
import { useAuth } from "../../../user/hooks/useAuth";
import { useHandleApiError } from "@/shared";
import type { Wallet } from "@/admin";

interface CurrentStudentProviderProps {
  children: ReactNode;
}

export const CurrentStudentProvider: React.FC<CurrentStudentProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const { handleApiError } = useHandleApiError();

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingStatics, setLoadingStatistics] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<CurrentStudent | null>(
    null,
  );
  const [wallet, setWallet] = useState<Wallet>();
  const [statistics, setStatistics] = useState<StatisticsStudentResponse>();

  // Funciones Principales

  const getCurrentStudentByToken = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const studentDataFromToken =
        await CurrentStudentService.getCurrentStudentByTokenApi();
      setCurrentStudent(studentDataFromToken);
      setWallet(studentDataFromToken?.wallet);
    } catch (error) {
      handleApiError(error, "Error al obtener el estudiante actual");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateStudentProfile = async (
    aspectUpdates: Array<{ aspectId: number | null; profileId: number }>,
  ): Promise<void> => {
    if (!currentStudent?.id) return;

    setLoading(true);
    try {
      await CurrentStudentService.updateCurrentStudentProfileApi(aspectUpdates);
      await getCurrentStudentByToken();
    } catch (error) {
      handleApiError(error, "Error al actualizar el perfil del estudiante");
    } finally {
      setLoading(false);
    }
  };

  const unselectAspect = async (
    profileId: number,
    typeAspect: "REMERA" | "SOMBRERO",
  ): Promise<void> => {
    if (!currentStudent?.id) return;

    setLoading(true);
    try {
      await CurrentStudentService.unselectAspectApi(profileId, typeAspect);
      await getCurrentStudentByToken();
    } catch (error) {
      handleApiError(error, "Error al deseleccionar aspecto");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "ROLE_STUDENT") {
      getCurrentStudentByToken();
      setWallet(currentStudent?.wallet);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [user, getCurrentStudentByToken]);

  useEffect(() => {
    if (currentStudent) {
      setWallet(currentStudent.wallet);
    }
  }, [currentStudent]);

  const getWalletByStudent = async () => {
    setLoading(true);
    try {
      const response = await CurrentStudentService.walletByStudentApi();
      setWallet(response.data);
    } catch (error) {
      handleApiError(error, "Error al cargar la billetera");
    } finally {
      setLoading(false);
    }
  };

  const getStatisticsStudent = async () => {
    setLoadingStatistics(true);
    try {
      const response = await CurrentStudentService.statisticsStudentApi();
      setStatistics(response.data);
    } catch (error) {
      handleApiError(error, "Error al cargar las estadisticas");
    } finally {
      setLoadingStatistics(false);
    }
  };

  // Funcioens de utilidad
  const getAvatarComponents = (): AvatarComponents => {
    const profile = currentStudent?.profile;

    return {
      body: profile?.selectedBody?.image || "/avatar/body_anonymous.png",
      shirt: profile?.selectedShirt?.image || "",
      hat: profile?.selectedHat?.image || "",
    };
  };

  const contextValue: CurrentStudentContextType = {
    // Estados principales
    loading,
    loadingStatics,
    currentStudent,
    wallet,
    statistics,
    // Funciones Principales
    getCurrentStudentByToken,
    updateStudentProfile,
    unselectAspect,
    getWalletByStudent,
    getStatisticsStudent,

    // Funciones de utilidad
    setCurrentStudent,
    getAvatarComponents,
  };

  return (
    <CurrentStudentContext.Provider value={contextValue}>
      {children}
    </CurrentStudentContext.Provider>
  );
};
