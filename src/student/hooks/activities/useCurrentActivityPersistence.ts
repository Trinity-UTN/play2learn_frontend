import { useEffect, useCallback } from "react";
import { useActivityStudent } from "../useActivityStudentAPI";

const STORAGE_KEY = "currentActivityId";

export const useCurrentActivityPersistence = () => {
  const { loading, currentActivity, getActivityById } = useActivityStudent();

  useEffect(() => {
    if (currentActivity?.id) {
      sessionStorage.setItem(STORAGE_KEY, currentActivity.id.toString());
    }
  }, [currentActivity?.id]);

  const restoreCurrentActivity = useCallback(async () => {
    const savedId = sessionStorage.getItem(STORAGE_KEY);
    if (savedId && !currentActivity) {
      await getActivityById(Number(savedId));
    }
  }, [currentActivity, getActivityById]);

  const clearPersistedActivity = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const getPersistedActivityId = useCallback((): number | null => {
    const savedId = sessionStorage.getItem(STORAGE_KEY);
    return savedId ? Number(savedId) : null;
  }, []);

  return {
    restoreCurrentActivity,
    clearPersistedActivity,
    getPersistedActivityId,
    hasPersistedActivity: !!sessionStorage.getItem(STORAGE_KEY),
    loading,
  };
};
