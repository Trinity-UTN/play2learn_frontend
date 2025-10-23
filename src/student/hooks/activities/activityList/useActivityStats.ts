import { useMemo } from "react";
import { ACTIVITY_STATS_CONFIG } from "../../../constants/activities.constants";
import { calculateActivityCounts } from "../../../utils/activities.utils";

export const useActivityStats = (
  notApprovedActivities: any[],
  approvedActivities: any[]
) => {
  const counts = useMemo(
    () => calculateActivityCounts(notApprovedActivities, approvedActivities),
    [notApprovedActivities, approvedActivities]
  );

  const stats = useMemo(() => {
    return ACTIVITY_STATS_CONFIG.map((config) => ({
      ...config,
      value: counts[config.key as keyof typeof counts],
    }));
  }, [counts]);

  return { stats, counts };
};
