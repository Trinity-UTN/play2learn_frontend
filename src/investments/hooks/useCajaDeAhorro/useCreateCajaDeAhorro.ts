import { useState } from "react";
import type { RegisterCajaDeAhorro } from "../../types/cajaAhorro.type";

type Props = {
  userBalance: number;
  onSubmit: (data: RegisterCajaDeAhorro) => void;
};

export const useCreatedCajaDeAhorro = ({ userBalance, onSubmit }: Props) => {
  const [amount, setAmount] = useState<string>("");
  const [name, setName] = useState<string>("");

  const numericAmount = Number.parseFloat(amount) || 0;
  const dailyInterestRate = 0.1;
  const monthlyInterest = numericAmount * (dailyInterestRate / 100) * 30;

  const isValid =
    numericAmount > 0 && numericAmount <= userBalance && name.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({
        initialAmount: numericAmount,
        name: name.trim(),
      });
      setAmount("");
      setName("");
    }
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };
  const handleQuickName = (value: string) => {
    setName(value);
  };

  return {
    name,
    amount,
    numericAmount,
    dailyInterestRate,
    monthlyInterest,
    isValid,
    handleSubmit,
    handleQuickAmount,
    handleQuickName,
    setName,
    setAmount,
  };
};
