import { useState, type ReactNode } from "react";
import { CourseContext } from "./CourseContext";
import type { CourseContextType } from "./CourseContext.type";
import { CourseService } from "../../services/course/CourseService";
import type { CreateCoursePayload } from "../../services/course/CourseService";

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const registerCourse = async (data: CreateCoursePayload): Promise<void> => {
    setLoading(true);
    try {
      await CourseService.registerCourseApi(data);
    } catch (error) {
      console.error("Error al crear el curso:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: CourseContextType = {
    loading,
    registerCourse,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  );
};
