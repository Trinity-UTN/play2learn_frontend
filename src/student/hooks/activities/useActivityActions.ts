import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivityStudent } from "../../../student/hooks/useActivityStudentAPI";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useCurrentActivityPersistence } from "./useCurrentActivityPersistence";
export const useActivityActions = () => {
  const {
    currentActivity,
    getActivityById,
    registerActivityCompleted,
    refreshActivityDataAfterCompletion,
  } = useActivityStudent();

  const { clearPersistedActivity } = useCurrentActivityPersistence();
  const { showConfirmation } = useConfirmation();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
            navigate(`/dashboard/student/actividades/${activityId}/play`);
          }
        },
      });
    },
    [navigate]
  );

  const finishActivity = useCallback(
    async (isApproved: boolean, onAfterFinish?: () => void) => {
      if (!currentActivity) return;

      showConfirmation({
        title: "¿Esta seguro que desea finalizar su intento?",
        message: "Esta accion no se puede revertir",
        onConfirm: async () => {
          if (currentActivity.name !== "No Ludica") {
            await registerActivityCompleted({
              activityId: currentActivity.id,
              state: isApproved ? "APPROVED" : "DISAPPROVED",
            });
          }

          await refreshActivityDataAfterCompletion();

          clearPersistedActivity();

          if (onAfterFinish) onAfterFinish();

          navigate(`/dashboard/student/actividades/${id}/review`);
        },
      });
    },
    [
      id,
      currentActivity,
      registerActivityCompleted,
      refreshActivityDataAfterCompletion,
      clearPersistedActivity,
    ]
  );
  // const finishActivityNoLudica = useCallback(
  //   async ( onAfterFinish?: () => void) => {
  //     if (!currentActivity) return;

  //     showConfirmation({
  //       title: "¿Esta seguro que desea finalizar su intento?",
  //       message: "Esta accion no se puede revertir",
  //       onConfirm: async () => {
  //         if (currentActivity.name === "No Ludica") {
  //           console.log("yeah bro")
  //         }

  //         // await refreshActivityDataAfterCompletion();

  //         // clearPersistedActivity();

  //         // if (onAfterFinish) onAfterFinish();

  //         // navigate(`/dashboard/student/actividades/${id}/review`);
  //       },
  //     });
  //   },
  //   [
  //     id,
  //     currentActivity,
  //     registerActivityCompleted,
  //     refreshActivityDataAfterCompletion,
  //     clearPersistedActivity,
  //   ]
  // );

  return { viewActivity, startActivity, finishActivity };
};
