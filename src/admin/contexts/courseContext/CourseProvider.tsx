import { useCallback, useState, type ReactNode } from "react";
import { CourseContext } from "./CourseContext";
import type { CourseContextType } from "./CourseContext.type";
import { CourseService } from "../../services/course/CourseService";
import type {
  CreateCoursePayload,
  CourseResponseDto,
  UpdateCoursePayload,
} from "../../services/course/CourseService";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseResponseDto[]>([]);
  const [paginatedCourse, setPaginatedCourse] =
    useState<PaginatedData<CourseResponseDto> | null>(null);

  const registerCourse = async (data: CreateCoursePayload): Promise<void> => {
    setLoading(true);
    try {
      await CourseService.registerCourseApi(data);
    } catch (error) {
      console.error("Error al crear el curso:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const updateCourse = async (data: UpdateCoursePayload): Promise<void> => {
    setLoading(true);
    try {
      await CourseService.updateCourseApi(data);
    } catch (error) {
      console.error("Error al actualizar el curso:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const getCourse = useCallback(async () => {
    setLoading(true);
    try {
      const response = await CourseService.getCourseApi();
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPaginatedCourse = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await CourseService.getPaginatedCourseApi(params);
        setPaginatedCourse(response.data);
      } catch (error) {
        console.error("Error al obtener los cursos paginados:", error); // TODO: REMOVE_DEBUG
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteCourse = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await CourseService.deleteCourseApi(id);
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
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
    deleteCourse,
    getPaginatedCourse,
    updateCourse,
    paginatedCourse,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  );
};
