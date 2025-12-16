import { useState, type ReactNode, useCallback } from "react";
import { ActivityStudentContext } from "./ActivityStudentContextAPI";
import type { ActivityStudentContextType } from "./ActivityStudentContextAPI.type";
import type {
  ActivityNotApprovedResponseInterface,
  ActivityApprovedResponseInterface,
  CurrentActivityInterface,
  ActivityStatsResponse,
} from "../../../types/Activity.type";
import type {
  ActivityCompletedInterface,
  ActivityCompletedResponseInterface,
} from "../../../types/ActivityCompleted.type";
import type { GetPaginated, PaginatedData } from "@/shared";
import { ActivityStudentService } from "../../../services/activity/ActivityService";
import {
  getGameTypeFromActivityName,
  createGameConfig,
  useHandleApiError,
  usePaginationParams,
} from "@/shared";

import { useCurrentStudent } from "../../../hooks/useCurrentStudent";

export const ActivityStudentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { handleApiError } = useHandleApiError();
  const { paginationParams } = usePaginationParams();
  const { getCurrentStudentByToken } = useCurrentStudent();

  // Estados Principales
  const [loading, setLoading] = useState<boolean>(false);
  const [activityNotApproved, setActivitiesNotApproved] = useState<
    ActivityNotApprovedResponseInterface[]
  >([]);
  const [activityApproved, setActivitiesApproved] = useState<
    ActivityApprovedResponseInterface[]
  >([]);
  const [paginatedActivitiesNotApproved, setPaginatedActivitiesNotApproved] =
    useState<PaginatedData<ActivityNotApprovedResponseInterface> | null>(null);
  const [paginatedActivitiesApproved, setPaginatedActivitiesApproved] =
    useState<PaginatedData<ActivityApprovedResponseInterface> | null>(null);
  const [currentActivity, setCurrentActivity] =
    useState<CurrentActivityInterface | null>(null);
  const [activityCompleted, setActivityCompleted] =
    useState<ActivityCompletedResponseInterface | null>(null);
  const [activityStudentStats, setActivityStudentStats] =
    useState<ActivityStatsResponse | null>(null);

  // Funciones Principales
  const getPaginatedActivitiesNotApproved = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response =
          await ActivityStudentService.getPaginatedActivityNotApprovedApi(
            params
          );
        setPaginatedActivitiesNotApproved(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las actividades paginadas");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getPaginatedActivitiesApproved = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response =
          await ActivityStudentService.getPaginatedActivityApprovedApi(params);
        setPaginatedActivitiesApproved(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las actividades paginadas");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getActivityNotApproved = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await ActivityStudentService.getActivityNotApprovedApi();
      setActivitiesNotApproved(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las actividades");
    } finally {
      setLoading(false);
    }
  }, []);

  const getActivityApproved = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await ActivityStudentService.getActivityApprovedApi();
      setActivitiesApproved(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las actividades aprobadas");
    } finally {
      setLoading(false);
    }
  }, []);

  const getActivityById = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    try {
      const response = await ActivityStudentService.getActivityByIdApi(id);
      const data = response.data;

      const gameType = getGameTypeFromActivityName(data.name);
      if (!gameType) {
        throw new Error(`Tipo de juego desconocido para: "${data.name}"`);
      }

      const transformedActivity: CurrentActivityInterface = {
        ...data,
        gameConfig: createGameConfig(gameType, data),
      };

      setCurrentActivity(transformedActivity);
    } catch (error) {
      handleApiError(error, "Error al obtener la actividad");
    } finally {
      setLoading(false);
    }
  }, []);

  const getActivityStudentStats = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response =
        await ActivityStudentService.getActivityStudentStatsApi();
      setActivityStudentStats(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las estadísticas de actividades");
    } finally {
      setLoading(false);
    }
  }, []);

  const registerActivityStarted = useCallback(
    async (id: number): Promise<void> => {
      setLoading(true);
      try {
        await ActivityStudentService.registerActivityStartedApi(id);
      } catch (error) {
        handleApiError(error, "Error al iniciar la actividad");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const registerActivityCompleted = useCallback(
    async (payload: ActivityCompletedInterface): Promise<void> => {
      setLoading(true);
      try {
        const response =
          await ActivityStudentService.registerActivityCompletedApi(payload);
        setActivityCompleted(response.data);
      } catch (error) {
        handleApiError(error, "Error al corregir la actividad");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const registerActivityNoLudicaCompleted = useCallback(
    async (payload: FormData): Promise<void> => {
      setLoading(true);
      try {
        const response =
          await ActivityStudentService.registerActivityNoLudicaCompleteApi(
            payload
          );
        setActivityCompleted(response.data);
      } catch (error) {
        handleApiError(error, "Error al corregir la actividad");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Funciones Auxiliares
  const refreshActivityDataAfterCompletion = async () => {
    await Promise.all([
      getPaginatedActivitiesApproved(paginationParams),
      getPaginatedActivitiesNotApproved(paginationParams),
      getCurrentStudentByToken(),
    ]);
  };

  const contextValue: ActivityStudentContextType = {
    // Estados Principales
    loading,
    activityNotApproved,
    activityApproved,
    paginatedActivitiesApproved,
    paginatedActivitiesNotApproved,
    currentActivity,
    activityCompleted,
    activityStudentStats,

    // Funciones Principales
    getActivityNotApproved,
    getActivityApproved,
    getActivityById,
    getPaginatedActivitiesApproved,
    getPaginatedActivitiesNotApproved,
    getActivityStudentStats,
    registerActivityStarted,
    registerActivityCompleted,
    registerActivityNoLudicaCompleted,

    // Funciones Auxiliares
    refreshActivityDataAfterCompletion,
  };

  return (
    <ActivityStudentContext.Provider value={contextValue}>
      {children}
    </ActivityStudentContext.Provider>
  );
};
