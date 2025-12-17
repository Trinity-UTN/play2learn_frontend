import { useEffect } from "react";
import type { ActivityResultsResponseInterface } from "@/student/types/Activity.type";
import type { CurrentActivityInterface } from "@/student/types/Activity.type";
import { useActivityStudent } from "../../useActivityStudentAPI";

interface UseActivityResultsReturn {
  results: ActivityResultsResponseInterface | null;
  activity: CurrentActivityInterface | null;
  loading: boolean;
  error: string | null;
}

export const useActivityResults = (
  activityId: number
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

  return {
    results: activityResults,
    activity: currentActivity,
    loading: contextLoading,
    error: null,
  };
};
