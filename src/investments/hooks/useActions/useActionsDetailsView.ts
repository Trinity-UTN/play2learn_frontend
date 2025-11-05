import { useNavigate, useParams } from "react-router-dom";
import { useActionsStudent } from "../useActionsStudentAPI";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";
import { useEffect, useState } from "react";
import type {
  RangeValue,
  TradeActionsRequest,
  TradeActionStopLimitRequest,
} from "../../types/actions.type";

export const useActionsDetailsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    getCandleStickValues,
    getActionById,
    candleStickValues,
    loading,
    buyActions,
    sellActions,
    stopActions,
    action,
  } = useActionsStudent();
  const { wallet } = useCurrentStudent();
  const userBalance = wallet?.balance || 0;
  const [range, setRange] = useState<RangeValue>("HISTORICO");

  useEffect(() => {
    if (id) {
      getActionById(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (action) {
      getCandleStickValues(action.id, range);
    }
  }, [range, id, action]);

  const handleBuy = async (stockId: number, quantity: number) => {
    const data: TradeActionsRequest = { stockId, quantity };
    await buyActions(data);
    getActionById(stockId);
  };

  const handleSell = async (stockId: number, quantity: number) => {
    const data: TradeActionsRequest = { stockId, quantity };
    await sellActions(data);
    getActionById(stockId);
  };

  const handleSetAutomation = async (data: TradeActionStopLimitRequest) => {
    const payload: TradeActionStopLimitRequest = {
      stockId: data.stockId, // o el que corresponda
      quantity: data.quantity,
      pricePerUnit: data.pricePerUnit,
      orderStop: data.orderStop,
    };
    await stopActions(payload);
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
