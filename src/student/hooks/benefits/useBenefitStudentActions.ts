import { useCallback } from "react";
import type { BenefitStatus } from "../../constants/benefitStudent.constants";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useBenefitStudent } from "../useBenefitStudent";

export const useBenefitStudentActions = (
  onFilterChange: (filter: BenefitStatus) => void
) => {
  const { purchaseBenefitStudent, requestUseBenefitStudent } =
    useBenefitStudent();
  const { showConfirmation } = useConfirmation();

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
