import { motion } from "framer-motion";
import { FaRobot, FaArrowUp, FaArrowDown, FaInfoCircle } from "react-icons/fa";
import styles from "./AutomationPanel.module.css";
import type { TradeActionStopLimitRequest } from "../../../types/actions.type";
import { useAutomationPanel } from "../../../hooks/useActions/useAutomationPanel";
import { ConfirmationModal } from "@/shared";

interface AutomationPanelProps {
  stockId: number;
  currentPrice: number;
  onSetAutomation: (data: TradeActionStopLimitRequest) => void;
}

const AutomationPanel: React.FC<AutomationPanelProps> = ({
  stockId,
  currentPrice,
  onSetAutomation,
}) => {
  const {
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
    handleActivateLoss,
    lossQuantity,
    setLossQuantity,
    openModal,
    setOpenModal,
    handleActivateLossConfirmation,
    handleActivateProfitConfirmation,
  } = useAutomationPanel({
    currentPrice,
    onSetAutomation,
    stockId,
  });
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <FaRobot className={styles.icon} />
          <h3 className={styles.title}>Trading Automático</h3>
        </div>
      </div>

      <div className={styles.infoBox}>
        <FaInfoCircle className={styles.infoIcon} />
        <p className={styles.infoText}>
          Configura órdenes automáticas: Take Profit para vender cuando suba, y
          Stop Loss para vender cuando baje.
        </p>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaArrowUp className={styles.profitIcon} />
            <h4 className={styles.sectionTitle}>
              Take Profit (Vender cuando suba)
            </h4>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Precio Máximo</label>
            <input
              type="number"
              step="0.01"
              min={0}
              value={profitPrice}
              onChange={(e) => setProfitPrice(e.target.value)}
              className={styles.input}
              placeholder="Ej: 150.00"
              disabled={isProfitActive}
            />
            <p className={styles.hint}>
              Vender automáticamente cuando el precio llegue a este valor
            </p>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Cantidad de Acciones</label>
            <input
              type="number"
              step="1"
              min={0}
              value={profitQuantity}
              onChange={(e) => setProfitQuantity(e.target.value)}
              className={styles.input}
              placeholder="Ej: 10"
              disabled={isProfitActive}
            />
            <p className={styles.hint}>
              Cuántas acciones vender cuando se alcance el precio
            </p>
          </div>

          {profitPrice && profitQuantity && (
            <div className={styles.preview}>
              <div className={styles.previewItem}>
                <FaArrowUp className={styles.sellIcon} />
                <span>
                  Vender <strong>{profitQuantity} acciones</strong> cuando el
                  precio llegue a{" "}
                  <strong>${Number.parseFloat(profitPrice).toFixed(2)}</strong>
                </span>
              </div>
            </div>
          )}

          <button
            className={styles.activateButton}
            onClick={handleActivateProfit}
            disabled={!isProfitValid}
          >
            <FaArrowUp />
            Activar Take Profit
          </button>

          {!isProfitValid && profitPrice && profitQuantity && (
            <div className={styles.validationError}>
              El precio debe ser mayor que el actual (${currentPrice.toFixed(2)}
              )
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaArrowDown className={styles.lossIcon} />
            <h4 className={styles.sectionTitle}>
              Stop Loss (Vender cuando baje)
            </h4>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Precio Mínimo</label>
            <input
              type="number"
              step="0.01"
              value={lossPrice}
              min={0}
              onChange={(e) => setLossPrice(e.target.value)}
              className={styles.input}
              placeholder="Ej: 100.00"
              disabled={isLossActive}
            />
            <p className={styles.hint}>
              Vender automáticamente cuando el precio baje a este valor
            </p>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Cantidad de Acciones</label>
            <input
              type="number"
              step="1"
              value={lossQuantity}
              min={0}
              onChange={(e) => setLossQuantity(e.target.value)}
              className={styles.input}
              placeholder="Ej: 10"
              disabled={isLossActive}
            />
            <p className={styles.hint}>
              Cuántas acciones vender cuando se alcance el precio
            </p>
          </div>

          {lossPrice && lossQuantity && (
            <div className={styles.preview}>
              <div className={styles.previewItem}>
                <FaArrowDown className={styles.buyIcon} />
                <span>
                  Vender <strong>{lossQuantity} acciones</strong> cuando el
                  precio baje a{" "}
                  <strong>${Number.parseFloat(lossPrice).toFixed(2)}</strong>
                </span>
              </div>
            </div>
          )}

          <button
            className={styles.activateButton}
            onClick={handleActivateLoss}
            disabled={!isLossValid}
          >
            <FaArrowDown />
            Activar Stop Loss
          </button>

          {!isLossValid && lossPrice && lossQuantity && (
            <div className={styles.validationError}>
              El precio debe ser menor que el actual (${currentPrice.toFixed(2)}
              )
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Realizar Configuracion"
        message="¿Esta seguro de realizar esta acción?"
        onConfirm={
          isProfitValid
            ? handleActivateProfitConfirmation
            : handleActivateLossConfirmation
        }
      />
    </motion.div>
  );
};

export default AutomationPanel;
