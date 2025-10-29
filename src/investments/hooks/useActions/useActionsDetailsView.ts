import { useLocation, useNavigate } from "react-router-dom";
import { useActionsStudent } from "../useActionsStudentAPI";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";
import { useEffect, useState } from "react";
import type { RangeValue, TradeActionsRequest } from "../../types/actions.type";

export const useActionsDetailsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    getCandleStickValues,
    candleStickValues,
    loading,
    buyActions,
    sellActions,
  } = useActionsStudent();
  const { wallet } = useCurrentStudent();

  const userBalance = wallet?.balance || 0;
  const action = location.state;
  const [range, setRange] = useState<RangeValue>("HISTORICO");

  useEffect(() => {
    if (action) {
      getCandleStickValues(action.id, range);
    }
  }, [range]);

  const handleBuy = (stockId: number, quantity: number) => {
    const data: TradeActionsRequest = { stockId, quantity };
    buyActions(data);
  };

  const handleSell = (stockId: number, quantity: number) => {
    const data: TradeActionsRequest = { stockId, quantity };
    sellActions(data);
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
