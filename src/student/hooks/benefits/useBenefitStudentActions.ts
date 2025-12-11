import { useCallback } from "react";
import type { BenefitStatus } from "../../../benefit/constants/benefit.constants";
import { useCurrentStudent } from "../useCurrentStudent";
import { useBenefitStudent } from "../useBenefitStudent";
import { useConfirmation, useToaster } from "@/shared";

/**
 * Hook que permite manejar las acciones de los beneficios del estudiante
 */
export const useBenefitStudentActions = (
  onFilterChange: (filter: BenefitStatus) => void
) => {
  const { getWalletByStudent } = useCurrentStudent();
  const {
    purchaseBenefitStudent,
    requestUseBenefitStudent,
    getPaginatedBenefitStudent,
  } = useBenefitStudent();
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
            await getWalletByStudent();
            await getPaginatedBenefitStudent({
              page: 1,
              page_size: 10,
            });
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
    [
      purchaseBenefitStudent,
      getPaginatedBenefitStudent,
      showConfirmation,
      onFilterChange,
      getWalletByStudent,
      showToast,
    ]
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
            await getPaginatedBenefitStudent({
              page: 1,
              page_size: 10,
            });
            onFilterChange("USE_REQUESTED");
            showToast({
              title: "Solicitud de uso enviada exitosamente",
              message: "El docente ha sido notificado",
              type: "success",
              position: "bottom-right",
            });
          } catch {
            // No se cambia el filtro si falló
          }
        },
      });
    },
    [
      requestUseBenefitStudent,
      getPaginatedBenefitStudent,
      showConfirmation,
      onFilterChange,
      showToast,
    ]
  );

  return {
    purchaseBenefit,
    requestUseBenefit,
  };
};
