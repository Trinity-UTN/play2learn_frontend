import { useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivityStudent } from "../../../student/hooks/useActivityStudentAPI";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useCurrentActivityPersistence } from "./useCurrentActivityPersistence";
import usePaginateParams from "../../../shared/hooks/usePaginateParams";

export const useActivityActions = () => {
  const {
    currentActivity,
    getActivityById,
    registerActivityStarted,
    registerActivityCompleted,
    refreshActivityDataAfterCompletion,
    getPaginatedActivitiesApproved,
    getPaginatedActivitiesNotApproved,
  } = useActivityStudent();

  const { clearPersistedActivity } = useCurrentActivityPersistence();
  const { showConfirmation } = useConfirmation();
  const { paginationParams } = usePaginateParams();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isFinishingActivity = useRef(false);

  const viewActivity = useCallback(
    async (activityId: number | string) => {
      await getActivityById(Number(activityId));
      navigate(`/dashboard/student/actividades/${activityId}/view`);
    },
    [getActivityById, navigate]
  );

  const startActivity = useCallback(
    (activityId: number | string) => {
      showConfirmation({
        title: "¿Esta seguro que desea comenzar la actividad?",
        message: "Esta accion no se puede revertir",
        onConfirm: () => {
          if (activityId) {
            registerActivityStarted(Number(activityId));
            navigate(`/dashboard/student/actividades/${activityId}/play`);
          }
        },
      });
    },
    [navigate, registerActivityStarted, showConfirmation]
  );

  const finishActivity = useCallback(
    async (isApproved: boolean, onAfterFinish?: () => void) => {
      if (!currentActivity) return;

      showConfirmation({
        title: "¿Esta seguro que desea finalizar su intento?",
        message: "Esta accion no se puede revertir",
        onConfirm: async () => {
          isFinishingActivity.current = true;

          await registerActivityCompleted({
            activityId: currentActivity.id,
            state: isApproved ? "APPROVED" : "DISAPPROVED",
          });

          await refreshActivityDataAfterCompletion();

          clearPersistedActivity();

          if (onAfterFinish) onAfterFinish();

          navigate(`/dashboard/student/actividades/${id}/review`);

          setTimeout(() => {
            isFinishingActivity.current = false;
          }, 100);
        },
      });
    },
    [
      id,
      currentActivity,
      registerActivityCompleted,
      refreshActivityDataAfterCompletion,
      clearPersistedActivity,
      navigate,
      showConfirmation,
    ]
  );

  const refreshActivitiesOnNavigationAway = useCallback(async () => {
    try {
      await Promise.all([
        getPaginatedActivitiesApproved(paginationParams),
        getPaginatedActivitiesNotApproved(paginationParams),
      ]);
    } catch (error) {
      console.error("Error al refrescar actividades:", error);
    }
  }, [
    getPaginatedActivitiesApproved,
    getPaginatedActivitiesNotApproved,
    paginationParams,
  ]);

  const canNavigate = useCallback(() => {
    return isFinishingActivity.current;
  }, []);

  return {
    viewActivity,
    startActivity,
    finishActivity,
    canNavigate,
    refreshActivitiesOnNavigationAway,
  };
};
