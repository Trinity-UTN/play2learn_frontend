import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivityStudent } from "../../../student/hooks/useActivityStudentAPI";

export const useFinishActivity = () => {
  const {
    currentActivity,
    registerActivityCompleted,
    refreshStudentDataAfterCompletion,
  } = useActivityStudent();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const finishActivity = useCallback(
    async (isApproved: boolean, onAfterFinish?: () => void) => {
      if (!currentActivity) return;

      await registerActivityCompleted({
        activityId: currentActivity.id,
        state: isApproved ? "APPROVED" : "DISAPPROVED",
      });

      await refreshStudentDataAfterCompletion();

      if (onAfterFinish) onAfterFinish();

      navigate(`/dashboard/student/actividades/${id}/review`);
    },
    [
      currentActivity,
      id,
      registerActivityCompleted,
      refreshStudentDataAfterCompletion,
    ]
  );

  return { finishActivity };
};
