import { motion, AnimatePresence } from "framer-motion";
import {
  FaPiggyBank,
  FaCoins,
  FaChartLine,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import styles from "./CajaDeAhorroCard.module.css";
import type { CajaDeAhorroResponse } from "../../../types/cajaAhorro.type";
import { formatPrice, ConfirmationModal } from "@/shared";
import { CajaDeAhorroModalMovimiento } from "../CajaDeAhorroModalMovimiento/CajaDeAhorroModalMovimiento";
import { useCajaDeAhorroCard } from "../../../hooks/useCajaDeAhorro/useCajaDeAhorroCard";

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
  const {
    // states
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
  } = useCajaDeAhorroCard({
    cajaDeAhorro,
    userBalance,
    onDeposit,
    onWithdraw,
    onDelete,
  });
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
            <h3 className={styles.name}>{cajaDeAhorro.name}</h3>
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
              {cajaDeAhorro.accumulatedInterest.toLocaleString("es-AR")}
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
          {actionButtons.map((btn, i) => (
            <motion.button
              key={i}
              className={styles[btn.className]}
              onClick={btn.onClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </motion.button>
          ))}
        </div>
        <motion.button
          className={styles.deleteButton}
          onClick={() => handleDelete()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Cerrar Caja De Ahorro</span>
        </motion.button>
        <ConfirmationModal
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          title="¿Estas seguro?"
          message="Cerrar Caja De Ahorro"
          onConfirm={handleConfirmDelete}
        />
      </motion.div>

      {/* Movimientos Modal */}
      <AnimatePresence>
        {modalsConfig.map((m, i) => (
          <CajaDeAhorroModalMovimiento
            key={i}
            show={m.show}
            onClose={m.onClose}
            title={m.title}
            balanceLabel={m.balanceLabel}
            balanceValue={m.balanceValue}
            amount={amount}
            setAmount={setAmount}
            confirmText={m.confirmText}
            onConfirm={m.onConfirm}
          >
            <FaCheckCircle />
          </CajaDeAhorroModalMovimiento>
        ))}
      </AnimatePresence>
    </>
  );
};

export default CajaDeAhorroCard;
