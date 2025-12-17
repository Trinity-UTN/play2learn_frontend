import { useState, useEffect } from "react";
import { ActivityStudentService } from "../../../services/activity/ActivityService";
import type { ActivityResultsResponseInterface } from "../../../types/Activity.type";

interface UseActivityResultsReturn {
  results: ActivityResultsResponseInterface | null;
  loading: boolean;
  error: string | null;
}

export const useActivityResults = (
  activityId: number
): UseActivityResultsReturn => {
  const [results, setResults] =
    useState<ActivityResultsResponseInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const resultsResponse =
          await ActivityStudentService.getActivityResultsApi(activityId);
        setResults(resultsResponse.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Error al cargar los resultados de la actividad"
        );
        console.error("Error fetching activity results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (activityId) {
      fetchResults();
    }
  }, [activityId]);

  return { results, loading, error };
};
