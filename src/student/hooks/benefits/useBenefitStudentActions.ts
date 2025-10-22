import { useCallback } from "react";
import type { BenefitStatus } from "../../constants/benefitStudent.constants";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useToaster } from "../../../shared/hooks/useToaster";
import { useBenefitStudent } from "../useBenefitStudent";

export const useBenefitStudentActions = (
  onFilterChange: (filter: BenefitStatus) => void
) => {
  const { purchaseBenefitStudent, requestUseBenefitStudent } =
    useBenefitStudent();
  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();

  const purchaseBenefit = useCallback(
    (benefitId: number, benefitName: string, cost: number) => {
      showConfirmation({
        title: "¿Estás seguro de canjear este beneficio?",
        message: `Vas a canjear "${benefitName}" por ${cost} monedas. Esta acción no se puede revertir.`,
        type: "warning",
        confirmText: "Sí, canjear beneficio",
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await purchaseBenefitStudent(benefitId);
            onFilterChange("PURCHASED");
            showToast({
              title: "Beneficio canjeado exitosamente",
              type: "success",
              position: "bottom-right",
            });
          } catch {
            // No se hace nada: el provider ya mostró el error
          }
        },
      });
    },
    [purchaseBenefitStudent, showConfirmation, onFilterChange]
  );

  const requestUseBenefit = useCallback(
    (benefitId: number, benefitName: string) => {
      showConfirmation({
        title: "¿Solicitar uso del beneficio?",
        message: `Vas a solicitar el uso de "${benefitName}". Un profesor deberá aprobar tu solicitud.`,
        type: "info",
        confirmText: "Sí, solicitar uso",
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await requestUseBenefitStudent(benefitId);
            onFilterChange("USE_REQUESTED");
            showToast({
              title: "Solicitud de uso enviada exitosamente",
              message: "El docente ha sido notificado exitosamente",
              type: "success",
              position: "bottom-right",
            });
          } catch {
            // No se cambia el filtro si falló
          }
        },
      });
    },
    [requestUseBenefitStudent, showConfirmation, onFilterChange]
  );

  return {
    purchaseBenefit,
    requestUseBenefit,
  };
};
