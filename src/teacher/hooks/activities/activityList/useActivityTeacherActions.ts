import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ActivityActionHandlers } from "../../../utils/activity/activityTeacher.utils";
import type { ActivityTeacherResponse } from "../../../types/TeacherActivity.type";
import { useConfirmation, useToaster } from "@/shared";
import { useActivityTeacher } from "../../useActivityTeacher";
import { activityCodeMap } from "@/activity/utils/activityCodeMap";

export const useActivityTeacherActions = (): {
  actions: ActivityActionHandlers;
  loading: boolean;
} => {
  const navigate = useNavigate();
  const { loading: apiLoading, setSelectedActivityTeacher } =
    useActivityTeacher();

  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();

  const handleViewDetailsActivity = useCallback(
    (activity: ActivityTeacherResponse, activityId: number) => {
      setSelectedActivityTeacher(activity);
      navigate(`/dashboard/teacher/actividades/created/details/${activityId}`);
    },
    [navigate, setSelectedActivityTeacher],
  );

  const handleReexposeActivity = useCallback(
    (activityId: number, activityName: string) => {
      showConfirmation({
        title: "Re-exponer actividad",
        message:
          "¿Estás seguro de re-exponer la actividad? Podrás editarla antes de publicarla",
        onConfirm: () => {
          const code = activityCodeMap[activityName];
          navigate(
            `/dashboard/teacher/actividades/configuration/${code}/${activityId}`,
          );
          showToast({
            title: "Actividad en proceso de re-exposición",
            message: "Edita la actividad antes de publicarla",
            position: "bottom-right",
            type: "success",
          });
        },
      });
    },
    [showConfirmation, showToast],
  );

  const actions = useMemo(
    () => ({
      onViewDetails: handleViewDetailsActivity,
      onReexpose: handleReexposeActivity,
    }),
    [handleViewDetailsActivity, handleReexposeActivity],
  );

  return {
    actions,
    loading: apiLoading,
  };
};
