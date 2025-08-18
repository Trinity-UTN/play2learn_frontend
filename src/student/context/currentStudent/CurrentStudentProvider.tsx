import { useCallback, useState, useEffect, type ReactNode } from "react";
import { CurrentStudentContext } from "./CurrentStudentContext";
import type { CurrentStudentContextType } from "./CurrentStudentContext.type";
import { CurrentStudentService } from "../../services/student/CurrentStudentService";
import type {
  CurrentStudent,
  UpdateProfilePayload,
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

  const getCurrentStudent = useCallback(async (): Promise<void> => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const studentId = user.id - 2;
      const studentData = await CurrentStudentService.getCurrentStudentApi(
        studentId
      );
      setCurrentStudent(studentData);
      console.log("studentData", studentData);
      console.log("currentStudent", currentStudent);
    } catch (error) {
      console.error("Error al obtener el estudiante actual:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const updateStudentProfile = async (
    profileData: UpdateProfilePayload
  ): Promise<void> => {
    if (!currentStudent?.id) return;

    setLoading(true);
    try {
      await CurrentStudentService.updateCurrentStudentProfileApi(
        currentStudent.id,
        profileData
      );
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
      console.log("user?.id", user?.id);
      getCurrentStudent();
    }
  }, [user?.id, getCurrentStudent]);

  const contextValue: CurrentStudentContextType = {
    loading,
    currentStudent,
    getCurrentStudent,
    updateStudentProfile,
    setCurrentStudent,
  };

  return (
    <CurrentStudentContext.Provider value={contextValue}>
      {children}
    </CurrentStudentContext.Provider>
  );
};
