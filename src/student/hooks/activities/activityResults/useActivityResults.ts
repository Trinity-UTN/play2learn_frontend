import { useState, useEffect } from "react";
import { ActivityStudentService } from "../../../services/activity/ActivityService";
import type {
  ActivityResultsResponseInterface,
  CurrentActivityInterface,
} from "../../../types/Activity.type";
import { getGameTypeFromActivityName, createGameConfig } from "@/shared";

interface UseActivityResultsReturn {
  results: ActivityResultsResponseInterface | null;
  activity: CurrentActivityInterface | null;
  loading: boolean;
  error: string | null;
}

export const useActivityResults = (
  activityId: number
): UseActivityResultsReturn => {
  const [results, setResults] =
    useState<ActivityResultsResponseInterface | null>(null);
  const [activity, setActivity] = useState<CurrentActivityInterface | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const [activityResponse, resultsResponse] = await Promise.all([
          ActivityStudentService.getActivityByIdApi(activityId),
          ActivityStudentService.getActivityResultsApi(activityId),
        ]);

        const activityData = activityResponse.data;
        const gameType = getGameTypeFromActivityName(activityData.name);

        if (!gameType) {
          throw new Error(
            `Tipo de juego desconocido para: "${activityData.name}"`
          );
        }

        const transformedActivity: CurrentActivityInterface = {
          ...activityData,
          gameConfig: createGameConfig(gameType, activityData),
        };

        setActivity(transformedActivity);
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

  return { results, activity, loading, error };
};
