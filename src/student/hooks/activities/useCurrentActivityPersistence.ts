import { useEffect, useCallback } from "react";
import { StorageKeys, getItem, removeItem, setItem } from "@/shared";
import { useActivityStudent } from "../useActivityStudentAPI";

export const useCurrentActivityPersistence = () => {
  const { loading, currentActivity, getActivityById } = useActivityStudent();

  useEffect(() => {
    if (currentActivity?.id) {
      setItem(StorageKeys.currentActivityId, currentActivity.id, "session");
    }
  }, [currentActivity?.id]);

  const restoreCurrentActivity = useCallback(async () => {
    const savedId = getItem<number>(StorageKeys.currentActivityId, "session");
    if (savedId && !currentActivity) {
      await getActivityById(savedId);
    }
  }, [currentActivity, getActivityById]);

  const clearPersistedActivity = useCallback(() => {
    removeItem(StorageKeys.currentActivityId, "session");
  }, []);

  const getPersistedActivityId = useCallback((): number | null => {
    return getItem<number>(StorageKeys.currentActivityId, "session");
  }, []);

  return {
    restoreCurrentActivity,
    clearPersistedActivity,
    getPersistedActivityId,
    hasPersistedActivity:
      getItem<number>(StorageKeys.currentActivityId, "session") !== null,
    loading,
  };
};
