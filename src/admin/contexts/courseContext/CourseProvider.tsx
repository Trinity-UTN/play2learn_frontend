import { useState, type ReactNode } from "react";
import { CourseContext } from "./CourseContext";
import type { CourseContextType } from "./CourseContext.type";
import { CourseService } from "../../services/course/CourseService";
import type {
  CreateCoursePayload,
  GetCoursePayload,
} from "../../services/course/CourseService";

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<GetCoursePayload[]>([]);

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

  const getCourse = async () => {
    setLoading(true);
    try {
      const response = await CourseService.getCourseApi();
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: CourseContextType = {
    loading,
    registerCourse,
    getCourse,
    courses,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  );
};
