import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPiggyBank,
  FaCoins,
  FaChartLine,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import styles from "./CajaDeAhorroCard.module.css";
import type { CajaDeAhorroResponse } from "../../../types/cajaAhorro.type";
import formatPrice from "../../../../shared/utils/formatPrice";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../shared/components/ConfirmationModal/ConfirmationModal";

interface CajaDeAhorroCardProps {
  cajaDeAhorro: CajaDeAhorroResponse;
  index: number;
  userBalance: number;
  onDeposit: (cajaId: number, amount: number) => void;
  onWithdraw: (cajaId: number, amount: number) => void;
  onDelete: (cajaId: number) => void;
}

const CajaDeAhorroCard: React.FC<CajaDeAhorroCardProps> = ({
  cajaDeAhorro,
  index,
  userBalance,
  onDeposit,
  onWithdraw,
  onDelete,
}) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const profit = cajaDeAhorro.currentAmount - cajaDeAhorro.initialAmount;
  const profitPercent = ((profit / cajaDeAhorro.initialAmount) * 100).toFixed(
    2
  );
  const startDate = new Date(cajaDeAhorro.startDate);
  const lastUpdate = new Date(cajaDeAhorro.lastUpdate);

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
  return (
    <>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.nameSection}>
            <FaPiggyBank className={styles.piggyIcon} />
            {/* <h3 className={styles.name}>{cajaDeAhorro.name}</h3> */}
          </div>
        </div>

        {/* Current Balance */}
        <div className={styles.balanceSection}>
          <span className={styles.balanceLabel}>Saldo Actual</span>
          <div className={styles.balanceValue}>
            <FaCoins className={styles.coinIcon} />
            <span>{formatPrice(cajaDeAhorro.currentAmount)}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Inicial</span>
            <span className={styles.statValue}>
              {cajaDeAhorro.initialAmount.toLocaleString("es-AR")}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Ganancia</span>
            <span className={styles.statValue} style={{ color: "#22c55e" }}>
              +{profit.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {/* Interest Section */}
        <div className={styles.interestSection}>
          <FaChartLine className={styles.interestIcon} />
          <div className={styles.interestContent}>
            <span className={styles.interestLabel}>Interés Acumulado</span>
            <span className={styles.interestValue}>
              {cajaDeAhorro.accumulatedInterest.toLocaleString("es-AR")} (
              {profitPercent}%)
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className={styles.datesSection}>
          <div className={styles.dateItem}>
            <FaCalendarAlt className={styles.dateIcon} />
            <div>
              <span className={styles.dateLabel}>Creada</span>
              <span className={styles.dateValue}>
                {startDate.toLocaleDateString("es-AR")}
              </span>
            </div>
          </div>
          <div className={styles.dateItem}>
            <FaCalendarAlt className={styles.dateIcon} />
            <div>
              <span className={styles.dateLabel}>Última actualización</span>
              <span className={styles.dateValue}>
                {lastUpdate.toLocaleDateString("es-AR")}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionsSection}>
          <motion.button
            className={styles.depositButton}
            onClick={() =>
              handleOpenModal(setShowDepositModal, !showDepositModal)
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaArrowUp />
            <span>Depositar</span>
          </motion.button>
          <motion.button
            className={styles.withdrawButton}
            onClick={() =>
              handleOpenModal(setShowWithdrawModal, !showWithdrawModal)
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaArrowDown />
            <span>Retirar</span>
          </motion.button>
        </div>
        <motion.button
          className={styles.deleteButton}
          onClick={() => handleDelete()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MdDelete />
          <span>Eliminar</span>
        </motion.button>
        <ConfirmationModal
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          title="Eliminar Caja De Ahorro"
          message="Si eliminas la caja de ahorro no obtendras los intereses"
          onConfirm={handleConfirmDelete}
        />
      </motion.div>

      {/* Deposit Modal */}
      <AnimatePresence>
        {showDepositModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDepositModal(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>Depositar en "nombre caja de ahorro"</h3>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowDepositModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.modalInfo}>
                  <span>Saldo disponible:</span>
                  <span className={styles.modalBalance}>
                    {userBalance.toLocaleString("es-AR")} monedas
                  </span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Monto a depositar"
                  className={styles.modalInput}
                  min="0"
                  max={userBalance}
                />
                <motion.button
                  className={styles.modalButton}
                  onClick={handleDeposit}
                  disabled={
                    !amount ||
                    Number.parseFloat(amount) <= 0 ||
                    Number.parseFloat(amount) > userBalance
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCheckCircle />
                  <span>Confirmar Depósito</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWithdrawModal(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>Retirar de "NombreCajaDeAhorro"</h3>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowWithdrawModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.modalInfo}>
                  <span>Saldo en la caja:</span>
                  <span className={styles.modalBalance}>
                    {cajaDeAhorro.currentAmount.toLocaleString("es-AR")} monedas
                  </span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Monto a retirar"
                  className={styles.modalInput}
                  min="0"
                  max={cajaDeAhorro.currentAmount}
                />
                <motion.button
                  className={`${styles.modalButton} ${styles.modalButtonWithdraw}`}
                  onClick={handleWithdraw}
                  disabled={
                    !amount ||
                    Number.parseFloat(amount) <= 0 ||
                    Number.parseFloat(amount) > cajaDeAhorro.currentAmount
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCheckCircle />
                  <span>Confirmar Retiro</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CajaDeAhorroCard;
