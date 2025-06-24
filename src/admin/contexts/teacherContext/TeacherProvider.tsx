import { useState, type ReactNode } from "react";
import { TeacherContext } from "./TeacherContext";
import type { TeacherContextType } from "./TeacherContext.type";
import { TeacherService } from "../../services/teacher/TeacherService";
import type { CreateTeacherPayload } from "../../services/teacher/TeacherService";

interface TeacherProviderProps {
  children: ReactNode;
}

export const TeacherProvider: React.FC<TeacherProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const registerTeacher = async (data: CreateTeacherPayload): Promise<void> => {
    setLoading(true);
    try {
      console.log(data);
      await TeacherService.registerTeacherApi(data);
    } catch (error) {
      console.error("Error al crear el docente:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: TeacherContextType = {
    loading,
    registerTeacher,
  };

  return (
    <TeacherContext.Provider value={contextValue}>
      {children}
    </TeacherContext.Provider>
  );
};
