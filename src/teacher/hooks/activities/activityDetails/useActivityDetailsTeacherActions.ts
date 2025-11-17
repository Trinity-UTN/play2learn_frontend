import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirmation } from "../../../../shared/hooks/useConfirmation";
import { useToaster } from "../../../../shared/hooks/useToaster";

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
      console.log("TODO: Implementar lógica de finalización de actividad"),
        activityId,
        activityName;
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
    [showConfirmation, showToast]
  );

  return {
    handleGoBack,
    handleFinishActivity,
  };
};
