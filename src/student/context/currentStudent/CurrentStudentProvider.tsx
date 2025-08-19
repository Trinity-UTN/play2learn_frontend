import { useCallback, useState, useEffect, type ReactNode } from "react";
import { CurrentStudentContext } from "./CurrentStudentContext";
import type { CurrentStudentContextType } from "./CurrentStudentContext.type";
import { CurrentStudentService } from "../../services/student/CurrentStudentService";
import type {
  CurrentStudent,
  AvatarComponents,
} from "../../types/CurrentStudent.type";
import { useAuth } from "../../../user/hooks/useAuth";

interface CurrentStudentProviderProps {
  children: ReactNode;
}

export const CurrentStudentProvider: React.FC<CurrentStudentProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [currentStudent, setCurrentStudent] = useState<CurrentStudent | null>(
    null
  );

  // Funciones Principales
  const getCurrentStudent = useCallback(async (): Promise<void> => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const studentId = user.id - 2; // TODO: REVAMP (cuando se implemente mejor en backend)
      const studentData = await CurrentStudentService.getCurrentStudentApi(
        studentId
      );
      setCurrentStudent(studentData);
    } catch (error) {
      console.error("Error al obtener el estudiante actual:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const updateStudentProfile = async (
    aspectUpdates: Array<{ aspectId: number; profileId: number }>
  ): Promise<void> => {
    if (!currentStudent?.id) return;

    setLoading(true);
    try {
      await CurrentStudentService.updateCurrentStudentProfileApi(aspectUpdates);
      await getCurrentStudent();
    } catch (error) {
      console.error("Error al actualizar el perfil del estudiante:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getCurrentStudent();
    }
  }, [user?.id, getCurrentStudent]);

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
