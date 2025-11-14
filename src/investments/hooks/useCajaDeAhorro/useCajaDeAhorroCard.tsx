import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import type { CajaDeAhorroResponse } from "../../types/cajaAhorro.type";

type Props = {
  cajaDeAhorro: CajaDeAhorroResponse;
  userBalance: number;
  onDeposit: (cajaId: number, amount: number) => void;
  onWithdraw: (cajaId: number, amount: number) => void;
  onDelete: (cajaId: number) => void;
};
export const useCajaDeAhorroCard = ({
  cajaDeAhorro,
  userBalance,
  onDeposit,
  onWithdraw,
  onDelete,
}: Props) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  // --- CALCULOS ---
  const profit = cajaDeAhorro.currentAmount - cajaDeAhorro.initialAmount;

  const startDate = new Date(cajaDeAhorro.startDate);
  const lastUpdate = new Date(cajaDeAhorro.lastUpdate);

  // --- HANDLERS ---
  const handleDeposit = () => {
    const numericAmount = Number.parseFloat(amount);

    if (numericAmount > 0 && numericAmount <= userBalance) {
      onDeposit(cajaDeAhorro.id, numericAmount);
      setAmount("");
      setShowDepositModal(false);
    }
  };

  const handleWithdraw = () => {
    const numericAmount = Number.parseFloat(amount);

    if (numericAmount > 0 && numericAmount <= cajaDeAhorro.currentAmount) {
      onWithdraw(cajaDeAhorro.id, numericAmount);
      setAmount("");
      setShowWithdrawModal(false);
    }
  };

  const handleOpenModal = (handle: (data: boolean) => void, open: boolean) => {
    window.scrollTo(0, 0);
    handle(open);
  };

  const handleConfirmDelete = () => {
    onDelete(cajaDeAhorro.id);
    setOpenDelete(false);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  // --- BUTTONS CONFIG ---
  const actionButtons = [
    {
      label: "Depositar",
      icon: <FaArrowUp />,
      className: "depositButton",
      onClick: () => handleOpenModal(setShowDepositModal, !showDepositModal),
    },
    {
      label: "Retirar",
      icon: <FaArrowDown />,
      className: "withdrawButton",
      onClick: () => handleOpenModal(setShowWithdrawModal, !showWithdrawModal),
    },
  ];

  // --- MODALS CONFIG ---
  const modalsConfig = [
    {
      show: showDepositModal,
      onClose: () => setShowDepositModal(false),
      title: `Depositar en "${cajaDeAhorro.name}"`,
      balanceLabel: "Saldo disponible:",
      balanceValue: userBalance,
      confirmText: "Confirmar Depósito",
      onConfirm: handleDeposit,
    },
    {
      show: showWithdrawModal,
      onClose: () => setShowWithdrawModal(false),
      title: `Retirar de "${cajaDeAhorro.name}"`,
      balanceLabel: "Saldo en la caja:",
      balanceValue: cajaDeAhorro.currentAmount,
      confirmText: "Confirmar Retiro",
      onConfirm: handleWithdraw,
    },
  ];

  return {
    // states
    showDepositModal,
    showWithdrawModal,
    amount,
    openDelete,
    startDate,
    lastUpdate,
    profit,

    // setters
    setAmount,
    setOpenDelete,

    // handlers
    handleDelete,
    handleConfirmDelete,
    actionButtons,
    modalsConfig,
  };
};
