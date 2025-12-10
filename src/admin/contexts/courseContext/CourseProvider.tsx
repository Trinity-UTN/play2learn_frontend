import { useCallback, useMemo, useState, type ReactNode } from "react";
import { CourseContext } from "./CourseContext";
import type { CourseContextType } from "./CourseContext.type";
import { CourseService } from "../../services/course/CourseService";
import type {
  CreateCoursePayload,
  CourseResponseDto,
  UpdateCoursePayload,
} from "@/admin/types/course.types";
import {
  useHandleApiError,
  type GetPaginated,
  type PaginatedData,
  useToaster,
  withLoading,
} from "@/shared";

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseResponseDto[]>([]);
  const [paginatedCourse, setPaginatedCourse] =
    useState<PaginatedData<CourseResponseDto> | null>(null);
  const [selectedCourse, setSelectedCourse] =
    useState<CourseResponseDto | null>(null);

  const registerCourse = useCallback(
    async (data: CreateCoursePayload): Promise<void> => {
      await withLoading(async () => {
        try {
          await CourseService.registerCourseApi(data);

          showToast({
            title: "Curso creado exitosamente",
            message: "El curso ha sido creado exitosamente",
            type: "success",
            position: "bottom-right",
          });
        } catch (error) {
          handleApiError(error, "Error al crear el curso");
          throw error;
        }
      }, setLoading);
    },
    []
  );

  const updateCourse = useCallback(
    async (data: UpdateCoursePayload): Promise<void> => {
      await withLoading(async () => {
        try {
          await CourseService.updateCourseApi(data);

          showToast({
            title: "Curso actualizado exitosamente",
            message: "El curso ha sido actualizado exitosamente",
            type: "success",
            position: "bottom-right",
          });
        } catch (error) {
          handleApiError(error, "Error al actualizar el curso");
          throw error;
        }
      }, setLoading);
    },
    []
  );

  const getCourse = useCallback(async (): Promise<void> => {
    await withLoading(async () => {
      try {
        const response = await CourseService.getCourseApi();
        setCourses(response.data.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los cursos");
        throw error;
      }
    }, setLoading);
  }, []);

  const getCourseById = useCallback(
    async (id: number): Promise<CourseResponseDto | undefined> => {
      return await withLoading(async () => {
        try {
          return await CourseService.getCourseByIdApi(id);
        } catch (error) {
          handleApiError(error, "Error al obtener el curso");
          throw error;
        }
      }, setLoading);
    },
    []
  );

  const getPaginatedCourse = useCallback(
    async (params: GetPaginated): Promise<void> => {
      await withLoading(async () => {
        try {
          const response = await CourseService.getPaginatedCourseApi(params);
          setPaginatedCourse(response.data);
        } catch (error) {
          handleApiError(error, "Error al obtener cursos paginados");
          throw error;
        }
      }, setLoading);
    },
    []
  );

  const deleteCourse = useCallback(async (id: number): Promise<void> => {
    await withLoading(async () => {
      try {
        await CourseService.deleteCourseApi(id);
      } catch (error) {
        handleApiError(error, "Error al eliminar el curso");
        throw error;
      }
    }, setLoading);
  }, []);

  const actions = useMemo(
    () => ({
      registerCourse,
      updateCourse,
      getCourse,
      getCourseById,
      getPaginatedCourse,
      deleteCourse,
      setSelectedCourse,
    }),
    [
      registerCourse,
      updateCourse,
      getCourse,
      getCourseById,
      getPaginatedCourse,
      deleteCourse,
    ]
  );

  const state = useMemo(
    () => ({
      loading,
      courses,
      paginatedCourse,
      selectedCourse,
    }),
    [loading, courses, paginatedCourse, selectedCourse]
  );

  const contextValue: CourseContextType = useMemo(
    () => ({
      ...state,
      ...actions,
    }),
    [state, actions]
  );

  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  );
};
