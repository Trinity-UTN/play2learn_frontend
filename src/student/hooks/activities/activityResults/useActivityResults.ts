import { useEffect } from "react";
import type { ActivityResultsResponseInterface } from "@/student/types/Activity.type";
import type { CurrentActivityInterface } from "@/student/types/Activity.type";
import { ACTIVITY_RESULTS_MESSAGES } from "@/student/constants/activityResults.constants";
import { useActivityStudent } from "../../useActivityStudentAPI";

interface UseActivityResultsReturn {
  results: ActivityResultsResponseInterface | null;
  activity: CurrentActivityInterface | null;
  loading: boolean;
  teacherFeedbackMessage: string | null;
  error: string | null;
}

export const useActivityResults = (
  activityId: number,
): UseActivityResultsReturn => {
  const {
    currentActivity,
    activityResults,
    loading: contextLoading,
    getActivityById,
    getActivityResults,
  } = useActivityStudent();

  useEffect(() => {
    if (activityId) {
      Promise.all([
        getActivityById(activityId),
        getActivityResults(activityId),
      ]).catch(() => {
        // Los errores ya son manejados por handleApiError en el provider
      });
    }
  }, [activityId, getActivityById, getActivityResults]);

  const teacherFeedbackMessage = (() => {
    if (!activityResults || !currentActivity) return null;
    if (activityResults.comment) {
      return activityResults.comment;
    }

    const isNoLudica = currentActivity.name === "No Ludica";

    if (isNoLudica) {
      return ACTIVITY_RESULTS_MESSAGES.TEACHER_PENDING_CORRECTION;
    }

    return null;
  })();

  return {
    loading: contextLoading,
    activity: currentActivity,
    results: activityResults,
    teacherFeedbackMessage,
    error: null,
  };
};
