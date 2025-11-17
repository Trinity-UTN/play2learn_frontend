import { useEffect, useState } from "react";
import { useActivityTeacher } from "../../useActivityTeacher";

/**
 * Hook para obtener datos de una actividad específica del docente
 */
export const useActivityDetailsTeacherData = (
  activityId: string | undefined
) => {
  const {
    loading: apiLoading,
    activityDetails,
    getActivityDetailsTeacher,
  } = useActivityTeacher();

  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  useEffect(() => {
    if (activityId && !hasAttemptedFetch) {
      getActivityDetailsTeacher(Number(activityId));
      setHasAttemptedFetch(true);
    }
  }, [activityId, getActivityDetailsTeacher, hasAttemptedFetch]);

  // loading = está cargando o aún no intentó cargar
  const loading = !hasAttemptedFetch || apiLoading;

  return {
    loading,
    activity: activityDetails,
  };
};
