import { useState } from "react";
import { motion } from "framer-motion";
import { FaCoins, FaClock, FaPlus, FaInfoCircle } from "react-icons/fa";

import styles from "./CreatePlazoFijoForm.module.css";
import type {
  FIXED_TERM_DAYS,
  RegisterPlazoFijo,
} from "../../../types/plazoFijo.type";

interface CreatePlazoFijoFormProps {
  userBalance: number;
  onSubmit: (data: RegisterPlazoFijo) => void;
}

const TERM_OPTIONS: {
  value: FIXED_TERM_DAYS;
  label: string;
  days: number;
  rate: number;
}[] = [
  { value: "SEMANAL", label: "Semanal", days: 7, rate: 1.5 },
  { value: "QUINCENAL", label: "Quincenal", days: 15, rate: 3.0 },
  { value: "MENSUAL", label: "Mensual", days: 30, rate: 5.0 },
];

const CreatePlazoFijoForm: React.FC<CreatePlazoFijoFormProps> = ({
  userBalance,
  onSubmit,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [selectedTerm, setSelectedTerm] = useState<FIXED_TERM_DAYS>("MENSUAL");

  const selectedTermConfig = TERM_OPTIONS.find(
    (opt) => opt.value === selectedTerm
  )!;
  const numericAmount = Number.parseFloat(amount) || 0;
  const estimatedReward = numericAmount * (selectedTermConfig.rate / 100);
  const totalReturn = numericAmount + estimatedReward;

  const isValid = numericAmount > 0 && numericAmount <= userBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({
        amountInvested: numericAmount,
        fixedTermDays: selectedTerm,
      });
      setAmount("");
    }
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Crear Nuevo Plazo Fijo</h2>
        <div className={styles.balanceInfo}>
          <FaCoins className={styles.coinIcon} />
          <span>
            Saldo disponible: {userBalance.toLocaleString("es-AR")} monedas
          </span>
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
            <button
              type="button"
              onClick={() => handleQuickAmount(1000)}
              className={styles.quickButton}
            >
              1,000
            </button>
            <button
              type="button"
              onClick={() => handleQuickAmount(5000)}
              className={styles.quickButton}
            >
              5,000
            </button>
            <button
              type="button"
              onClick={() => handleQuickAmount(10000)}
              className={styles.quickButton}
            >
              10,000
            </button>
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
        {numericAmount > 0 && (
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
    </motion.div>
  );
};

export default CreatePlazoFijoForm;
