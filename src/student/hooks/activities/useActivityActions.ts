import { useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { GameHook } from "@/shared";
import { useActivityStudent } from "../../../student/hooks/useActivityStudentAPI";
import { useConfirmation, usePaginationParams } from "@/shared";
import { useActivityRules } from "./useActivityRules";
import { useCurrentActivityPersistence } from "./useCurrentActivityPersistence";

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
  const { rules } = useActivityRules();
  const { paginationParams } = usePaginationParams();

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

  const viewActivityResults = useCallback(
    (activityId: number | string) => {
      navigate(`/dashboard/student/actividades/${activityId}/results`);
    },
    [navigate]
  );

  const startActivity = useCallback(
    (activityId: number | string) => {
      showConfirmation({
        title: "¿Estás seguro de comenzar la actividad?",
        message:
          "Una vez que inicies la actividad, deberás completarla sin interrupciones. Antes de continuar, asegúrate de leer las reglas.",
        type: "warning",
        confirmText: "Sí, quiero comenzar",
        cancelText: "Cancelar",
        showDoubleConfirmation: true,
        doubleConfirmationText: "Confirma que has leído y aceptas las reglas",
        rules: rules,
        showRulesIcon: false,
        onConfirm: () => {
          if (activityId) {
            registerActivityStarted(Number(activityId));
            navigate(`/dashboard/student/actividades/${activityId}/play`);
          }
        },
      });
    },
    [navigate, registerActivityStarted, showConfirmation, rules]
  );

  const finishActivity = useCallback(
    async (
      isApproved: boolean,
      gameManager?: GameHook | null,
      onAfterFinish?: () => void
    ) => {
      if (!currentActivity) return;

      showConfirmation({
        title: "¿Estás seguro de finalizar tu intento?",
        message: "Esta acción no se puede revertir",
        type: isApproved ? "info" : "warning",
        confirmText: "Sí, finalizar intento",
        cancelText: "Cancelar",
        onConfirm: async () => {
          isFinishingActivity.current = true;

          if (currentActivity.name !== "No Ludica") {
            await registerActivityCompleted({
              activityId: currentActivity.id,
              state: isApproved ? "APPROVED" : "DISAPPROVED",
              score: gameManager?.score ?? null,
              correctAnswers: gameManager?.correctAnswers ?? null,
              incorrectAnswers: gameManager?.incorrectAnswers ?? null,
              unanswered: gameManager?.unanswered ?? null,
            });
          }

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

  const forceFinishActivity = useCallback(
    async (
      isApproved: boolean,
      gameManager?: GameHook | null,
      onAfterFinish?: () => void
    ) => {
      if (!currentActivity) return;

      isFinishingActivity.current = true;

      await registerActivityCompleted({
        activityId: currentActivity.id,
        state: isApproved ? "APPROVED" : "DISAPPROVED",
        score: gameManager?.score ?? null,
        correctAnswers: gameManager?.correctAnswers ?? null,
        incorrectAnswers: gameManager?.incorrectAnswers ?? null,
        unanswered: gameManager?.unanswered ?? null,
      });

      await refreshActivityDataAfterCompletion();

      clearPersistedActivity();

      if (onAfterFinish) onAfterFinish();

      navigate(`/dashboard/student/actividades/${id}/review`);

      setTimeout(() => {
        isFinishingActivity.current = false;
      }, 100);
    },
    [
      id,
      currentActivity,
      registerActivityCompleted,
      refreshActivityDataAfterCompletion,
      clearPersistedActivity,
      navigate,
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
    viewActivityResults,
    startActivity,
    finishActivity,
    forceFinishActivity,
    canNavigate,
    refreshActivitiesOnNavigationAway,
  };
};
