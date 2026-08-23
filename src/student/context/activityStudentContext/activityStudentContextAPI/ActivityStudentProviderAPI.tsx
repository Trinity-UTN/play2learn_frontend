import { useState, type ReactNode, useCallback } from "react";
import { ActivityStudentContext } from "./ActivityStudentContextAPI";
import type { ActivityStudentContextType } from "./ActivityStudentContextAPI.type";
import type {
  ActivityNotApprovedResponseInterface,
  ActivityStateResponseInterface,
  CurrentActivityInterface,
  CurrentActivityAttemptInfo,
  ActivityStatsResponse,
  ActivityResultsResponseInterface,
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
  // const [loading, setLoading] = useState<boolean>(false);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [activityNotApproved, setActivitiesNotApproved] = useState<
    ActivityNotApprovedResponseInterface[]
  >([]);
  const [activityApproved, setActivitiesApproved] = useState<
    ActivityStateResponseInterface[]
  >([]);
  const [paginatedActivitiesNotApproved, setPaginatedActivitiesNotApproved] =
    useState<PaginatedData<ActivityNotApprovedResponseInterface> | null>(null);
  const [paginatedActivitiesApproved, setPaginatedActivitiesApproved] =
    useState<PaginatedData<ActivityStateResponseInterface> | null>(null);
  const [paginatedActivitiesPending, setPaginatedActivitiesPending] =
    useState<PaginatedData<ActivityStateResponseInterface> | null>(null);
  const [currentActivity, setCurrentActivity] =
    useState<CurrentActivityInterface | null>(null);
  const [activityCompleted, setActivityCompleted] =
    useState<ActivityCompletedResponseInterface | null>(null);
  const [activityStudentStats, setActivityStudentStats] =
    useState<ActivityStatsResponse | null>(null);
  const [activityResults, setActivityResults] =
    useState<ActivityResultsResponseInterface | null>(null);
  const [currentActivityAttemptInfo, setCurrentActivityAttemptInfo] =
    useState<CurrentActivityAttemptInfo | null>(null);

  // Logica de loading con peticiones en paralelo
  const startLoading = () => setPendingRequests((prev) => prev + 1);
  const stopLoading = () => setPendingRequests((prev) => Math.max(0, prev - 1));
  const loading = pendingRequests > 0;
  // Funciones Principales
  const getPaginatedActivitiesNotApproved = useCallback(
    async (params: GetPaginated): Promise<void> => {
      startLoading();
      try {
        const response =
          await ActivityStudentService.getPaginatedActivityNotApprovedApi(
            params,
          );
        setPaginatedActivitiesNotApproved(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las actividades paginadas");
      } finally {
        stopLoading();
      }
    },
    [],
  );

  const getPaginatedActivitiesApproved = useCallback(
    async (params: GetPaginated): Promise<void> => {
      startLoading();
      try {
        const response =
          await ActivityStudentService.getPaginatedActivityApprovedApi(params);
        setPaginatedActivitiesApproved(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las actividades paginadas");
      } finally {
        stopLoading();
      }
    },
    [],
  );

  const getPaginatedActivitiesPending = useCallback(
    async (params: GetPaginated): Promise<void> => {
      startLoading();
      try {
        const response =
          await ActivityStudentService.getPaginatedActivityPendingApi(params);
        setPaginatedActivitiesPending(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las actividades paginadas");
      } finally {
        stopLoading();
      }
    },
    [],
  );

  const getActivityNotApproved = useCallback(async (): Promise<void> => {
    startLoading();
    try {
      const response = await ActivityStudentService.getActivityNotApprovedApi();
      setActivitiesNotApproved(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las actividades");
    } finally {
      stopLoading();
    }
  }, []);

  const getActivityApproved = useCallback(async (): Promise<void> => {
    startLoading();
    try {
      const response = await ActivityStudentService.getActivityApprovedApi();
      setActivitiesApproved(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las actividades aprobadas");
    } finally {
      stopLoading();
    }
  }, []);

  const getActivityById = useCallback(async (id: number): Promise<void> => {
    startLoading();
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
      stopLoading();
    }
  }, []);

  const getActivityStudentStats = useCallback(async (): Promise<void> => {
    startLoading();
    try {
      const response =
        await ActivityStudentService.getActivityStudentStatsApi();
      setActivityStudentStats(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las estadísticas de actividades");
    } finally {
      stopLoading();
    }
  }, []);

  const getActivityResults = useCallback(
    async (activityId: number): Promise<void> => {
      startLoading();
      try {
        const response =
          await ActivityStudentService.getActivityResultsApi(activityId);
        setActivityResults(response.data);
      } catch (error) {
        handleApiError(
          error,
          "Error al obtener los resultados de la actividad",
        );
      } finally {
        stopLoading();
      }
    },
    [],
  );

  const registerActivityStarted = useCallback(
    async (id: number): Promise<void> => {
      startLoading();
      try {
        await ActivityStudentService.registerActivityStartedApi(id);
      } catch (error) {
        handleApiError(error, "Error al iniciar la actividad");
      } finally {
        stopLoading();
      }
    },
    [],
  );

  const registerActivityCompleted = useCallback(
    async (payload: ActivityCompletedInterface): Promise<void> => {
      startLoading();
      try {
        const response =
          await ActivityStudentService.registerActivityCompletedApi(payload);
        setActivityCompleted(response.data);
      } catch (error) {
        handleApiError(error, "Error al corregir la actividad");
      } finally {
        stopLoading();
      }
    },
    [],
  );

  const registerActivityNoLudicaCompleted = useCallback(
    async (payload: FormData): Promise<void> => {
      startLoading();
      try {
        const response =
          await ActivityStudentService.registerActivityNoLudicaCompleteApi(
            payload,
          );
        setActivityCompleted(response.data);
      } catch (error) {
        handleApiError(error, "Error al corregir la actividad");
      } finally {
        stopLoading();
      }
    },
    [],
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
    paginatedActivitiesPending,
    currentActivity,
    activityCompleted,
    activityStudentStats,
    activityResults,
    currentActivityAttemptInfo,

    // Funciones Principales
    getActivityNotApproved,
    getActivityApproved,
    getActivityById,
    getPaginatedActivitiesApproved,
    getPaginatedActivitiesNotApproved,
    getPaginatedActivitiesPending,
    getActivityStudentStats,
    getActivityResults,
    registerActivityStarted,
    registerActivityCompleted,
    registerActivityNoLudicaCompleted,

    // Funciones Auxiliares
    refreshActivityDataAfterCompletion,
    setCurrentActivityAttemptInfo,
  };

  return (
    <ActivityStudentContext.Provider value={contextValue}>
      {children}
    </ActivityStudentContext.Provider>
  );
};
