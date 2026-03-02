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

  const handleFinishActivity = useCallback(
    (activityId: number, activityName: string) => {
      (console.log("TODO: Implementar lógica de finalización de actividad"),
        activityId,
        activityName);
      // TODO: Implementar lógica de finalización de actividad
      // showConfirmation({
      //   title: "Finalizar Actividad",
      //   message: `¿Estás seguro de que deseas finalizar la actividad "${activityName}"? Los estudiantes no podrán realizarla nuevamente.`,
      //   confirmText: "Finalizar",
      //   cancelText: "Cancelar",
      //   onConfirm: () => {
      //     // TODO: Implementar lógica de finalización de actividad
      //     showToast({
      //       title: "Actividad finalizada exitosamente",
      //       type: "success",
      //       position: "bottom-right",
      //     });
      //   },
      // });
    },
    [showConfirmation, showToast],
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

  return {
    handleGoBack,
    handleFinishActivity,
    handleReexposeActivity,
  };
};
