import { useEffect, useCallback, useState, type ReactNode } from "react";
import { ActivityTeacherService } from "../../services/activityTeacher/ActivityTeacherService";
import { ActivityTeacherContext } from "./ActivityTeacherContext";
import type { ActivityTeacherContextType } from "./ActivityTeacherContext.type";
import type {
  ActivityTeacherDetailsResponse,
  ActivityTeacherResponse,
} from "../../types/TeacherActivity.type";
import type {
  SubjectSimplifiedResponseDto,
  CourseResponseDto,
  YearResponseDto,
} from "@/admin";
import type { GetPaginated, PaginatedData } from "@/shared";
import { useHandleApiError } from "@/shared";

interface BenefitProviderProps {
  children: ReactNode;
}

const SELECTED_ACTIVITY_KEY = "teacher_selected_activity";

export const ActivityTeacherProvider: React.FC<BenefitProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();

  // Estados generales
  const [loading, setLoading] = useState<boolean>(false);

  /// Estados de actividad
  const [selectedActivityTeacher, setSelectedActivityTeacher] =
    useState<ActivityTeacherResponse | null>(() => {
      try {
        const stored = localStorage.getItem(SELECTED_ACTIVITY_KEY);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.warn("Error al leer selectedBenefit de localStorage", error);
        return null;
      }
    });
  const [paginatedActivitiesTeacher, setPaginatedActivitiesTeacher] =
    useState<PaginatedData<ActivityTeacherResponse> | null>(null);
  const [activityDetails, setActivityDetails] =
    useState<ActivityTeacherDetailsResponse | null>(null);

  /// Estados de materias, cursos, años
  const [subjectsTeacher, setSubjectsTeacher] = useState<
    SubjectSimplifiedResponseDto[]
  >([]);
  const [coursesTeacher, setCoursesTeacher] = useState<CourseResponseDto[]>([]);
  const [yearsTeacher, setYearsTeacher] = useState<YearResponseDto[]>([]);

  useEffect(() => {
    if (selectedActivityTeacher === null) {
      localStorage.removeItem(SELECTED_ACTIVITY_KEY);
    } else {
      try {
        localStorage.setItem(
          SELECTED_ACTIVITY_KEY,
          JSON.stringify(selectedActivityTeacher)
        );
      } catch (error) {
        console.warn(
          "No se pudo guardar selectedActivityTeacher en localStorage",
          error
        );
      }
    }
  }, [selectedActivityTeacher]);

  // Funciones principales
  const getPaginatedActivitiesTeacher = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setPaginatedActivitiesTeacher(null);
      setLoading(true);
      try {
        const response =
          await ActivityTeacherService.getPaginatedActivitiesTeacherApi(params);
        setPaginatedActivitiesTeacher(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las actividades paginados");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getActivityDetailsTeacher = useCallback(
    async (activityId: number): Promise<void> => {
      setLoading(true);
      try {
        const response =
          await ActivityTeacherService.getActivityDetailsTeacherApi(activityId);
        setActivityDetails(response);
      } catch (error) {
        handleApiError(error, "Error al obtener detalles de la actividad");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getSubjectCoursesYearsTeacher = useCallback(async () => {
    setLoading(true);
    try {
      const { subjects, courses, years } =
        await ActivityTeacherService.getSubjectCoursesYearsTeacherApi();
      setSubjectsTeacher(subjects);
      setCoursesTeacher(courses);
      setYearsTeacher(years);
    } catch (error) {
      handleApiError(
        error,
        "Error al obtener las materias, cursos y años del docente"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue: ActivityTeacherContextType = {
    // Estados generales
    loading,
    selectedActivityTeacher,
    paginatedActivitiesTeacher,
    activityDetails,

    // Estados de materias, cursos, años
    subjectsTeacher,
    coursesTeacher,
    yearsTeacher,

    // Funciones principales
    getPaginatedActivitiesTeacher,
    getActivityDetailsTeacher,
    getSubjectCoursesYearsTeacher,

    // Funciones auxiliares
    setSelectedActivityTeacher,
  };

  return (
    <ActivityTeacherContext.Provider value={contextValue}>
      {children}
    </ActivityTeacherContext.Provider>
  );
};
