import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { activityCodeMap } from "@/activity/utils/activityCodeMap";
import { useConfirmation, useToaster } from "@/shared";

/**
 * Hook para gestionar acciones en la vista de detalles de actividad
 * Maneja navegación, modales de confirmación y notificaciones
 */
export const useActivityDetailsTeacherActions = () => {
  const navigate = useNavigate();

  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();

  const handleGoBack = useCallback(() => {
    navigate("/dashboard/teacher/actividades/created/list");
  }, [navigate]);

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

  return {
    handleGoBack,
    handleReexposeActivity,
  };
};
