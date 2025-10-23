import { useMemo } from "react";
import { ACTIVITY_STATS_CONFIG } from "../../../constants/activities.constants";
import { useActivityStudent } from "../../useActivityStudentAPI";

export const useActivityStats = () => {
  const { activityStudentStats } = useActivityStudent();

  const counts = useMemo(() => {
    if (!activityStudentStats) {
      return {
        available: 0,
        approved: 0,
        dissaproved: 0,
        expired: 0,
      };
    }
    return activityStudentStats;
  }, [activityStudentStats]);

  const stats = useMemo(() => {
    return ACTIVITY_STATS_CONFIG.map((config) => ({
      ...config,
      value: counts[config.key as keyof typeof counts],
    }));
  }, [activityStudentStats]);

  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return { stats, counts, totalCount };
};
