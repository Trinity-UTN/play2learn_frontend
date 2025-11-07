import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useBenefitAPI } from "../../useBenefitAPI";
import { useConfirmation } from "../../../../shared/hooks/useConfirmation";
import { useToaster } from "../../../../shared/hooks/useToaster";

/**
 * Hook que permite manejar las acciones de los beneficios del teacher
 */
export const useBenefitTeacherActions = () => {
  const navigate = useNavigate();
  const {
    deleteBenefit,
    acceptUseBenefit,
    refreshBenefitsAfterDeletion,
    refreshBenefitsAfterAcceptance,
  } = useBenefitAPI();
  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();

  const handleDeleteBenefit = useCallback(
    (benefitId: number, benefitName: string, onSuccess?: () => void) => {
      showConfirmation({
        title: "¿Estás seguro de eliminar este beneficio?",
        message: `Vas a eliminar "${benefitName}". Esta acción no se puede revertir.`,
        type: "danger",
        confirmText: "Sí, eliminar beneficio",
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await deleteBenefit(benefitId);
            showToast({
              title: "Beneficio eliminado exitosamente",
              type: "success",
              position: "bottom-right",
            });
            if (onSuccess) onSuccess();
            refreshBenefitsAfterDeletion();
          } catch {
            // El provider ya mostró el error
          }
        },
      });
    },
    [deleteBenefit, showConfirmation, showToast, refreshBenefitsAfterDeletion]
  );

  const handleViewPurchases = useCallback(
    (benefitId: number) => {
      navigate(`/dashboard/teacher/beneficio/list/${benefitId}`);
    },
    [navigate]
  );

  const handleAcceptUseBenefit = useCallback(
    (benefitId: number, benefitName: string, onSuccess?: () => void) => {
      showConfirmation({
        title: "¿Aceptar uso del beneficio?",
        message: `Vas a aceptar el uso de "${benefitName}" para el estudiante.`,
        type: "info",
        confirmText: "Sí, aceptar uso",
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await acceptUseBenefit(benefitId);
            showToast({
              title: "Uso del beneficio aceptado exitosamente",
              type: "success",
              position: "bottom-right",
            });
            if (onSuccess) onSuccess();
            refreshBenefitsAfterAcceptance();
          } catch {
            // El provider ya mostró el error
          }
        },
      });
    },
    [
      acceptUseBenefit,
      showConfirmation,
      showToast,
      refreshBenefitsAfterDeletion,
    ]
  );

  return {
    handleDeleteBenefit,
    handleViewPurchases,
    handleAcceptUseBenefit,
  };
};
