import { motion } from "framer-motion";
import {
  FaRobot,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import styles from "./AutomationPanel.module.css";
import { useAutomationPanel } from "../../../hooks/useActions/useAutomationPanel";

interface AutomationPanelProps {
  currentPrice: number;
  onSetAutomation: (minPrice: number, maxPrice: number) => void;
}

const AutomationPanel: React.FC<AutomationPanelProps> = ({
  currentPrice,
  onSetAutomation,
}) => {
  const {
    minPrice,
    maxPrice,
    isActive,
    isValid,
    setMinPrice,
    setMaxPrice,
    handleActivate,
    handleDeactivate,
  } = useAutomationPanel({ currentPrice, onSetAutomation });
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
        {isActive && (
          <div className={styles.activeBadge}>
            <FaCheckCircle />
            Activo
          </div>
        )}
      </div>

      <div className={styles.infoBox}>
        <FaInfoCircle className={styles.infoIcon} />
        <p className={styles.infoText}>
          Configura límites de precio para que el sistema compre o venda
          automáticamente cuando se alcancen.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.currentPrice}>
          <span className={styles.label}>Precio Actual</span>
          <span className={styles.price}>${currentPrice.toFixed(2)}</span>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaArrowDown className={styles.labelIcon} />
            Precio Mínimo (Comprar Automáticamente)
          </label>
          <input
            type="number"
            step="0.01"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={styles.input}
            placeholder="Ej: 100.00"
            disabled={isActive}
          />
          <p className={styles.hint}>
            Cuando el precio baje a este valor, se comprará automáticamente
          </p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaArrowUp className={styles.labelIcon} />
            Precio Máximo (Vender Automáticamente)
          </label>
          <input
            type="number"
            step="0.01"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={styles.input}
            placeholder="Ej: 150.00"
            disabled={isActive}
          />
          <p className={styles.hint}>
            Cuando el precio suba a este valor, se venderá automáticamente
          </p>
        </div>

        {minPrice && maxPrice && (
          <div className={styles.preview}>
            <div className={styles.previewTitle}>
              Vista Previa de Configuración
            </div>
            <div className={styles.previewContent}>
              <div className={styles.previewItem}>
                <FaArrowDown className={styles.buyIcon} />
                <span>
                  Comprar cuando el precio llegue a{" "}
                  <strong>${Number.parseFloat(minPrice).toFixed(2)}</strong>
                </span>
              </div>
              <div className={styles.previewItem}>
                <FaArrowUp className={styles.sellIcon} />
                <span>
                  Vender cuando el precio llegue a{" "}
                  <strong>${Number.parseFloat(maxPrice).toFixed(2)}</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {!isActive ? (
          <button
            className={styles.activateButton}
            onClick={handleActivate}
            disabled={!isValid}
          >
            <FaRobot />
            Activar Trading Automático
          </button>
        ) : (
          <button
            className={styles.deactivateButton}
            onClick={handleDeactivate}
          >
            Desactivar Trading Automático
          </button>
        )}

        {!isValid && minPrice && maxPrice && (
          <div className={styles.validationError}>
            El precio mínimo debe ser menor que el actual, y el máximo debe ser
            mayor que el actual.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AutomationPanel;
