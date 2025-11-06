import { useState } from "react";
import type {
  FIXED_TERM_DAYS,
  RegisterPlazoFijo,
} from "../../types/plazoFijo.type";
import { TERM_OPTIONS } from "../../contanst/plazoFijoContanst/plazoFijoContanst";

interface CreatePlazoFijoFormProps {
  userBalance: number;
  onSubmit: (data: RegisterPlazoFijo) => void;
}

export const usePlazoFijoForm = ({
  onSubmit,
  userBalance,
}: CreatePlazoFijoFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [selectedTerm, setSelectedTerm] = useState<FIXED_TERM_DAYS>("MENSUAL");
  const [isOpen, setIsOpen] = useState(false);

  const selectedTermConfig = TERM_OPTIONS.find(
    (opt) => opt.value === selectedTerm
  )!;
  const numericAmount = Number.parseFloat(amount) || 0;
  const estimatedReward = numericAmount * (selectedTermConfig.rate / 100);
  const totalReturn = numericAmount + estimatedReward;

  const isValid = numericAmount > 0 && numericAmount <= userBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const handleSubmitConfirm = () => {
    const data = { amountInvested: numericAmount, fixedTermDays: selectedTerm };
    if (isValid) {
      onSubmit(data);
      setAmount("");
      setIsOpen(false);
    }
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  return {
    amount,
    setAmount,
    selectedTerm,
    setSelectedTerm,
    isOpen,
    setIsOpen,
    selectedTermConfig,
    isValid,
    numericAmount,
    estimatedReward,
    totalReturn,
    handleSubmit,
    handleSubmitConfirm,
    handleQuickAmount,
  };
};
