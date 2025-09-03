import { useCallback, useState, useEffect, type ReactNode } from "react";
import { CurrentStudentContext } from "./CurrentStudentContext";
import type { CurrentStudentContextType } from "./CurrentStudentContext.type";
import { CurrentStudentService } from "../../services/student/CurrentStudentService";
import type {
  CurrentStudent,
  AvatarComponents,
} from "../../types/CurrentStudent.type";
import { useAuth } from "../../../user/hooks/useAuth";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";

interface CurrentStudentProviderProps {
  children: ReactNode;
}

export const CurrentStudentProvider: React.FC<CurrentStudentProviderProps> = ({
  children,
}) => {
  const { role, studentData } = useAuth();
  const { handleApiError } = useHandleApiError();

  const [loading, setLoading] = useState<boolean>(false);
  const [currentStudent, setCurrentStudent] = useState<CurrentStudent | null>(
    null
  );

  // Funciones Principales
  const getCurrentStudent = useCallback(async (): Promise<void> => {
    if (!studentData?.id) return;

    setLoading(true);
    try {
      const studentDataFromApi =
        await CurrentStudentService.getCurrentStudentApi(studentData.id);
      setCurrentStudent(studentDataFromApi);
    } catch (error) {
      handleApiError(error, "Error al obtener el estudiante actual");
    } finally {
      setLoading(false);
    }
  }, [studentData?.id]);

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
    if (role === "ROLE_STUDENT" && studentData) {
      setCurrentStudent(studentData);
    }
  }, [role, studentData]);

  // Funcioens de utilidad
  const getAvatarComponents = (): AvatarComponents => {
    const profile = currentStudent?.profile;
    return {
      body:
        profile?.selectedBody?.image || "/placeholder.svg?height=200&width=200",
      shirt:
        profile?.selectedShirt?.image ||
        "/placeholder.svg?height=200&width=200",
      hat:
        profile?.selectedHat?.image || "/placeholder.svg?height=200&width=200",
    };
  };

  const contextValue: CurrentStudentContextType = {
    // Estados principales
    loading,
    currentStudent,

    // Funciones Principales
    getCurrentStudent,
    updateStudentProfile,
    unselectAspect,

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
