import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBenefitAPI } from "../../useBenefitAPI";
import { useConfirmation } from "../../../../shared/hooks/useConfirmation";
import { useToaster } from "../../../../shared/hooks/useToaster";

export type BenefitActionHandlers = {
  onDelete: (benefitId: number, name: string) => void;
  onViewPurchases: (benefitId: number) => void;
  onAcceptUse: (benefitId: number, name: string) => void;
};

export const useBenefitTeacherActions = (): {
  actions: BenefitActionHandlers;
  loading: boolean;
} => {
  const navigate = useNavigate();
  const {
    deleteBenefit,
    acceptUseBenefit,
    refreshBenefitsAfterDeletion,
    refreshBenefitsAfterAcceptance,
    loading: apiLoading,
  } = useBenefitAPI();
  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();

  const handleDeleteBenefit = useCallback(
    (benefitId: number, benefitName: string) => {
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
    (benefitId: number, benefitName: string) => {
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
      refreshBenefitsAfterAcceptance,
    ]
  );

  const actions = useMemo(
    () => ({
      onDelete: handleDeleteBenefit,
      onViewPurchases: handleViewPurchases,
      onAcceptUse: handleAcceptUseBenefit,
    }),
    [handleDeleteBenefit, handleViewPurchases, handleAcceptUseBenefit]
  );

  return {
    actions,
    loading: apiLoading,
  };
};
