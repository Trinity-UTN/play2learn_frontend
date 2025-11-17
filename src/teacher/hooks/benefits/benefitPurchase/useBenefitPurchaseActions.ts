import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBenefitAPI } from "../../useBenefitAPI";
import { useToaster } from "../../../../shared/hooks/useToaster";

/**
 * Hook para manejar las acciones sobre los canjes de beneficios
 */
export const useBenefitPurchasesActions = () => {
  const navigate = useNavigate();
  const { acceptUseBenefit } = useBenefitAPI();
  const { showToast } = useToaster();
  const [loading, setLoading] = useState(false);

  const acceptUse = async (id: number) => {
    setLoading(true);
    try {
      await acceptUseBenefit(id);
      showToast({
        title: "Uso de beneficio aceptado correctamente",
        type: "success",
        position: "bottom-right",
      });
      return true;
    } catch (error) {
      showToast({
        title: "Error al aceptar el uso del beneficio",
        type: "error",
        position: "bottom-right",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const backToBenefits = () => {
    navigate("/dashboard/teacher/beneficio/list");
  };

  const actions = useMemo(
    () => ({
      onAcceptUse: acceptUse,
      onNavigateBack: backToBenefits,
    }),
    [acceptUse, backToBenefits]
  );

  return {
    actions,
    loading,
  };
};
