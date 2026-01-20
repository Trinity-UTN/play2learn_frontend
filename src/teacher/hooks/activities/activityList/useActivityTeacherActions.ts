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
    [navigate, setSelectedActivityTeacher]
  );

  const handleReexposeActivity = useCallback(
    (activityId: number, activityName: string) => {

      const code = activityCodeMap[activityName];
      navigate(`/dashboard/teacher/actividades/configuration/${code}/${activityId}`)
      // TODO: Implementar lógica de re-exposición
    },
    [showConfirmation, showToast]
  );

  const handleEditActivity = useCallback(
    (activityId: number, activityName: string) => {
      console.log(
        "TODO: Implementar lógica de re-exposición",
        activityId,
        activityName
      );
      // TODO: Implementar lógica de edición
    },
    [showConfirmation, showToast]
  );

  const handleDeleteActivity = useCallback(
    (activityId: number, activityName: string) => {
      console.log(
        "TODO: Implementar lógica de re-exposición",
        activityId,
        activityName
      );
      // TODO: Implementar lógica de eliminación
    },
    [showConfirmation, showToast]
  );

  const actions = useMemo(
    () => ({
      onViewDetails: handleViewDetailsActivity,
      onReexpose: handleReexposeActivity,
      onEdit: handleEditActivity,
      onDelete: handleDeleteActivity,
    }),
    [
      handleViewDetailsActivity,
      handleReexposeActivity,
      handleEditActivity,
      handleDeleteActivity,
    ]
  );

  return {
    actions,
    loading: apiLoading,
  };
};
