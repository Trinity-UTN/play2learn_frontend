import { useEffect, useCallback, useState, type ReactNode } from "react";
import { ActivityTeacherService } from "../../services/activityTeacher/ActivityTeacherService";
import { ActivityTeacherContext } from "./ActivityTeacherContext";
import type { ActivityTeacherContextType } from "./ActivityTeacherContext.type";
import type { ActivityTeacherResponse } from "../../types/TeacherActivity.type";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";

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
      setLoading(true);
      try {
        const response =
          await ActivityTeacherService.getPaginatedActivitiesTeacherApi(params);
        setPaginatedActivitiesTeacher(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los beneficios paginados");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const contextValue: ActivityTeacherContextType = {
    // Estados generales
    loading,
    selectedActivityTeacher,
    paginatedActivitiesTeacher,

    // Funciones principales
    getPaginatedActivitiesTeacher,

    // Funciones auxiliares
    setSelectedActivityTeacher,
  };

  return (
    <ActivityTeacherContext.Provider value={contextValue}>
      {children}
    </ActivityTeacherContext.Provider>
  );
};
