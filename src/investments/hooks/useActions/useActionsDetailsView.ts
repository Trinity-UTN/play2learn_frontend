import { useLocation, useNavigate } from "react-router-dom";
import { useActionsStudent } from "../useActionsStudentAPI";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";
import { useEffect, useState } from "react";
import type { RangeValue } from "../../types/actions.type";

export const useActionsDetailsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCandleStickValues, candleStickValues, loading } =
    useActionsStudent();
  const { currentStudent } = useCurrentStudent();

  const userBalance = currentStudent?.wallet.balance || 0;
  const action = location.state;
  const [range, setRange] = useState<RangeValue>("HISTORICO");

  useEffect(() => {
    if (action) {
      getCandleStickValues(action.id, range);
    }
  }, [range]);

  const handleBuy = (amount: number) => {
    console.log("Comprando", amount, "acciones");
    // TODO: Implementar lógica de compra
  };

  const handleSell = (amount: number) => {
    console.log("Vendiendo", amount, "acciones");
    // TODO: Implementar lógica de venta
  };

  const handleSetAutomation = (minPrice: number, maxPrice: number) => {
    console.log("Configurando automatización:", { minPrice, maxPrice });
    // TODO: Implementar lógica de automatización
  };

  return {
    candleStickValues,
    loading,
    userBalance,
    action,
    range,
    setRange,
    navigate,
    handleBuy,
    handleSell,
    handleSetAutomation,
  };
};
