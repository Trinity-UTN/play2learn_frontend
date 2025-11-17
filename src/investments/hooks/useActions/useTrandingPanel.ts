import { useState } from "react";
import type { ActionsResponse } from "../../types/actions.type";

type Props = {
  action: ActionsResponse;
  onBuy: (stockId: number, amount: number) => void;
  onSell: (stockId: number, amount: number) => void;
  userBalance: number;
};
export const useTradingPanel = ({
  action,
  onBuy,
  onSell,
  userBalance,
}: Props) => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<string>("1");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const numAmount = Number.parseInt(amount) || 0;
  const totalCost = numAmount * action.currentPrice;
  const canAfford = totalCost <= userBalance;
  const canSell = numAmount <= action.availableAmount;
  const actionSell = numAmount <= action.quantityBought;

  const handleBuy = () => {
    setOpenModal(true);
  };
  const handleConfirmBuy = () => {
    if (canAfford && numAmount > 0) {
      onBuy(action.id, numAmount);
      setAmount("1");
    }
    setOpenModal(false);
  };

  const handleSell = () => {
    setOpenModal(true);
  };
  const handleConfirmSell = () => {
    if (canSell && numAmount > 0) {
      onSell(action.id, numAmount);
      setAmount("1");
    }
    setOpenModal(false);
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  return {
    activeTab,
    amount,
    numAmount,
    totalCost,
    canAfford,
    canSell,
    openModal,
    actionSell,
    setOpenModal,
    handleBuy,
    handleSell,
    handleQuickAmount,
    setActiveTab,
    setAmount,
    handleConfirmBuy,
    handleConfirmSell,
  };
};
