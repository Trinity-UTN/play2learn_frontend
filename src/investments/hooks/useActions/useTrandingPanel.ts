import { useState } from "react";
import type { ActionsResponse } from "../../types/actions.type";

type Props = {
  action: ActionsResponse;
  onBuy: (amount: number) => void;
  onSell: (amount: number) => void;
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

  const numAmount = Number.parseInt(amount) || 0;
  const totalCost = numAmount * action.currentPrice;
  const canAfford = totalCost <= userBalance;
  const canSell = numAmount <= action.availableAmount;

  const handleBuy = () => {
    if (canAfford && numAmount > 0) {
      onBuy(numAmount);
      setAmount("1");
    }
  };

  const handleSell = () => {
    if (canSell && numAmount > 0) {
      onSell(numAmount);
      setAmount("1");
    }
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
    handleBuy,
    handleSell,
    handleQuickAmount,
    setActiveTab,
    setAmount,
  };
};
