import { useState } from "react";
import type { TradeActionStopLimitRequest } from "../../types/actions.type";
interface UsePriceAutomationParams {
  currentPrice: number;
  stockId: number;
  onSetAutomation: (data: TradeActionStopLimitRequest) => void;
}

export const useAutomationPanel = ({
  currentPrice,
  onSetAutomation,
  stockId,
}: UsePriceAutomationParams) => {
  const [openModal, setOpenModal] = useState(false);
  const [profitPrice, setProfitPrice] = useState<string>("");
  const [profitQuantity, setProfitQuantity] = useState<string>("");
  const [isProfitActive, setIsProfitActive] = useState(false);

  const [lossPrice, setLossPrice] = useState<string>("");
  const [lossQuantity, setLossQuantity] = useState<string>("");
  const [isLossActive, setIsLossActive] = useState(false);

  const handleActivateProfit = () => {
    setOpenModal(true);
  };
  const handleActivateProfitConfirmation = () => {
    const pricePerUnit = Number.parseFloat(profitPrice);
    const quantity = Number.parseInt(profitQuantity);

    if (pricePerUnit && quantity && pricePerUnit > currentPrice) {
      onSetAutomation({ stockId, quantity, pricePerUnit, orderStop: "PROFIT" });
      setIsProfitActive(true);
    }
    handleDeactivateProfit();
    setOpenModal(false);
  };

  const handleDeactivateProfit = () => {
    setIsProfitActive(false);
    setProfitPrice("");
    setProfitQuantity("");
  };

  const handleActivateLoss = () => {
    setOpenModal(true);
  };
  const handleActivateLossConfirmation = () => {
    const pricePerUnit = Number.parseFloat(lossPrice);
    const quantity = Number.parseInt(lossQuantity);

    if (pricePerUnit && quantity && pricePerUnit < currentPrice) {
      onSetAutomation({ stockId, quantity, pricePerUnit, orderStop: "LOSS" });
      setIsLossActive(true);
    }
    handleDeactivateLoss();
    setOpenModal(false);
  };

  const handleDeactivateLoss = () => {
    setIsLossActive(false);
    setLossPrice("");
    setLossQuantity("");
  };

  const isProfitValid =
    profitPrice !== "" &&
    profitQuantity !== "" &&
    Number.parseFloat(profitPrice) > currentPrice &&
    Number.parseInt(profitQuantity) > 0;

  const isLossValid =
    lossPrice !== "" &&
    lossQuantity !== "" &&
    Number.parseFloat(lossPrice) < currentPrice &&
    Number.parseInt(lossQuantity) > 0;

  return {
    openModal,
    setOpenModal,
    profitPrice,
    setProfitPrice,
    profitQuantity,
    setProfitQuantity,
    isProfitActive,
    handleActivateProfit,
    isLossActive,
    lossPrice,
    setLossPrice,
    isLossValid,
    isProfitValid,
    lossQuantity,
    setLossQuantity,
    handleActivateLoss,
    handleActivateLossConfirmation,
    handleActivateProfitConfirmation,
  };
};
