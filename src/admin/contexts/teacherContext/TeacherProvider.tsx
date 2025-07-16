import { useCallback, useState, type ReactNode } from "react";
import { TeacherContext } from "./TeacherContext";
import type { TeacherContextType } from "./TeacherContext.type";
import { TeacherService } from "../../services/teacher/TeacherService";
import type {
  CreateTeacherPayload,
  TeacherResponseDto,
} from "../../services/teacher/TeacherService";

interface TeacherProviderProps {
  children: ReactNode;
}

export const TeacherProvider: React.FC<TeacherProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<TeacherResponseDto[]>([]);

  const registerTeacher = async (data: CreateTeacherPayload): Promise<void> => {
    setLoading(true);
    try {
      await TeacherService.registerTeacherApi(data);
    } catch (error) {
      console.error("Error al crear el docente:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTeacher = useCallback(async () => {
    setLoading(true);
    try {
      const response = await TeacherService.getTeacherApi();
      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error al obtener los docentes:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue: TeacherContextType = {
    loading,
    registerTeacher,
    getTeacher,
    teachers,
  };

  return (
    <TeacherContext.Provider value={contextValue}>
      {children}
    </TeacherContext.Provider>
  );
};
