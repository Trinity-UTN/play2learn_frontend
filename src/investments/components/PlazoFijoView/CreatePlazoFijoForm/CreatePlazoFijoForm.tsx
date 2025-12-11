import { motion } from "framer-motion";
import { FaCoins, FaClock, FaPlus, FaInfoCircle } from "react-icons/fa";
import styles from "./CreatePlazoFijoForm.module.css";
import type { RegisterPlazoFijo } from "../../../types/plazoFijo.type";
import {
  quickAmounts,
  TERM_OPTIONS,
} from "../../../contanst/plazoFijoContanst/plazoFijoContanst";
import { formatPrice, ConfirmationModal } from "@/shared";
import { usePlazoFijoForm } from "../../../hooks/usePlazoFijo/usePlazoFijoForm";
interface CreatePlazoFijoFormProps {
  userBalance: number;
  onSubmit: (data: RegisterPlazoFijo) => void;
}

const CreatePlazoFijoForm: React.FC<CreatePlazoFijoFormProps> = ({
  userBalance,
  onSubmit,
}) => {
  const {
    amount,
    selectedTerm,
    isOpen,
    selectedTermConfig,
    isValid,
    numericAmount,
    estimatedReward,
    totalReturn,
    setAmount,
    setSelectedTerm,
    setIsOpen,
    handleSubmit,
    handleSubmitConfirm,
    handleQuickAmount,
  } = usePlazoFijoForm({ userBalance, onSubmit });

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ delay: 0.2 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Crear Nuevo Plazo Fijo</h2>
        <div className={styles.balanceInfo}>
          <FaCoins className={styles.coinIcon} />
          <span>Saldo disponible: {formatPrice(userBalance)} monedas</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Amount Input */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaCoins />
            Monto a Invertir
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ingresa el monto"
            className={styles.input}
            min="0"
            max={userBalance}
          />
          <div className={styles.quickButtons}>
            {quickAmounts.map(({ label, value }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleQuickAmount(value)}
                className={styles.quickButton}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleQuickAmount(userBalance)}
              className={styles.quickButton}
            >
              Todo
            </button>
          </div>
        </div>

        {/* Term Selection */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaClock />
            Plazo
          </label>
          <div className={styles.termOptions}>
            {TERM_OPTIONS.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => setSelectedTerm(option.value)}
                className={`${styles.termButton} ${
                  selectedTerm === option.value ? styles.termButtonActive : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.termLabel}>{option.label}</span>
                <span className={styles.termDays}>{option.days} días</span>
                <span className={styles.termRate}>{option.rate}% interés</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Estimated Return */}
        {numericAmount > 0 && isValid && (
          <motion.div
            className={styles.estimateCard}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.estimateHeader}>
              <FaInfoCircle />
              <span>Resumen de la Inversión</span>
            </div>
            <div className={styles.estimateGrid}>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>Monto invertido</span>
                <span className={styles.estimateValue}>
                  {numericAmount.toLocaleString("es-AR")}
                </span>
              </div>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>Ganancia estimada</span>
                <span
                  className={styles.estimateValue}
                  style={{ color: "#22c55e" }}
                >
                  +{estimatedReward.toLocaleString("es-AR")}
                </span>
              </div>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>Total a recibir</span>
                <span
                  className={styles.estimateValue}
                  style={{ fontWeight: 700 }}
                >
                  {totalReturn.toLocaleString("es-AR")}
                </span>
              </div>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>Plazo</span>
                <span className={styles.estimateValue}>
                  {selectedTermConfig.days} días
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          className={styles.submitButton}
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
        >
          <FaPlus />
          <span>Crear Plazo Fijo</span>
        </motion.button>

        {numericAmount > userBalance && (
          <div className={styles.errorMessage}>
            No tienes suficiente saldo para esta inversión
          </div>
        )}
      </form>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="¿Estas seguro que desea crear el Plazo Fijo?"
        message="Una vez creado el plazo fijo no se podra borrar."
        onConfirm={handleSubmitConfirm}
        type="warning"
      />
    </motion.div>
  );
};

export default CreatePlazoFijoForm;
