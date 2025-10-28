import { useState } from "react";
import { useBenefitAPI } from "../../useBenefitAPI";
import { useToaster } from "../../../../shared/hooks/useToaster";

/**
 * Hook para manejar las acciones sobre los canjes de beneficios
 */
export const useBenefitPurchasesActions = () => {
  const { acceptUseBenefit } = useBenefitAPI();
  const { showToast } = useToaster();
  const [loading, setLoading] = useState(false);

  const handleAcceptUse = async (benefitId: number) => {
    setLoading(true);
    try {
      await acceptUseBenefit(benefitId);
      showToast({
        title: "Uso de beneficio aceptado correctamente",
        type: "success",
        position: "bottom-right",
      });
    } catch (error) {
      showToast({
        title: "Error al aceptar el uso del beneficio",
        type: "error",
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    acceptUse: handleAcceptUse,
    loading,
  };
};
