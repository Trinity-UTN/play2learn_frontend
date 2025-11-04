import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaCoins,
  FaExclamationTriangle,
} from "react-icons/fa";
import styles from "./TradingPanel.module.css";
import type { ActionsResponse } from "../../../types/actions.type";
import formatPrice from "../../../../shared/utils/formatPrice";
import { useTradingPanel } from "../../../hooks/useActions/useTrandingPanel";
import { quicksButton } from "../../../contanst/actionsContanst/tradingPanel.contanst";
import ConfirmationModal from "../../../../shared/components/ConfirmationModal/ConfirmationModal";
interface TradingPanelProps {
  action: ActionsResponse;
  onBuy: (stockId: number, amount: number) => void;
  onSell: (stockId: number, amount: number) => void;
  userBalance: number;
}

const TradingPanel: React.FC<TradingPanelProps> = ({
  action,
  onBuy,
  onSell,
  userBalance,
}) => {
  const {
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
    handleConfirmBuy,
    handleSell,
    handleConfirmSell,
    handleQuickAmount,
    setActiveTab,
    setAmount,
  } = useTradingPanel({ action, onBuy, onSell, userBalance });

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>Panel de Trading</h3>
        <div className={styles.balance}>
          <FaCoins className={styles.balanceIcon} />
          <span>Saldo: ${formatPrice(userBalance)}</span>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "buy" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("buy")}
        >
          <FaShoppingCart />
          Comprar
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "sell" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("sell")}
        >
          <FaMoneyBillWave />
          Vender
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.priceInfo}>
          <span className={styles.label}>Precio por acción</span>
          <span className={styles.price}>
            ${formatPrice(action.currentPrice)}
          </span>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Cantidad de acciones</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
            placeholder="Ingresa cantidad"
          />
        </div>

        <div className={styles.quickButtons}>
          {quicksButton.map((quickButton) => (
            <button
              className={styles.quickButton}
              onClick={() => handleQuickAmount(quickButton)}
              key={quickButton}
            >
              {quickButton}
            </button>
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Total a {activeTab === "buy" ? "pagar" : "recibir"}:</span>
            <span className={styles.totalAmount}>
              ${formatPrice(totalCost)}
            </span>
          </div>
          {activeTab === "buy" && (
            <div className={styles.summaryRow}>
              <span>Saldo restante:</span>
              <span className={canAfford ? styles.positive : styles.negative}>
                ${formatPrice(userBalance - totalCost)}
              </span>
            </div>
          )}
        </div>

        {activeTab === "buy" && !canAfford && (
          <div className={styles.warning}>
            <FaExclamationTriangle />
            <span className={styles.warningText}>Saldo insuficiente</span>
          </div>
        )}

        {activeTab === "sell" && !canSell && (
          <div className={styles.warning}>
            <FaExclamationTriangle />
            <span className={styles.warningText}>Saldo insuficiente</span>
          </div>
        )}
        {activeTab === "sell" && !actionSell && (
          <div className={styles.warning}>
            <FaExclamationTriangle />
            <span className={styles.warningText}>
              No cuenta con la cantidad de acciones ingresadas
            </span>
          </div>
        )}

        {activeTab === "buy" ? (
          <button
            className={`${styles.actionButton} ${styles.buyButton}`}
            onClick={handleBuy}
            disabled={!canAfford || numAmount === 0}
          >
            <FaShoppingCart />
            Comprar {numAmount} {numAmount === 1 ? "acción" : "acciones"}
          </button>
        ) : (
          <button
            className={`${styles.actionButton} ${styles.sellButton}`}
            onClick={handleSell}
            disabled={!canSell || !actionSell || numAmount === 0}
          >
            <FaMoneyBillWave />
            Vender {numAmount} {numAmount === 1 ? "acción" : "acciones"}
          </button>
        )}
      </div>
      <ConfirmationModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        message={
          activeTab === "buy"
            ? "¿Estas seguro que desea comprar estas acciones?"
            : "¿Estas seguro que desea vender estas acciones?"
        }
        title={activeTab === "buy" ? "Comprar Acciones" : "Vender Acciones"}
        onConfirm={activeTab === "buy" ? handleConfirmBuy : handleConfirmSell}
      />
    </motion.div>
  );
};

export default TradingPanel;
