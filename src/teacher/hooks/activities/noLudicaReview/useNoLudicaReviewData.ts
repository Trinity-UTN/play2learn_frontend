import { useEffect, useRef } from "react";
import { useNoLudicaReview } from "../../useNoLudicaReview";

/**
 * Hook para cargar y manejar los datos de un intento específico para revisión
 */
export const useNoLudicaReviewData = (
  activityCompletedId: string | undefined
) => {
  const {
    loadingAttempt,
    currentAttempt,
    storedAttemptData,
    getAttemptDetails,
  } = useNoLudicaReview();

  // Ijarse si ya se cargo el intento
  const fetchedIdRef = useRef<string | null>(null);

  // Cargar detalles del intento cuando hay ID (solo una vez por ID)
  useEffect(() => {
    if (activityCompletedId && fetchedIdRef.current !== activityCompletedId) {
      fetchedIdRef.current = activityCompletedId;
      getAttemptDetails(Number(activityCompletedId));
    }
  }, [activityCompletedId, getAttemptDetails]);

  return {
    loading: loadingAttempt,
    attemptData: currentAttempt,
    storedData: storedAttemptData,
  };
};
