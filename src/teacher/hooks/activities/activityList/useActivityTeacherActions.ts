import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ActivityActionHandlers } from "../../../utils/activity/activityTeacher.utils";
import type { ActivityTeacherResponse } from "../../../types/TeacherActivity.type";
import { useConfirmation } from "../../../../shared/hooks/useConfirmation";
import { useToaster } from "../../../../shared/hooks/useToaster";
import { useActivityTeacher } from "../../useActivityTeacher";

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
      // TODO: Implementar lógica de re-exposición
    },
    [showConfirmation, showToast]
  );

  const handleEditActivity = useCallback(
    (activityId: number, activityName: string) => {
      // TODO: Implementar lógica de edición
    },
    [showConfirmation, showToast]
  );

  const handleDeleteActivity = useCallback(
    (activityId: number, activityName: string) => {
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
