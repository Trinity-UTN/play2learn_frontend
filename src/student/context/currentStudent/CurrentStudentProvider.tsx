import { useCallback, useState, useEffect, type ReactNode } from "react";
import { CurrentStudentContext } from "./CurrentStudentContext";
import type { CurrentStudentContextType } from "./CurrentStudentContext.type";
import { CurrentStudentService } from "../../services/student/CurrentStudentService";
import AuthService from "../../../user/services/auth/AuthService";
import type {
  CurrentStudent,
  AvatarComponents,
  StatisticsStudentResponse,
} from "../../types/CurrentStudent.type";
import { useAuth } from "../../../user/hooks/useAuth";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import type { Wallet } from "../../../admin/services/student/StudentService";

interface CurrentStudentProviderProps {
  children: ReactNode;
}

export const CurrentStudentProvider: React.FC<CurrentStudentProviderProps> = ({
  children,
}) => {
  const { role, studentData } = useAuth();
  const { handleApiError } = useHandleApiError();
  const authService = AuthService.getInstance();

  const [loading, setLoading] = useState<boolean>(true);
  const [currentStudent, setCurrentStudent] = useState<CurrentStudent | null>(
    null
  );
  const [wallet, setWallet] = useState<Wallet>();
  const [statistics, setStatistics] = useState<StatisticsStudentResponse>();

  // Funciones Principales
  const getCurrentStudent = useCallback(async (): Promise<void> => {
    if (!studentData?.id) return;

    setLoading(true);
    try {
      const studentDataFromApi =
        await CurrentStudentService.getCurrentStudentApi(studentData.id);
      setCurrentStudent(studentDataFromApi);
      setWallet(studentDataFromApi?.wallet);
    } catch (error) {
      handleApiError(error, "Error al obtener el estudiante actual");
    } finally {
      setLoading(false);
    }
  }, [studentData?.id]);

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
  }, [authService.getAccessToken()]);

  const updateStudentProfile = async (
    aspectUpdates: Array<{ aspectId: number | null; profileId: number }>
  ): Promise<void> => {
    if (!currentStudent?.id) return;

    setLoading(true);
    try {
      await CurrentStudentService.updateCurrentStudentProfileApi(aspectUpdates);
      await getCurrentStudent();
    } catch (error) {
      handleApiError(error, "Error al actualizar el perfil del estudiante");
    } finally {
      setLoading(false);
    }
  };

  const unselectAspect = async (
    profileId: number,
    typeAspect: "REMERA" | "SOMBRERO"
  ): Promise<void> => {
    if (!currentStudent?.id) return;

    setLoading(true);
    try {
      await CurrentStudentService.unselectAspectApi(profileId, typeAspect);
      await getCurrentStudent();
    } catch (error) {
      handleApiError(error, "Error al deseleccionar aspecto");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "ROLE_STUDENT") {
      if (studentData) {
        setCurrentStudent(studentData);
        setWallet(studentData.wallet);
        setLoading(false);
      } else if (authService.getAccessToken()) {
        getCurrentStudentByToken();
        setWallet(currentStudent?.wallet);
        setLoading(false);
      } else {
        getCurrentStudent();
        setWallet(currentStudent?.wallet);
      }
    } else {
      setLoading(true);
    }
  }, [role, studentData, getCurrentStudent, getCurrentStudentByToken]);

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
    setLoading(true);
    try {
      const response = await CurrentStudentService.statisticsStudentApi();
      setStatistics(response.data);
    } catch (error) {
      handleApiError(error, "Error al cargar las estadisticas");
    } finally {
      setLoading(false);
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
    currentStudent,
    wallet,
    statistics,
    // Funciones Principales
    getCurrentStudent,
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
